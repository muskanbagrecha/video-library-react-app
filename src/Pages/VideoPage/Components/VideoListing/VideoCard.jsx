import { Card } from "../../../../Components/UI/";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { VideoDropdown } from "./VideoDropdown";
import { useHistory, useAuth, useAlert } from "../../../../CustomHooks";
import "./VideoCard.css";
import { useEffect } from "react";

export const VideoCard = ({ item, type }) => {
  const { _id, thumbnail, title, creator, views, date, label, glimpse } = item;
  const [cardHover, setCardHover] = useState(thumbnail);
  const [showDropdown, setShowDropdown] = useState(false);
  const {setShowAlert} = useAlert();

  const {
    authState: { isAuthenticated, token },
  } = useAuth();
  const { history, addToHistory, deleteFromHistory } = useHistory();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const viewVideoHandler = () => {
    if (isAuthenticated) {
      const isExistingInHistory = history.some((item) => item._id === _id);
      if (!isExistingInHistory) {
        addToHistory({ video: item, token });
      }
    }
    navigate(`/videos/${_id}`);
  };

  const deleteFromHistoryHandler = () => {
    deleteFromHistory({ _id, token });
    setShowAlert({
      showAlert: true,
      alertMessage: "Video has been deleted from history",
      type: "info",
    })
  }

  return (
    <Card className={`card-vertical card-video card-history`}>
      <div
        className="card-top-right"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
        {showDropdown && <VideoDropdown video={item} />}
      </div>
      {type === "HISTORY_CARD" && (
        <div
          className="card-top-left"
          onClick={deleteFromHistoryHandler}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      )}
      <div
        className="card__img"
        onMouseEnter={() => setCardHover(glimpse)}
        onMouseLeave={() => setCardHover(thumbnail)}
        onClick={viewVideoHandler}
      >
        <img src={cardHover} alt={title} className="img-responsive" />
      </div>
      <div className="card__content">
        <div className="card__header">
          <h4 className="card__title" title={title}>
            {title}
          </h4>
        </div>
        <div className="card__body">
          <p>By {creator}</p>
          <span>{views} views |</span>
          <span>{date}</span>
        </div>
        <div className="card__CTA">
          <button
            className="btn btn-primary btn-full-width"
            onClick={viewVideoHandler}
          >
            <i className="fa-solid fa-play"></i>
            Watch Now
          </button>
        </div>
      </div>
    </Card>
  );
};
