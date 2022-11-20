import { dbQuerySlug, Page } from "../../../../types/notion";
import { Client } from "@notionhq/client";
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
        { property: "slug", rich_text: { equals: slug } },
      ],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: 1,
  };

  return await notion.databases.query(dbQuery);
}

export default async function Head({ params }: Props) {
  const response = await getPost(params.slug);
  const post = response.results[0] as Page;
  return (
    <>
      <head>
        <title>{post.properties.title.title[0].plain_text}</title>
        <meta
          property="og:image"
          content={`www.adamrichardson.dev/api/og?title=${post.properties.title.title[0].plain_text}`}
        />
      </head>
    </>
  );
}
