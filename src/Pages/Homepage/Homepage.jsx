import { useEffect, useState } from "react";
import { Banner } from "../../Components/Homepage";
import { Video } from "../../Components/VideoListing/";
import { CategorySection } from "../../Components/Homepage";
import { VideoList } from "../../Components/VideoListing/VideoListing/VideoList";
import { homepageVideo } from "../../Assets/Video";
import "./Homepage.css";
import spinner from "../../Assets/spinner.svg";

export const Homepage = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      console.log("Setting");
      setLoader(false);
      console.log(loader);
    }, 500);
  }, []);

  return loader ? (
    <div className="sub-container flex-center">
      <img src={spinner} alt="loading.." />
    </div>
  ) : (
    <div className="sub-container">
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
      <VideoList />
    </div>
  );
};

//https://www.youtube.com/watch?v=uFgcSjVRJhE
//https://www.youtube.com/watch?v=1c2-yWp-9pk
