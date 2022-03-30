import { useFetch, useFilter } from "../../CustomHooks";
import { useEffect } from "react";
export const ExploreFilter = () => {
  const { data, serverCall: fetchCategories } = useFetch();

  const { filterDispatch } = useFilter();

  useEffect(() => {
    fetchCategories({ method: "get", url: "/api/categories" });
  }, []);

  const chips =
    data.categories &&
    [
      {
        categoryName: "All",
      },
      ...data.categories,
    ].map((category) => {
      return (
        <div
          className="btn btn-chip"
          key={category.categoryName}
          onClick={() => {
            category !== "All"
              ? filterDispatch({ type: "SET_CATEGORY", payload: category })
              : filterDispatch({ type: "RESET_CATEGORY" });
          }}
        >
          {category.categoryName}
        </div>
      );
    });

  return <>{chips}</>;
};
