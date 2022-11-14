import { EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { Item, Videos } from "../lib/youtube";

export const revalidate = 60 * 60 * 24;

async function getMostRecentYoutubeVideo(): Promise<Videos> {
  // get most recent video from Youtube API
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;
  const uploadsURL = `https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&channelId=${YOUTUBE_CHANNEL_ID}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}&order=date`;

  const response = await fetch(uploadsURL);
  const mostRecentVideo = await response.json();
  const videoId = mostRecentVideo.items[0].id.videoId;

  // fetch video statistics from Youtube API
  const videoStatsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  const videoStatsResponse = await fetch(videoStatsURL);
  return await videoStatsResponse.json();
}

export default async function MostRecentYoutubeVideo({}) {
  const videos = await getMostRecentYoutubeVideo();
  const video = videos.items[0] as Item;
  return (
    <div className="relative w-full rounded-lg border-l-2 border-b-2 border-gray-800 p-3">
      <VideoCameraIcon className="w-6 h-6 absolute -top-2 -right-2 text-gray-500" />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.youtube.com/watch?v=${video.id}}`}
      >
        <h3 className="text-gray-200 mb-2 line-clamp-2 hover:text-gray-50 duration-200 transition-colors">
          {video.snippet.title}
        </h3>
      </a>
      <div className="flex justify-between">
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 text-gray-100 hover:text-gray-50 duration-250 transition-colors"
        >
          Watch Video
        </a>
        {/* TODO: Add View Counter Component */}
        <div className="flex">
          <span className="block text-gray-500">
            {Number(video.statistics.viewCount).toLocaleString()}
          </span>
          <EyeIcon className="w-6 h-6 text-gray-500 ml-2" />
        </div>
      </div>
    </div>
  );
}
