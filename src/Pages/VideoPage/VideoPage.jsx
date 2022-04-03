import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch, useFilter } from "../../CustomHooks";
import { Video, VideoList } from "./Components/";
import "./VideoPage.css";
import spinner from "../../Assets/spinner.svg";
import creators from "../../backend/db/creators";

export const VideoPage = () => {
  const { id: videoURLId } = useParams();
  const { filterState, filterDispatch } = useFilter();
  const { data: allVideoResponse, serverCall: fetchAllVideos } = useFetch();
  const [showDescription, setShowDescription] = useState(false);
  useEffect(() => {
    if (allVideoResponse !== null) {
      filterDispatch({ type: "SET_ITEMS", payload: allVideoResponse.videos });
    } else if (filterState.items.length === 0) {
      fetchAllVideos({ method: "GET", url: "/api/videos" });
    }
  }, [allVideoResponse]);

  const {
    data: currentVideoResponse,
    loading: currentVideoLoader,
    serverCall: fetchCurrentVideo,
    error,
  } = useFetch();

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
  }, [currentVideoResponse, videoURLId]);

  const creatorAccount = creators.find(
    (creator) => creator.name === currentVideoResponse?.video.creator
  );

  return (
    <div className="sub-container video-page-container">
      {/* {videoLoader && <img src={spinner} alt="loading.." />} */}
      {/* need to check where to put loader */}
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
            <span className="btn-icon">
              <i className="fa-regular fa-thumbs-up"></i>
              Like
            </span>
            <span className="btn-icon">
              <i className="fa-regular fa-clock"></i>
              Watch Later
            </span>
            <span className="btn-icon">
              <i className="fa-solid fa-list"></i>
              Save
            </span>
          </div>
        </section>
        <section className="meta-data">
          <span className="views">
            {currentVideoResponse?.video.views ?? ""} views
          </span>
          <span className="date">{currentVideoResponse?.video.date ?? ""}</span>
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
          </section>
        )}
        <button
          className="btn-link-text"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          {showDescription ? "Read Less" : "Read More"}
        </button>
      </main>
      <aside className="side-container">
        <h1 className="large-title">Must Watch</h1>
        <VideoList videos={filterState.items} />
      </aside>
    </div>
  );
};
