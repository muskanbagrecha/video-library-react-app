import { Video } from "./Components/";
export const VideoPage = ({ video }) => {
  const { thumbnail, title, creator, views, date } = video;
  return (
    <div className="sub-container">
      <div className="video-container">
        <Video
          thumbnail={thumbnail}
          title={title}
          creator={creator}
          views={views}
          date={date}
        />
      </div>
      <div className="most-watched-container"></div>
    </div>
  );
};
