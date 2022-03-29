import { VideoCard } from "./VideoCard";
import { videos } from "./../../../backend/db/videos";

export const VideoList = () => {
  return (
    <section className="row-container">
      {videos.map(
        ({ _id, thumbnail, title, creator, views, date, label, glimpse }) => {
          return (
            <VideoCard
              key={_id}
              thumbnail={thumbnail}
              title={title}
              creator={creator}
              views={views}
              date={date}
              label={label}
              glimpse={glimpse}
            />
          );
        }
      )}
    </section>
  );
};
