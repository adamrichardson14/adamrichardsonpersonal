"use client";
import { EyeIcon } from "@heroicons/react/24/outline";
import useSWR, { Fetcher } from "swr";
import { Prisma } from "@prisma/client";

type Props = {
  slug: string;
};

const fetcher: Fetcher<Prisma.viewCountSelect, string> = (url: string) =>
  fetch(url).then((res) => res.json());
export default function ViewCounter({ slug }: Props) {
  const { data, isValidating } = useSWR(`/api/views/${slug}`, fetcher);
  return (
    <div className="flex">
      <span className="block text-gray-400">
        {isValidating ? "..." : data?.count}
      </span>
      <EyeIcon className="w-6 h-6 text-gray-400 ml-2" />
    </div>
  );
}
