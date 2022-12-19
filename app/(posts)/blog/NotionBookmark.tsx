/* eslint-disable @next/next/no-img-element */
"use client";
import useSWR from "swr";
import { LinkIcon } from "@heroicons/react/24/outline";

const previewFetcher = (url: string) =>
  fetch(`/api/bookmark/${encodeURIComponent(url)}`).then((res) => res.json());

const Bookmark = ({ value }: { value: any }) => {
  const { url } = value;

  const { data, error } = useSWR(url, previewFetcher);
  if (error)
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-none rounded flex space-x-2 p-2  items-center  text-gray-400 hover:bg-light-200  hover:bg-dark-700"
      >
        <LinkIcon className="h-5 w-5 text-gray-400" />
        <span className="truncate overflow-hidden">{url}</span>
      </a>
    );

  if (
    !data &&
    !data?.twitterImage.url &&
    !data?.twitterDescription &&
    !data?.title
  )
    return (
      <div
        className="border rounded cursor-pointer flex border-gray-400/50 max-h-30 text-gray-400 hover:bg-light-200  hover:bg-dark-700"
        onClick={() => {
          window.open(url);
        }}
      >
        <div className="flex flex-col flex-shrink space-y-2 flex-1 p-2">
          <div className="rounded bg-gray-200 h-5 max-w-40 animate-pulse  bg-dark-400" />
          <div className="rounded bg-gray-200 flex-1 animate-pulse  bg-dark-400" />
          <p className="flex space-x-2 text-sm opacity-70 overflow-hidden">
            <LinkIcon className="h-5 w-5 text-gray-400" />
            <span className="flex-shrink-0">{url}</span>
          </p>
        </div>
        <div className="bg-gray-200 flex-shrink-0 h-30 animate-pulse w-60 overflow-hidden hidden sm:block  bg-dark-400" />
      </div>
    );

  const {
    ogTitle: title,
    twitterDescription: description,
    favicon,
    twitterImage,
  } = data;
  const image = twitterImage.url ?? [];

  return (
    <div
      className="border rounded cursor-pointer flex border-gray-930 my-3 text-gray-300 justify-between hover:bg-gray-900 bg-gray-910"
      onClick={() => {
        window.open(url);
      }}
    >
      <div className="flex flex-col p-2 w-full md:w-4/5">
        <p className="font-bold h-6 text-sm mb-1 leading-6 truncate">{title}</p>
        <p className="text-sm opacity-80 leading-5 line-clamp-2">
          {description}
        </p>
        <p className="flex space-x-2 h-6 text-sm opacity-70 items-center truncate mt-1">
          {favicon ? (
            <img
              src={`${data.requestUrl}${favicon}`}
              className="h-4 w-4"
              alt="favicon"
            />
          ) : (
            <LinkIcon className="h-5 w-5 text-gray-400" />
          )}
          <span className="leading-6 truncate">{url}</span>
        </p>
      </div>
      {image && (
        <div className="h-28 max-w-[200px] hidden md:flex md:w-1/5">
          <img
            src={twitterImage.url}
            alt={title}
            width={300}
            height={200}
            className="rounded object-cover w-full height-full"
          />
        </div>
      )}
    </div>
  );
};

export default Bookmark;
