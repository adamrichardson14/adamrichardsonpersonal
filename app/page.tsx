/* eslint-disable react/no-unescaped-entities */
import Container from "./Container";
import AdamImage from "./adamrichardson.png";
import Image from "next/image";
import SocialWhiteLinks from "./SocialWhiteLinks";
import Link from "next/link";
import {
  BookOpenIcon,
  CodeBracketIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import MostRecentBlogPost from "./MostRecentBlogPost";
import { Suspense } from "react";
import LoadingMostRecentItem from "./LoadingMostRecentItem";
import MostRecentYoutubeVideo from "./MostRecentYoutubeVideo";
import MostRecentCodeSnippet from "./MostRecentCodeSnippet";
import Projects from "./Projects";
import Blog from "./Blog";
import CodeSnippets from "./CodeSnippets";
import YoutubeVids from "./YoutubeVids";

export default function Home() {
  return (
    <main className="">
      <Container>
        <header className="flex md:mt-10 md:py-10 relative">
          <h1 className="text-8xl opacity-5 absolute md:opacity-100 md:relative font-semibold text-white vertical-text-custom whitespace-nowrap">
            Adam Richardson
          </h1>
          <div className="md:ml-8 mt-10">
            <Image
              src={AdamImage}
              placeholder="blur"
              width={144}
              height={144}
              alt="Image of Adam Richardson"
              className="mb-5 overflow-hidden rounded-full"
            />
            <h2 className="py-5">
              <span className="text-[32px] leading-8 font-mono  font-bold bg-gradient-to-r text-transparent from-cyan-500 to-cyan-200 bg-clip-text">
                Fullstack Developer
              </span>
              <br />
              <span className="text-[32px] leading-8 font-mono font-bold  bg-gradient-to-r text-transparent from-yellow-500 to-yellow-200 bg-clip-text">
                Course Creator
              </span>
              <br />
              <span className="text-[32px] leading-8 font-mono font-bold  bg-gradient-to-r text-transparent from-green-500 to-green-200 bg-clip-text">
                Data Enthusiast
              </span>
            </h2>
            <p className="text-gray-200 leading-6">
              Hi, I'm Adam Richardson, a fullstack developer. I'm passionate
              about teaching real world coding skills to aspiring developers. I
              work as a Business Intelligence Lead and run a website design /
              development company. I also love teaching coding skills to
              aspiring developers, while building stuff!
            </p>
            <SocialWhiteLinks
              className="flex space-x-10 py-8 md:py-16"
              size={35}
            />
            <div className="md:mt-10">
              <span className="block text-[32px] leading-8 mb-5 font-bold bg-gradient-to-r text-transparent from-fuchsia-500 to-fuchsia-200 bg-clip-text">
                Recent Stuff
              </span>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <Suspense
                  fallback={
                    <LoadingMostRecentItem
                      title="Loading Most Recent Blog Post"
                      icon={
                        <BookOpenIcon className="w-6 h-6 absolute -top-2 -right-2 text-gray-400" />
                      }
                    />
                  }
                >
                  {/* @ts-expect-error Server Component */}
                  <MostRecentBlogPost />
                </Suspense>

                {/* <Suspense
                  fallback={
                    <LoadingMostRecentItem
                      title="Getting most recent video"
                      icon={
                        <VideoCameraIcon className="w-6 h-6 absolute -top-2 -right-2 text-gray-400" />
                      }
                    />
                  }
                >
                  <MostRecentYoutubeVideo />
                </Suspense> */}
                <Suspense
                  fallback={
                    <LoadingMostRecentItem
                      title="Loading most recent code snippet"
                      icon={
                        <CodeBracketIcon className="w-6 h-6 absolute -top-2 -right-2 text-gray-400" />
                      }
                    />
                  }
                >
                  {/* @ts-expect-error Server Component */}
                  <MostRecentCodeSnippet />
                </Suspense>
              </div>
            </div>
          </div>
        </header>
        <Projects />
        <div className="flex justify-between items-center mt-52">
          <span className="text-3xl md:text-8xl font-semibold text-white">
            Blog
          </span>
          <Link
            href="/blog"
            className="underline underline-offset-4 text-gray-200"
          >
            View All Posts
          </Link>
        </div>
        {/* @ts-expect-error Server Component */}
        <Blog />

        {/* <YoutubeVids /> */}
        {/* @ts-expect-error Server Component */}
        <CodeSnippets />
      </Container>
    </main>
  );
}
