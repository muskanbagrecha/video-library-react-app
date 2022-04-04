import { Card } from "../../../../Components/UI";
import "./PlaylistCard.css";
export const PlaylistCard = ({ title, description, videos }) => {
  return (
    <Card className="playlist-card card-vertical">
      {/* <div className="playlist-thumbnail">
        <img src={playlist.thumbnail} alt={playlist.title} />
      </div> */}
      <div className="playlist-info">
        <h3 className="playlist-title">{title}</h3>
        <p className="playlist-description">{description}</p>
      </div>
    </Card>
  );
};
