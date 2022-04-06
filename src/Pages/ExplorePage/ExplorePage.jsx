import { ExploreFilter } from "./ExploreFilter";
import { useFilter, useFetch } from "../../CustomHooks/";
import { useEffect } from "react";
import { VideoList } from "../VideoPage/Components/";
export const ExplorePage = () => {
  const { filterState, filterDispatch } = useFilter();

  const { data: videoData, serverCall: fetchVideos } = useFetch();

  useEffect(() => {
    if (videoData !== null) {
      filterDispatch({ type: "SET_ITEMS", payload: videoData.videos });
    } else if (filterState.items.length === 0) {
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

  const filterBySearch = (data) => {
    if (filterState.search) {
      const search = filterState.search.toLowerCase().trim();
      return data.filter(
        (video) =>
          video.title.toLowerCase().includes(search) ||
          video.category.toLowerCase().includes(search)
      );
    }
    return data;
  };

  const filteredByCategories = filterByCategories();
  const filteredData = filterBySearch(filteredByCategories);

  return (
    <div className="sub-container">
      <h1 className="styled-title">All Videos</h1>
      <div className="row-container">
        <ExploreFilter />
      </div>
      <div className="card-container">
        <VideoList videos={filteredData} />
      </div>
    </div>
  );
};
