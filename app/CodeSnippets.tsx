import "server-only";

import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Client } from "@notionhq/client";
import { dbQueryCode, Page } from "../types/notion";
import ViewCounter from "./ViewCounter";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export const revalidate = 60 * 60;

async function getAllCodeSnippets() {
  if (databaseId === undefined) {
    throw new Error("No database ID provided");
  }
  let dbQuery: dbQueryCode = {
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "Category",
          select: { equals: "Code Snippet" },
        },
      ],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: 12,
  };
  return await notion.databases.query(dbQuery);
}

export default async function CodeSnippets() {
  const response = await getAllCodeSnippets();
  const snippets = response.results as Page[];

  return (
    <section className="mt-52 mb-10">
      <span className="text-3xl md:text-8xl font-semibold text-white">
        Code Snippets
      </span>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="relative w-full rounded-lg border-2 border-gray-800 p-3"
          >
            <h2 className="text-gray-200 pb-2 line-clamp-2">
              {snippet.properties.title.title[0].plain_text}
            </h2>
            <div className="flex justify-between">
              <Link
                href={`/blog/${snippet.properties.slug.rich_text[0].plain_text}`}
                className="underline underline-offset-4 text-gray-100"
              >
                View Code
              </Link>
              <ViewCounter
                slug={snippet.properties.slug.rich_text[0].plain_text}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
