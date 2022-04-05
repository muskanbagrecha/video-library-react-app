import { Card } from "../../../../Components/UI";
import { useNavigate } from "react-router-dom";
import { usePlaylist, useAlert, useAuth } from "../../../../CustomHooks";
import "./PlaylistCard.css";

export const PlaylistCard = ({ _id, title }) => {
  const navigate = useNavigate();
  const { deletePlaylist } = usePlaylist();
  const { setShowAlert } = useAlert();
  const {
    authState: { token },
  } = useAuth();
  const selectPlaylistHandler = () => {
    navigate("/playlist/" + _id);
  };

  const deletePlaylistHandler = (e) => {
    e.stopPropagation();
    deletePlaylist({ playlistId: _id, token });
    setShowAlert({
      showAlert: true,
      alertMessage: "Playlist has been deleted",
      type: "info",
    });
    navigate("/playlist");
  };

  return (
    <div onClick={selectPlaylistHandler}>
      <Card className="playlist-card card-vertical">
        <div className="card-top-right" onClick={(e) => deletePlaylistHandler(e)}>
          <i className="fa-solid fa-trash"></i>
        </div>
        <div className="playlist-info">
          <h3 className="playlist-title" title={title}>
            {title}
          </h3>
        </div>
      </Card>
    </div>
  );
};
