import "server-only";
import Link from "next/link";
import Container from "../Container";
import ListTags from "./ListTags";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface IProps {
  children: React.ReactNode;
  searchParams: {
    search?: string;
    tag?: string;
  };
}

export default function layout({ children }: IProps) {
  return (
    <Container className="grid grid-cols-[1fr_3fr] max-w-7xl">
      <aside className="border-r border-r-gray-900 px-2">
        <div className="mt-10">
          <form action="/blog/search">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                name="search"
                type="text"
                placeholder="Search..."
                autoComplete="off"
                className="w-full pl-10 block bg-gray-910 rounded-lg py-3 border-black placeholder:text-gray-600 text-gray-100"
              />
            </div>
            <button type="submit" className="hidden"></button>
          </form>
        </div>
        <div>
          <span className="text-2xl text-white font-mono block mt-10">
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
              href="/code"
            >
              Code Snippet
            </Link>
          </div>
        </div>

        {/* @ts-expect-error Server Component */}
        <ListTags />
      </aside>
      <div className="max-w-[862px] px-4">{children}</div>;
    </Container>
  );
}
