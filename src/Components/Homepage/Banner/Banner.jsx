import { useNavigate } from "react-router-dom";
import "./Banner.css";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner">
      <h1 className="large-title">Fashgram Library</h1>
      <p>Look Different to Feel Different</p>
      <button
        className="btn btn-white-no-br"
        onClick={() => {
          navigate("/explore");
        }}
      >
        Explore
      </button>
    </div>
  );
};

export default Banner;
