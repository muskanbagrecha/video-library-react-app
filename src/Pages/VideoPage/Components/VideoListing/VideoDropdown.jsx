import { usePlaylistModal, useAuth, useAlert } from "../../../../CustomHooks";
import { useNavigate } from "react-router-dom";
import "./VideoDropdown.css";

export const VideoDropdown = ({video}) => {
  const { displayModal } = usePlaylistModal();
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
  } = useAuth();
  const { setShowAlert } = useAlert();
  const saveToPlaylistHandler = () => {
    if (isAuthenticated) {
      displayModal(video);
    } else {
      setShowAlert({
        showAlert: true,
        alertMessage: "Please Login to View Your Playlist",
        type: "danger",
      });
      navigate("/login");
    }
  };

  return (
    <div className="video-dropdown">
      <ul className="menu no-list-style">
        <li className="menu-item" onClick={saveToPlaylistHandler}>
          <i>
            <i className="fa-solid fa-list"></i>
          </i>
          Save
        </li>
        <li className="menu-item">
          <i>
            <i className="fa-regular fa-clock"></i>
          </i>
          Watch Later
        </li>
        <li className="menu-item"></li>
      </ul>
    </div>
  );
};
