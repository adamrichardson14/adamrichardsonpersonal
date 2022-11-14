import "server-only";
import Link from "next/link";
import Container from "../Container";

import { Client } from "@notionhq/client";
import { dbQuery } from "../../types/notion";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
export const revalidate = 60 * 60;

async function fetchBlogPosts() {
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
    page_size: 100,
  };
  const allPages = await notion.databases.query(dbQuery);
  // Retrieve all available tags here
}

interface IProps {
  children: React.ReactNode;
}

export default function layout({ children }: IProps) {
  return (
    <Container className="flex max-w-7xl">
      <aside className="w-72 border-r border-r-gray-900 px-2">
        <div>
          <span className="text-2xl text-white font-mono block">
            Filter By Type
          </span>
          <div className="">
            <Link
              className="text-gray-300 block font-sans underline underline-offset-4 mt-2"
              href="/blog"
            >
              Blog Post
            </Link>
            <Link
              className="text-gray-300 block font-sans underline underline-offset-4 mt-2"
              href="/blog/code"
            >
              Code Snippet
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            name="search"
            type="text"
            placeholder="Search Blog Posts"
            autoComplete="off"
            className="w-full p-2 bg-gray-910 rounded-lg border-black placeholder:text-gray-600 text-gray-100"
          />
        </div>
      </aside>
      <div>{children}</div>;
    </Container>
  );
}
