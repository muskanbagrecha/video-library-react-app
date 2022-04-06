import { useParams } from "react-router-dom";
import { usePlaylist } from "../../CustomHooks";
import { VideoCard } from "../VideoPage/Components";
export const SinglePlaylistPage = () => {
  const { id } = useParams();
  const { playlists } = usePlaylist();
  const currPlaylist = playlists?.find((playlist) => playlist._id === id);
  console.log(currPlaylist);
  return (
    <div className="sub-container">
      {currPlaylist ? (
        <div className="playlist-info">
          <h1 className="styled-title">{currPlaylist.title}</h1>
          <p className="playlist-description">{currPlaylist.description}</p>
          <div className="playlist-container">
            {currPlaylist.videos.map((video) => (
              <VideoCard key={video._id} item={video} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h3>Uh oh, this playlist does not exist.</h3>
        </>
      )}
    </div>
  );
};
