import "server-only";
import Link from "next/link";
import Container from "../Container";
import ListTags from "./ListTags";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchForm from "./blog/SearchForm";

interface IProps {
  children: React.ReactNode;
  searchParams: {
    search?: string;
    tag?: string;
  };
}

export default function layout({ children }: IProps) {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-[1fr_3fr] max-w-7xl">
      <aside className="border-r border-r-gray-900 px-2">
        <div className="md:mt-10">
          <SearchForm />
        </div>
        <div>
          <span className="text-xl lg:text-2xl text-white font-mono block mt-10">
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
      <div className="max-w-[862px] ml-4">{children}</div>;
    </Container>
  );
}
