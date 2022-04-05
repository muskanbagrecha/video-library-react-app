import { usePlaylist } from "../../CustomHooks";
import { PlaylistCard } from "./Components/PlaylistCard/PlaylistCard";
import "./PlaylistPage.css";
export const PlaylistPage = () => {
  const { playlists } = usePlaylist();

  return (
    <div className="sub-container">
      <h1 className="styled-title">My Playlists</h1>
      <div className="col-container">
        {playlists === null || playlists?.length === 0 ? (
          <div className="card-container">
            <p>You have no playlists</p>
          </div>
        ) : (
          <div className="playlist-container">
            {playlists?.map(({ _id, title, description, videos }) => (
              <PlaylistCard
                key={_id}
                {...{ _id, title, description, videos }}
              />
            ))}
          </div>
        )}
        <button className="btn btn-primary">Create New</button>
      </div>
    </div>
  );
};
