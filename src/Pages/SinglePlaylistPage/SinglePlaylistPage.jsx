import { useParams } from "react-router-dom";
import { usePlaylist, useAuth, useAlert } from "../../CustomHooks";
import { VideoCard } from "../VideoPage/Components";
export const SinglePlaylistPage = () => {
  const { id } = useParams();
  const { playlists, deleteVideoFromPlaylist } = usePlaylist();
  const currPlaylist = playlists?.find((playlist) => playlist._id === id);

  const {
    authState: { token },
  } = useAuth();

  const { setShowAlert } = useAlert();

  const deleteVideoFromPlaylistHandler = (videoId) => {
    deleteVideoFromPlaylist({ playlistId: currPlaylist._id, videoId, token });
    setShowAlert({
      showAlert: true,
      alertMessage: "Video has been deleted from Playlist",
      type: "info",
    });
  };

  return (
    <div className="sub-container">
      {currPlaylist ? (
        <div className="flex-col-center">
          <h1 className="styled-title">{currPlaylist.title}</h1>
          <p className="playlist-description">{currPlaylist.description}</p>
          <div className="playlist-container">
            {currPlaylist.videos.map((video) => (
              <VideoCard
                key={video._id}
                item={video}
                onDelete={deleteVideoFromPlaylistHandler}
                type="SHOW_TRASH_ICON"
              />
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
