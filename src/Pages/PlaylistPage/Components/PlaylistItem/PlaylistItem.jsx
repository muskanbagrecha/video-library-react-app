export const PlaylistItem = ({ title, description, videos }) => {
  return (
    <>
      <h1 className="large-title">
        {title} ({videos.length})
      </h1>
      <p>{description}</p>
      <hr />
    </>
  );
};
