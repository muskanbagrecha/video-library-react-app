import { ExploreFilter } from "./ExploreFilter";
import { useFilter, useFetch } from "../../CustomHooks/";
import { useEffect } from "react";
import { VideoCard } from "../VideoPage/Components/VideoListing/VideoCard.jsx";
export const ExplorePage = () => {
  const { filterState, filterDispatch } = useFilter();
  const {
    data: videoData,
    loader: videoLoader,
    serverCall: fetchVideos,
  } = useFetch();

  useEffect(() => {
    if (videoData !== null) {
      filterDispatch({ type: "SET_ITEMS", payload: videoData.videos });
    } else {
      fetchVideos({ method: "GET", url: "/api/videos" });
    }
  }, [videoData]);

  const filterByCategories = () => {
    const { selectedCategory, items } = filterState;
    if (selectedCategory === "All") {
      return items;
    }
    return items.filter((item) => item.category === selectedCategory);
  };

  const filteredData = filterByCategories();
  console.log(filteredData);
  const cards = filteredData.map((item) => {
    return <VideoCard key={item._id} item={item} />;
  });
  console.log(cards);

  return (
    <div className="sub-container">
      <h1 className="styled-title">All Videos</h1>
      {/* {loader && <div className="loader"></div>} */}
      <div className="row-container">
        <ExploreFilter />
      </div>
      <div className="card-container">{cards}</div>
    </div>
  );
};
