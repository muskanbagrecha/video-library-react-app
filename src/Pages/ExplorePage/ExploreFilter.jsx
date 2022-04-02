import { useFilter } from "../../CustomHooks";
import { useEffect, useState } from "react";
import axios from "axios";
export const ExploreFilter = () => {
  // const { data, serverCall: fetchCategories } = useFetch();

  const [data, setData] = useState([]);
  const { filterState, filterDispatch } = useFilter();

  // useEffect(() => {
  //   fetchCategories({ method: "get", url: "/api/categories" });
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/categories");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const chips =
    data.categories &&
    [
      {
        categoryName: "All",
      },
      ...data.categories,
    ].map(({ categoryName }) => {
      return (
        <div
          className={
            "btn btn-chip" +
            (filterState.selectedCategory && categoryName
              ? " btn-chip--active"
              : "")
          }
          key={categoryName}
          onClick={() => {
            categoryName !== "All"
              ? filterDispatch({
                  type: "SET_CATEGORY",
                  payload: categoryName,
                })
              : filterDispatch({ type: "RESET_CATEGORY" });
          }}
        >
          {categoryName}
        </div>
      );
    });

  return <>{chips}</>;
};
