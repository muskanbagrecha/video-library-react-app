import { useEffect, useState } from "react";
import { Banner, CategorySection } from "./Components/";
import { Video } from "../VideoPage/Components/";
import { useFetch, useFilter, useAlert } from "../../CustomHooks/";
import { VideoList } from "../VideoPage/Components/VideoListing/VideoList";
import { Alert } from "../../Components/UI";
import { homepageVideo } from "../../Assets/Video";
import "./Homepage.css";
import spinner from "../../Assets/spinner.svg";

export const Homepage = () => {
  const [loader, setLoader] = useState(true);
  const { showAlert } = useAlert();
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  const { data, serverCall: fetchVideos } = useFetch();
  const { filterState, filterDispatch } = useFilter();
  useEffect(() => {
    if (data !== null) {
      filterDispatch({ type: "SET_ITEMS", payload: data.videos });
    } else {
      fetchVideos({ method: "GET", url: "/api/videos" });
    }
  }, [data]);

  const getLandingVideos = () => {
    return filterState.items.filter((item) => item.showOnLanding);
  };

  return loader ? (
    <div className="sub-container flex-center">
      <img src={spinner} alt="loading.." />
    </div>
  ) : (
    <div className="sub-container">
      {showAlert.showAlert && <Alert />}
      <div className="mainvideo-container">
        <Video
          src={`1c2-yWp-9pk`}
          className="homepage-video"
          autoplay="autoplay"
          loop="loop"
        />
        <Banner />
      </div>
      <h1 className="styled-title">Featured Categories</h1>
      <CategorySection />
      <h1 className="styled-title">Most Watched Videos</h1>
      <VideoList videos={getLandingVideos()} />
    </div>
  );
};

//https://www.youtube.com/watch?v=uFgcSjVRJhE
//https://www.youtube.com/watch?v=1c2-yWp-9pk
