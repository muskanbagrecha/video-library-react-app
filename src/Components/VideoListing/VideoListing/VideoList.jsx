import { VideoCard } from "./VideoCard";
import { videos } from "./../../../backend/db/videos";

export const VideoList = () => {
  return (
    <section className="row-container">
      {videos.map((video) => {
        return (
          <VideoCard
            key={video._id}
            thumbnail={video.thumbnail}
            title={video.title}
            creator={video.creator}
            views={video.views}
            date={video.date}
            label={video.label}
            glimpse={video.glimpse}
          />
        );
      })}
    </section>
  );
};
