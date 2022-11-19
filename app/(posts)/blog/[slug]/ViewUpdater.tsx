"use client";
import { EyeIcon } from "@heroicons/react/24/outline";
import useSWR, { Fetcher } from "swr";
import { Prisma } from "@prisma/client";

type Props = {
  slug: string;
};

const fetcher: Fetcher<Prisma.viewCountSelect, string> = (url: string) =>
  fetch(url, { method: "POST" }).then((res) => res.json());
export default function ViewUpdater({ slug }: Props) {
  const { data, isValidating } = useSWR(`/api/views/${slug}`, fetcher);

  return (
    <div className="flex">
      <span className="block text-gray-500">
        {isValidating ? "..." : data?.count}
      </span>
      <EyeIcon className="w-6 h-6 text-gray-500 ml-2" />
    </div>
  );
}
