import "server-only";
import { EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Item, Videos } from "../lib/youtube";
import Image from "next/image";

export const revalidate = 60 * 60 * 24;

async function getMostRecentYoutubeVideos(): Promise<Videos> {
  // get most recent video from Youtube API
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;
  const uploadsURL = `https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&channelId=${YOUTUBE_CHANNEL_ID}&type=video&maxResults=6&key=${YOUTUBE_API_KEY}&order=date`;
  const response = await fetch(uploadsURL);
  const mostRecentVideos = (await response.json()) as Videos;
  const videoIds = mostRecentVideos.items.map((video) => video.id.videoId);
  const videoIdsString = videoIds.join(",");
  const videoStatsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIdsString}&key=${YOUTUBE_API_KEY}`;
  const videoStatsResponse = await fetch(videoStatsURL);
  return await videoStatsResponse.json();
}

export default async function YoutubeVids({}) {
  const videos = await getMostRecentYoutubeVideos();
  return (
    <section className="mt-52 mb-10">
      <span className="text-8xl font-semibold text-white text-center md:text-left block w-full">Recent Videos</span>
      <div className="grid mx-auto grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full">
        {videos.items.map((video) => (
          <div
            key={video.id.videoId}
            className="w-full h-[180px] relative p-4 text-white rounded-lg flex justify-center group"
          >
            <Image
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
              className="absolute object-cover opacity-10 rounded-lg -z-10 group-hover:opacity-5 transition-all duration-200"
            />
            <div className="p-4 z-10 absolute w-[320px] h-[180px]">
              <h5 className="font-mono text-white font-semibold line-clamp-2">
                {video.snippet.title}
              </h5>
              <p className="font-sans text-gray-300 line-clamp-3">
                {video.snippet.description}
              </p>
              <div className="flex justify-between mt-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-gray-100 group-hover:text-gray-50 duration-250 transition-colors"
                >
                  Watch Video
                </a>
                <div className="flex">
                  <span className="block text-gray-500">
                    {Number(video.statistics.viewCount).toLocaleString()}
                  </span>
                  <EyeIcon className="w-6 h-6 text-gray-500 ml-2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
