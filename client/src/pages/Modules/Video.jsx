import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return <p>No video available</p>;

  return (
    <video
      src={videoUrl}
      controls
      className="w-full rounded-lg shadow"
    />
  );
};

export default VideoPlayer;
