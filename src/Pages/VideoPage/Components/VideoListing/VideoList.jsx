import { VideoCard } from "./VideoCard";

export const VideoList = ({ videos }) => {
  return (
    <section className="row-container">
      {videos.map((item) => {
        return <VideoCard key={item._id} item={item} />;
      })}
    </section>
  );
};
