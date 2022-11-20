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

        {/* @ts-expect-error Server Component */}
        <ListTags />
      </aside>
      <div className="max-w-[862px] ml-4">{children}</div>;
    </Container>
  );
}
