import { VideoCard } from "./VideoCard";

export const VideoList = ({videos}) => {
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
