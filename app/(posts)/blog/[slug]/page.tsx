import "server-only";

import { Client } from "@notionhq/client";
import { dbQuerySlug, Page } from "../../../../types/notion";
import { Fragment } from "react";
import { renderNotionBlock } from "../NotionBlockRenderer";
import probeImageSize from "../imaging";
import ViewUpdater from "./ViewUpdater";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

type Props = {
  params: {
    slug: string;
  };
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
        { property: "slug", rich_text: { equals: slug.toString() } },
      ],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: 1,
  };

  return await notion.databases.query(dbQuery);
}

async function getBlocks(
  blockId: string,
  startCursor = undefined,
  blocks = []
): Promise<any[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
    start_cursor: startCursor,
  });

  blocks = blocks.concat(response.results);

  // Check if there are more blocks to fetch
  if (response.next_cursor) {
    return getBlocks(blockId, response.next_cursor, blocks);
  }

  const childBlocks = await Promise.all(
    blocks
      .filter((b: any) => b.has_children)
      .map(async (b: any) => {
        return {
          id: b.id,
          children: await getBlocks(b.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((b: any) => {
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
}

async function fetchBlogPosts(size: number) {
  if (databaseId === undefined) {
    throw new Error("No database ID provided");
  }
  let dbQuery: any = {
    database_id: databaseId,
    filter: { property: "published", checkbox: { equals: true } },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: size,
  };
  return await notion.databases.query(dbQuery);
}

export async function generateStaticParams() {
  const results = await fetchBlogPosts(100);
  const posts = results.results as Page[];

  return posts.map((post) => ({
    slug: post.properties.slug.rich_text[0].plain_text.toString(),
  }));
}

export const revalidate = 3600;

export default async function Post({ params: { slug } }: Props) {
  const response = await getPost(slug);
  const blocks = await getBlocks(response.results[0].id);
  const post = response.results[0] as Page;

  return (
    <article className="mt-10 md:mt-0">
      <h1 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-fucshia-500 to-fucshia-200 bg-clip-text">
        {post.properties.title.title[0].plain_text}
      </h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-400 block">
          {new Date(post.properties.date.date.start).toLocaleDateString()}
        </span>
        <ViewUpdater slug={post.properties.slug.rich_text[0].text.content} />
      </div>

      {blocks.map((block) => (
        <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
      ))}
    </article>
  );
}
