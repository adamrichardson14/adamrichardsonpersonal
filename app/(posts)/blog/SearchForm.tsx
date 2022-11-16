"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type Props = {};
export default function SearchForm({}: Props) {
  const router = useRouter();
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        router.push(`/blog/search/${e.target.search.value}`);
      }}
    >
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
          className="w-full pl-10 block bg-gray-910 rounded-lg py-3 border-black outline-none focus:ring-yellow-400 focus:ring-2 placeholder:text-gray-600 text-gray-100"
        />
      </div>
      <button type="submit" className="hidden"></button>
    </form>
  );
}
