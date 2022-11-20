import "server-only";

import Link from "next/link";

import { Client } from "@notionhq/client";
import { dbQuery, Page } from "../../../types/notion";
import ViewCounter from "../../ViewCounter";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
export const revalidate = 60 * 60;

async function fetchCodeSnippets(size: number) {
  if (databaseId === undefined) {
    throw new Error("No database ID provided");
  }
  let dbQuery: dbQuery = {
    database_id: databaseId,
    filter: {
      and: [
        { property: "published", checkbox: { equals: true } },
        {
          property: "Category",
          select: { equals: "Code Snippet" },
        },
      ],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: size,
  };
  return await notion.databases.query(dbQuery);
}

export default async function Code({
  size = 5,
  codePage,
}: {
  size?: number;
  codePage?: boolean;
}) {
  const results = await fetchCodeSnippets(size);
  const snippets = results.results as Page[];
  return (
    <section className="mb-20">
      <div
        className={`${
          codePage
            ? "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
        } grid gap-4 mt-10`}
      >
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="relative w-full rounded-lg border-2 border-gray-800 p-3"
          >
            <h3 className="text-gray-200 mb-2 line-clamp-2">
              {snippet.properties.title.title[0].plain_text}
            </h3>
            <div className="flex justify-between">
              <Link
                href={`/blog/${snippet.properties.slug.rich_text[0].plain_text.toString()}`}
                className="underline underline-offset-4 text-gray-100"
              >
                View Code
              </Link>
              <ViewCounter
                slug={snippet.properties.slug.rich_text[0].plain_text.toString()}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
