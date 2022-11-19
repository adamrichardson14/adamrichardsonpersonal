import "server-only";

import { BookOpenIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Client } from "@notionhq/client";
import { dbQuery, Page } from "../types/notion";
import ViewCounter from "./ViewCounter";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
export const revalidate = 60 * 60;

async function getMostRecentBlogPost() {
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
          select: { equals: "Blog Post" },
        },
      ],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: 1,
  };
  return await notion.databases.query(dbQuery);
}

export default async function MostRecentBlogPost({}) {
  const response = await getMostRecentBlogPost();
  const currentPage = response.results[0] as Page;
  const post: Page["properties"] = currentPage.properties;

  return (
    <div className="relative w-full rounded-lg border-l-2 border-b-2 border-gray-800 p-3">
      <BookOpenIcon className="w-6 h-6 absolute -top-2 -right-2 text-gray-500" />
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
          Read Post
        </Link>
        <ViewCounter slug={post.slug.rich_text[0].text.content} />
      </div>
    </div>
  );
}
