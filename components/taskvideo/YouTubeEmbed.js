const YouTubeEmbed = ({ videoId }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <iframe
        width="100%"
        height="214"
        src={`https://www.youtube.com/embed/${videoId}?`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
