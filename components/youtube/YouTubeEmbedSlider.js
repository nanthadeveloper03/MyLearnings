import React, { useEffect } from 'react';

const YouTubeEmbed = ({ videoId }) => {
  useEffect(() => {
    console.log('videoId changed:', videoId);
  }, [videoId]);

  return (
    <div className="youtube-container">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;
