import Blog from "../../Blog";

/* eslint-disable react/no-unescaped-entities */
type Props = {};
export default function BlogPage({}: Props) {
  return (
    <main>
      <h1 className="text-[32px] inline font-bold  bg-gradient-to-r text-transparent from-yellow-500 to-yellow-200 bg-clip-text">
        Adam Richardson's Blog
      </h1>
      <h2 className="text-gray-300 leading-8">
        This blog contains posts about things that I think may be useful, along
        with code snippets that I use frequently. Most of the posts are pretty
        technical and are relating to Next.js, React, Javascript, Typescript or
        data related topics such as Python, Pandas, SparkSQL and Matplotlib.
      </h2>
      {/* @ts-expect-error Server Component */}
      <Blog size={100} />
    </main>
  );
}
