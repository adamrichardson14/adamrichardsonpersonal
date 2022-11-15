import { Fragment } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Latex from "react-latex-next";

import { Text } from "./NotionTextBlock";
import Bookmark from "./NotionBookmark";
import { slugify } from "transliteration";
import NotionImage, { getMediaCtx } from "./NotionImage";
import VideoComponent from "./VideoComponent";
import CodeHighlights from "./CodeHighlights";

export function renderNotionBlock(block: any) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="my-3 leading-7 text-gray-300">
          <Text text={value.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1
          id={slugify(value.rich_text[0].text.content)}
          className="font-bold mt-4 mb-2 text-2xl leading-7 text-white"
        >
          <Text text={value.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2
          id={slugify(value.rich_text[0].text.content)}
          className="font-bold mt-4 text-xl mb-3 leading-7 text-white"
        >
          <Text text={value.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3
          id={slugify(value.rich_text[0].text.content)}
          className="font-bold mt-4 text-lg mb-2 leading-7 text-white"
        >
          <Text text={value.rich_text} />
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li className="list-disc text-gray-300 list-inside my-1">
          <Text text={value.rich_text} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="list-decimal text-gray-300 list-inside my-1">
          <Text text={value.rich_text} />
        </li>
      );

    case "to_do":
      return (
        <div>
          <label htmlFor={id} className="text-gray-300">
            <input
              className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 mr-1"
              type="checkbox"
              id={id}
              defaultChecked={value.checked}
            />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );

    case "toggle":
      return (
        <details className="text-gray-300">
          <summary className="ml-4">
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
          ))}
        </details>
      );

    case "child_page":
      return <p className="my-2">{value.title}</p>;

    case "image":
      return <NotionImage value={value} />;

    case "video":
      const { src: videoSrc, caption: videoCaption } = getMediaCtx(value);
      return <VideoComponent videoSrc={videoSrc} videoCaption={videoCaption} />;

    case "divider":
      return (
        <p className="font-mono text-center py-2 tracking-[1em] text-gray-300">
          ...
        </p>
      );

    case "quote":
      return (
        <p className="rounded bg-gray-900 border-l-2 my-2 p-2 pl-4 text-gray-200">
          <Text text={value.rich_text} />
        </p>
      );

    case "callout":
      return (
        <p className="rounded flex space-x-2 border-l-2 border-slate-600 my-2 p-2 pl-4 bg-gray-900 text-gray-300">
          <span>{value.icon.emoji}</span>
          <div>
            <Text text={value.rich_text} />
          </div>
        </p>
      );

    case "bookmark":
      return <Bookmark value={value} />;

    case "code":
      console.log(value);
      return <CodeHighlights value={value} />;
    default:
      return (
        <p>
          `❌ Unsupported block ($
          {type === "unsupported" ? "unsupported by Notion API" : type})`
        </p>
      );
  }
}
