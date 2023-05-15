import React from "react";

interface Props {
  embed: string;
}

const Video = ({ embed }: Props) => {
  return (
    <div className="video-container">
      <iframe
        className="youtube-video"
        width="360"
        height="210"
        src={`https://www.youtube.com/embed/${embed}`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
