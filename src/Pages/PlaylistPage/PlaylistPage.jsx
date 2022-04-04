import { usePlaylist } from "../../CustomHooks";
import { PlaylistListing } from "./Components";
import { PlaylistCard } from "./Components";
export const PlaylistPage = () => {
  const { playlists } = usePlaylist();

  return (
    <div className="sub-container">
      <h1 className="styled-title">Playlist</h1>
      {playlists === null || playlists?.length === 0 ? (
        <div className="card-container">
          <p>You have no playlists</p>
        </div>
      ) : (
        <div className="playlist-container">
          <PlaylistListing playlists={playlists} />
        </div>
      )}
    </div>
  );
};
