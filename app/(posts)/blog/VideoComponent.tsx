"use client";

import YouTube, { YouTubeProps } from "react-youtube";

const opts: YouTubeProps["opts"] = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

type Props = {
  videoSrc: string;
  videoCaption: string;
};
export default function VideoComponent({ videoSrc, videoCaption }: Props) {
  console.log(videoSrc, videoCaption);
  const splitSrc = videoSrc.split("?v=");
  console.log(splitSrc);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    console.log("ready");
  };
  return (
    <div className="relative youtubeContainer">
      <YouTube videoId={splitSrc[1]} opts={opts} onReady={onPlayerReady} />
      <p className="my-2 text-center opacity-80">{videoCaption}</p>
    </div>
  );
}
