import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import "./PlaylistListing.css";

export const PlaylistListing = ({ playlists }) => {
  return (
    <ul className="no-list-style playlist-list">
      {playlists?.map(({ _id, title, description, videos }) => (
        <li key={_id}>
          {/* <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link> */}
          <PlaylistCard
            title={title}
            description={description}
            videos={videos}
          />
          {/* <PlaylistItem
            title={title}
            description={description}
            videos={videos}
          /> */}
        </li>
      ))}
    </ul>
  );
};
