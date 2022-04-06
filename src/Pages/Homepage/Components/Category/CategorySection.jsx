import { useEffect } from "react";
import { useFetch } from "../../../../CustomHooks";
import { CategoryItem } from "./CategoryItem";
import spinner from "../../../../Assets/spinner.svg";
import "./CategorySection.css";
export const CategorySection = () => {
  const { data, loading, serverCall: fetchCategories } = useFetch();

  useEffect(() => {
    fetchCategories({ method: "get", url: "/api/categories" });
  }, []);

  const categoriesEls = data?.categories?.map((category) => {
    return (
      <CategoryItem
        title={category.categoryName}
        src={category.imageUrl}
        key={category._id}
      />
    );
  });

  return (
    <section className="category-section">
      {loading ? (
        <img src={spinner} alt="loading" style={{ margin: "auto" }} />
      ) : null}
      {categoriesEls}
    </section>
  );
};
