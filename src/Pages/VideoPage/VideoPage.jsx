import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useFetch,
  useFilter,
  usePlaylistModal,
  useAuth,
  useAlert,
  useLikes,
  useWatchLater,
} from "../../CustomHooks";
import { Video, VideoList } from "./Components/";
import "./VideoPage.css";
import spinner from "../../Assets/spinner.svg";
import creators from "../../backend/db/creators";

export const VideoPage = () => {
  const { id: videoURLId } = useParams();
  const { filterState, filterDispatch } = useFilter();
  const { data: allVideoResponse, serverCall: fetchAllVideos } = useFetch();
  const { displayModal } = usePlaylistModal();
  const [showDescription, setShowDescription] = useState(false);
  const { setShowAlert } = useAlert();
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated, token },
  } = useAuth();

  const {
    data: currentVideoResponse,
    loading: currentVideoLoader,
    serverCall: fetchCurrentVideo,
    error,
  } = useFetch();

  const { likedVideos, addVideoToLikes, deleteVideoFromLikes } = useLikes();
  const [mustWatchVideos, setMustWatchVideos] = useState([""]);
  const { watchLaterVideos, addVideoToWatchLater, deleteVideoFromWatchLater } =
    useWatchLater();

  useEffect(() => {
    if (allVideoResponse !== null) {
      filterDispatch({ type: "SET_ITEMS", payload: allVideoResponse.videos });
    } else if (filterState.items.length === 0) {
      fetchAllVideos({ method: "GET", url: "/api/videos" });
    }
  }, [allVideoResponse]);

  useEffect(() => {
    if (
      currentVideoResponse === null ||
      currentVideoResponse?.video._id !== videoURLId
    ) {
      fetchCurrentVideo({ method: "get", url: `/api/video/${videoURLId}` });
      if (error) {
        console.log(error);
      }
    }
  }, [currentVideoResponse, videoURLId, filterState.items]);

  useEffect(() => {
    const newMustWatchVideos = [...filterState.items].sort(
      () => Math.random() - 0.5
    );
    setMustWatchVideos(
      newMustWatchVideos.filter((video) => video._id !== videoURLId)
    );
  }, [currentVideoResponse]);

  const creatorAccount = creators.find(
    (creator) => creator.name === currentVideoResponse?.video.creator
  );

  const saveToPlaylistHandler = () => {
    if (isAuthenticated) {
      displayModal(currentVideoResponse.video);
    } else {
      setShowAlert({
        showAlert: true,
        alertMessage: "Please Login to View Your Playlist",
        type: "danger",
      });
      navigate("/login");
    }
  };

  const currentVideoId = currentVideoResponse?.video._id;
  const isCurrVideoLiked = likedVideos?.some(
    (video) => video._id === currentVideoId
  );
  const isCurrVideoInWatchLater = watchLaterVideos?.some(
    (video) => video._id === currentVideoId
  );

  const likeClickHandler = () => {
    if (!isAuthenticated) {
      setShowAlert({
        showAlert: true,
        alertMessage: "Please Login to Like Videos",
        type: "danger",
      });
      navigate("/login");
    }
    if (isCurrVideoLiked) {
      removeVideoFromLikesHandler();
    } else {
      addVideoToLikesHandler();
    }
  };

  const addVideoToLikesHandler = () => {
    if (isAuthenticated) {
      addVideoToLikes({ video: currentVideoResponse.video, token });
      setShowAlert({
        showAlert: true,
        alertMessage: "Video Liked!",
        type: "success",
      });
    }
    else{
      setShowAlert({
        showAlert: true,
        alertMessage: "Please Login to Like Videos",
        type: "danger",
      });
      navigate("/login");
    }
  };

  const removeVideoFromLikesHandler = () => {
    deleteVideoFromLikes({ videoId: currentVideoId, token });
    setShowAlert({
      showAlert: true,
      alertMessage: "Video Unliked!",
      type: "info",
    });
  };

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
      video: currentVideoResponse.video,
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
    <div className="sub-container video-page-container">
      {currentVideoLoader ? (
        <div className="row-container">
          <img src={spinner} alt="spinner" />
        </div>
      ) : (
        <main className="video-container">
          {currentVideoResponse?.video && (
            <Video
              src={currentVideoResponse.video._id}
              title={currentVideoResponse.video.title}
              autoplay={true}
            />
          )}
          <section className="video-description">
            <h1 className="large-title video-title">
              {currentVideoResponse?.video.title ?? ""}
            </h1>
            <div className="video-CTA">
              <span className="btn-icon" onClick={likeClickHandler}>
                <i
                  className={`${
                    isCurrVideoLiked ? "fa-solid" : "fa-regular"
                  } fa-thumbs-up`}
                ></i>
                Like
              </span>
              <span className="btn-icon" onClick={watchLaterClickHandler}>
                <i
                  className={`${
                    isCurrVideoInWatchLater ? "fa-solid" : "fa-regular"
                  } fa-clock`}
                ></i>
                Watch Later
              </span>
              <span className="btn-icon" onClick={saveToPlaylistHandler}>
                <i className="fa-solid fa-list"></i>
                Save
              </span>
            </div>
          </section>
          <section className="meta-data">
            <span className="views">
              {currentVideoResponse?.video.views ?? ""} views
            </span>
            <span className="date">
              {currentVideoResponse?.video.date ?? ""}
            </span>
          </section>
          <hr />
          <section className="creator-description">
            <div className="avatar avatar-xs">
              <img
                src={creatorAccount?.imageUrl}
                alt={creatorAccount?.name}
                className="img-responsive img-rounded"
              />
            </div>
            <div className="creator-info">
              <p className="creator-name">{creatorAccount?.name}</p>
              <p className="creator-subscribers">
                {creatorAccount?.subscribers} subscribers
              </p>
            </div>
          </section>
          {showDescription && (
            <section className="video-description-text">
              <p>{currentVideoResponse?.video.description ?? ""}</p>
              <p>Category: {currentVideoResponse?.video.category}</p>
            </section>
          )}
          <button
            className="btn-link-text"
            onClick={() => setShowDescription((prev) => !prev)}
          >
            {showDescription ? "Read Less" : "Read More"}
          </button>
        </main>
      )}

      <aside className="side-container">
        <h1 className="large-title">Must Watch</h1>
        <VideoList videos={mustWatchVideos} />
      </aside>
    </div>
  );
};
