import {
  usePlaylistModal,
  useAuth,
  useWatchLater,
  useAlert,
} from "../../../../CustomHooks";
import { useNavigate } from "react-router-dom";
import "./VideoDropdown.css";

export const VideoDropdown = ({ video }) => {
  const { displayModal } = usePlaylistModal();
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated, token },
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

  const { watchLaterVideos, addVideoToWatchLater, deleteVideoFromWatchLater } =
    useWatchLater();

  const currentVideoId = video._id;
  const isCurrVideoInWatchLater = watchLaterVideos?.some(
    (video) => video._id === currentVideoId
  );

  const watchLaterClickHandler = () => {
    if (!isAuthenticated) {
      setShowAlert({
        showAlert: true,
        alertMessage: "Please Login to Like Videos",
        type: "danger",
      });
      navigate("/login");
    }
    if (isCurrVideoInWatchLater) {
      removeVideoFromWatchLaterHandler();
    } else {
      addVideoToWatchLaterHandler();
    }
  };

  const addVideoToWatchLaterHandler = () => {
    addVideoToWatchLater({
      video,
      token,
    });
    setShowAlert({
      showAlert: true,
      alertMessage: "Video Added to Watch Later!",
      type: "success",
    });
  };

  const removeVideoFromWatchLaterHandler = () => {
    deleteVideoFromWatchLater({ videoId: currentVideoId, token });
    setShowAlert({
      showAlert: true,
      alertMessage: "Video Removed from Watch Later!",
      type: "info",
    });
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
        <li className="menu-item" onClick={watchLaterClickHandler}>
          <i>
            <i
              className={`${
                isCurrVideoInWatchLater ? "fa-solid" : "fa-regular"
              } fa-clock`}
            ></i>{" "}
          </i>
          Watch Later
        </li>
        <li className="menu-item"></li>
      </ul>
    </div>
  );
};
