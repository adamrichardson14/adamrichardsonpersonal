import { Client } from "@notionhq/client";
import Link from "next/link";
import { dbQuery, Page } from "../../types/notion";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export const revalidate = 60 * 60;

async function fetchTags(): Promise<string[]> {
  if (databaseId === undefined) {
    throw new Error("No database ID provided");
  }
  let dbQuery: dbQuery = {
    database_id: databaseId,
    filter: {
      and: [{ property: "published", checkbox: { equals: true } }],
    },
    sorts: [{ property: "date", direction: "descending" }],
    page_size: 100,
  };
  const allPages = await notion.databases.query(dbQuery);
  const results = allPages.results as Page[];
  const tags = results.map((page) =>
    (page.properties.Tags.multi_select || []).map((tag) => tag.name)
  );
  const flattenedTags = tags.flat();
  const uniqueTags = [...new Set(flattenedTags)];

  return new Promise((resolve) => {
    resolve(uniqueTags);
  });
}

export default async function ListTags() {
  const tags = await fetchTags();
  return (
    <div>
      <span className="text-xl lg:text-2xl text-white font-mono block mt-10">
        Filter By Tag
      </span>
      <div className="flex gap-3 mt-2 flex-wrap">
        {tags.map((tag) => (
          <Link
            href={`/blog/search/${tag}`}
            key={tag}
            className="px-3 py-1.5 flex justify-center items-center bg-[#141414] text-gray-200 rounded-lg group-hover:bg-gray-910 whitespace-nowrap hover:bg-gray-910 hover:text-white transition-colors duration-200"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
