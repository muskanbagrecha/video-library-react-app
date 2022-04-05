import { useNavigate } from "react-router-dom";
import { useFilter } from "../../../../CustomHooks";
export const CategoryItem = ({ title, src }) => {
  const { filterDispatch } = useFilter();
  const navigate = useNavigate();
  return (
    <div
      className="category-item"
      onClick={() => {
        filterDispatch({ type: "SET_CATEGORY", payload: title });
        navigate("/videos");
      }}
    >
      <div
        className="category--background"
        style={{ backgroundImage: `url(${src})` }}
      ></div>
      <div className="category-item__content">
        <h1 className="medium-title">{title}</h1>
        <span className="subtitle">Watch Now</span>
      </div>
    </div>
  );
};
