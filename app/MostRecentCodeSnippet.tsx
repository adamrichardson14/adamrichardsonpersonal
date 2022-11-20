import "server-only";

import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Client } from "@notionhq/client";
import { dbQueryCode, Page } from "../types/notion";
import ViewCounter from "./ViewCounter";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export const revalidate = 60 * 60;

async function getMostRecentCodeSnippet() {
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
    page_size: 1,
  };
  return await notion.databases.query(dbQuery);
}

export default async function MostRecentCodeSnippet({}) {
  const response = await getMostRecentCodeSnippet();
  const currentPage = response.results[0] as Page;
  const post: Page["properties"] = currentPage.properties;

  return (
    <div className="relative w-full rounded-lg border-l-2 border-b-2 border-gray-800 p-3">
      <CodeBracketIcon className="w-6 h-6 absolute -top-2 -right-2 text-gray-400" />
      <Link href={`/blog/${post.slug.rich_text[0].text.content}`} passHref>
        <h3 className="text-gray-200 mb-2 line-clamp-2 hover:text-gray-50 duration-200 transition-colors">
          {post.title.title[0].plain_text}
        </h3>
      </Link>
      <div className="flex justify-between">
        <Link
          href={`/blog/${post.slug.rich_text[0].text.content}`}
          className="underline underline-offset-4 text-gray-100 hover:text-gray-50 duration-250 transition-colors"
        >
          View Code
        </Link>
        {/* TODO: Add View Counter Component */}
        <ViewCounter slug={post.slug.rich_text[0].text.content} />
      </div>
    </div>
  );
}
