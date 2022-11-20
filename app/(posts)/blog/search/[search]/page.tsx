/* eslint-disable react/no-unescaped-entities */
import "server-only";
const databaseId = process.env.NOTION_DATABASE_ID;
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_KEY });
import { Page } from "../../../../../types/notion";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import ViewCounter from "../../../../ViewCounter";

function getFilters(search: string | undefined, tag: string | undefined) {
  let filters = {};
  if (search) {
    filters = {
      and: [
        { property: "published", checkbox: { equals: true } },

        {
          or: [
            {
              property: "Tags",
              multi_select: { contains: search },
            },
            { property: "title", title: { contains: search } },
          ],
        },
      ],
    };
  }
  if (tag) {
    filters = {
      and: [
        { property: "published", checkbox: { equals: true } },

        {
          or: [
            {
              property: "Tags",
              multi_select: { contains: tag },
            },
            { property: "title", title: { contains: tag } },
          ],
        },
      ],
    };
  }
  return filters;
}

async function getPosts(search?: string, tag?: string) {
  const filters = getFilters(search, tag);
  if (!search && !tag) {
    return [];
  }
  if (databaseId === undefined) {
    throw new Error("No database ID provided");
  }
  let dbQuery: any = {
    database_id: databaseId,
    filter: filters,
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
    page_size: 100,
  };

  const response = await notion.databases.query(dbQuery);
  return response.results;
}

export default async function Search({ params: { search } }: any) {
  if (!search) {
    return (
      <h2 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-yellow-500 to-yellow-200 bg-clip-text mb-10">
        Search for something...
      </h2>
    );
  }
  const results = await getPosts(search);
  const posts = results as Page[];
  if (posts.length === 0) {
    return (
      <h2 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-yellow-500 to-yellow-200 bg-clip-text mb-10">
        No Posts Found
      </h2>
    );
  }
  return (
    <section className="mb-20">
      <div className="flex flex-col mt-10">
        {posts.filter(
          (post) => post.properties.Category.select.name === "Blog Post"
        ).length > 0 && (
          <>
            <h2 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-yellow-500 to-yellow-200 bg-clip-text mb-10">
              Blog Posts
            </h2>
            {posts
              .filter(
                (post) => post.properties.Category.select.name === "Blog Post"
              )
              .map((post) => (
                <Link
                  className="p-4 bg-gray-930 rounded-xl border border-black mb-5 group hover:bg-gray-920"
                  passHref
                  key={post.properties.slug.rich_text[0].plain_text}
                  href={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
                >
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">
                        {new Date(
                          post.properties.date.date.start
                        ).toLocaleDateString()}
                      </span>
                      <span className="ml-4 text-gray-400 text-sm font-bold">
                        {post.properties.Category.select.name}
                      </span>
                    </div>

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
          </>
        )}
      </div>

      {posts.filter(
        (post) => post.properties.Category.select.name === "Code Snippet"
      ).length > 0 && (
        <>
          <h1 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-fucshia-500 to-fucshia-200 bg-clip-text">
            Code Snippets
          </h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {posts
              .filter(
                (post) =>
                  post.properties.Category.select.name === "Code Snippet"
              )
              .map((snippet) => (
                <div
                  key={snippet.id}
                  className="relative w-full rounded-lg border-2 border-gray-800 p-3"
                >
                  <h3 className="text-gray-200 pb-2 line-clamp-2">
                    {snippet.properties.title.title[0].plain_text}
                  </h3>
                  <div className="flex justify-between">
                    <Link
                      href={`/blog/${snippet.properties.slug.rich_text[0].plain_text}`}
                      className="underline underline-offset-4 text-gray-100"
                    >
                      View Code
                    </Link>
                    <div className="flex">
                      <span className="block text-gray-400">1,123</span>
                      <EyeIcon className="w-6 h-6 text-gray-400 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
