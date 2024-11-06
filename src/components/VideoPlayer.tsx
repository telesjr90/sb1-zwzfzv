import React from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  currentTime?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, currentTime }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      start: currentTime || 0,
    },
  };

  return (
    <div className="aspect-video">
      <YouTube
        videoId={videoId}
        opts={opts}
        className="w-full"
      />
    </div>
  );
};