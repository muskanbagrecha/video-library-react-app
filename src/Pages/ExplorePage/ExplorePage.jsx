import { ExploreFilter } from "./ExploreFilter";
import { useFilter, useFetch } from "../../CustomHooks/";
import { useEffect, useState } from "react";
import { VideoCard } from "../../Components/VideoListing/VideoListing/VideoCard";
export const ExplorePage = () => {
  const { filterState, filterDispatch } = useFilter();
  const { data : resData, serverCall: fetchVideos } = useFetch();
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    console.log("IN effect", resData);
    resData
      ? // ? filterDispatch({ type: "SET_ITEMS", payload: data.videos })
        setInitialData(resData.videos)
      : fetchVideos({ method: "GET", url: "/api/videos" });
  }, [resData]);

  useEffect(() => {},[

  ])

  console.log("data...",resData)

  const filterByCategories = () => {
    const { categories, items } = filterState;
    console.log(filterState);
    if (categories.includes("All")) {
      return items;
    }
    return items.filter((item) => {
      categories.includes(item.category);
    });
  };

  const filteredData = filterByCategories();

  return (
    <div className="sub-container">
      <h1 className="styled-title">All Videos</h1>
      <div className="row-container">
        <ExploreFilter />
      </div>
      <div className="row-container">
        {filteredData?.map((item) => {
          <VideoCard {...item} />;
        })}
      </div>
    </div>
  );
};
