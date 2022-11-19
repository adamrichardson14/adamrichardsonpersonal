import "server-only";

import Link from "next/link";

import { Client } from "@notionhq/client";
import { dbQuery, Page } from "../types/notion";
import ViewCounter from "./ViewCounter";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
export const revalidate = 60 * 60;

async function fetchBlogPosts(size: number) {
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
    page_size: size,
  };
  return await notion.databases.query(dbQuery);
}

export default async function Blog({ size = 5 }) {
  const results = await fetchBlogPosts(size);
  const posts = results.results as Page[];
  return (
    <section className="mb-20">
      <div className="flex flex-col mt-10">
        {posts.map((post) => (
          <Link
            className="p-4 bg-gray-930 rounded-xl border border-black mb-5 group hover:bg-gray-920"
            passHref
            key={post.properties.slug.rich_text[0].plain_text}
            href={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
          >
            <div>
              <span className="text-sm text-gray-500">
                {new Date(post.properties.date.date.start).toLocaleDateString()}
              </span>
              <h4 className="font-mono text-[24px] text-white group-hover:text-gray-100">
                {post.properties.title.title[0].plain_text}
              </h4>
              <p className="text-gray-300 mt-1 font-sans">
                {post.properties.Description.rich_text[0].plain_text}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 flex-wrap mt-3 w-full">
                  {post.properties.Tags.multi_select.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex px-3 py-1.5 bg-[#141414] text-gray-200 rounded-lg group-hover:bg-gray-910"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <ViewCounter
                  slug={post.properties.slug.rich_text[0].plain_text}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
