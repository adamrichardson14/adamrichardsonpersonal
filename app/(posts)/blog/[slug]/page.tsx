import "server-only";

import { Client } from "@notionhq/client";
import { dbQuerySlug, Page } from "../../../../types/notion";
import { Fragment } from "react";
import { renderNotionBlock } from "../NotionBlockRenderer";
import probeImageSize from "../imaging";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

type Props = {
  params: {
    slug: string;
  };
};

const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  const childBlocks = await Promise.all(
    response.results
      .filter((b: any) => b.has_children)
      .map(async (b) => {
        return {
          id: b.id,
          children: await getBlocks(b.id),
        };
      })
  );

  const blocksWithChildren = response.results.map((b: any) => {
    if (b.has_children && !b[b.type].children) {
      b[b.type]["children"] = childBlocks.find((x) => x.id === b.id)?.children;
    }
    return b;
  });

  // create a promise for blocks with children that will probe the image size when the type is an image

  await Promise.all(
    blocksWithChildren
      .filter((b: any) => b.type === "image")
      .map(async (b) => {
        const { type } = b;
        const value = b[type];
        const src =
          value.type === "external" ? value.external.url : value.file.url;

        const { width, height } = await probeImageSize(src);
        value["dim"] = { width, height };
        b[type] = value;
      })
  );
  return blocksWithChildren;
};

async function getPost(slug: string) {
  if (databaseId === undefined) {
    throw new Error("No database ID provided");
  }
  let dbQuery: dbQuerySlug = {
    database_id: databaseId,
    filter: {
      and: [
        { property: "published", checkbox: { equals: true } },
        { property: "slug", rich_text: { equals: slug } },
      ],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: 1,
  };

  return await notion.databases.query(dbQuery);
}

export default async function Post({ params: { slug } }: Props) {
  const response = await getPost(slug);
  const blocks = await getBlocks(response.results[0].id);
  const post = response.results[0] as Page;

  return (
    <article className="mt-10 md:mt-0">
      <h1 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-fucshia-500 to-fucshia-200 bg-clip-text">
        {post.properties.title.title[0].plain_text}
      </h1>
      <span className="text-sm text-gray-500 block">
        {new Date(post.properties.date.date.start).toLocaleDateString()}
      </span>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
      ))}
    </article>
  );
}
