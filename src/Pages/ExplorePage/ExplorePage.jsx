import { ExploreFilter } from "./ExploreFilter";
import { useFilter, useFetch } from "../../CustomHooks/";
import { useEffect } from "react";
import { VideoCard } from "../../Components/VideoListing/";
export const ExplorePage = () => {
  const { filterState, filterDispatch } = useFilter();
  const { data, loader, serverCall: fetchVideos } = useFetch();

  useEffect(() => {
    if (data !== null) {
      filterDispatch({ type: "SET_ITEMS", payload: data.videos });
    } else {
      fetchVideos({ method: "GET", url: "/api/videos" });
    }
  }, [data]);

  const filterByCategories = () => {
    const { selectedCategory, items } = filterState;
    if (selectedCategory === "All") {
      return items;
    }
    return items.filter((item) => {
      return item.category === selectedCategory;
    });
  };

  const filteredData = filterByCategories();
  console.log(filteredData);
  const cards = filteredData.map((item) => {
    return (
      <VideoCard
        key={item._id}
        thumbnail={item.thumbnail}
        title={item.title}
        creator={item.creator}
        views={item.views}
        date={item.date}
        label={item.label}
        glimpse={item.glimpse}
      />
    );
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
