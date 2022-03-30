import { Card } from "../../UI/";
import { useState } from "react";
import { VideoDropdown } from "./VideoDropdown";
import "./VideoCard.css";
export const VideoCard = ({
  thumbnail,
  glimpse,
  title,
  creator,
  views,
  date,
  label,
}) => {
  const [cardHover, setCardHover] = useState(thumbnail);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Card className="card-vertical card-video">
      <div
        className="card-top-right"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
        {showDropdown && <VideoDropdown />}
      </div>
      <div
        className="card__img"
        onMouseEnter={() => setCardHover(glimpse)}
        onMouseLeave={() => setCardHover(thumbnail)}
      >
        <img src={cardHover} alt={title} className="img-responsive" />
      </div>
      <div
        className="card__content"
        onClick={() => {
          console.log("clicked");
        }}
      >
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
          <button className="btn btn-primary btn-full-width">
            <i className="fa-solid fa-play"></i>
            Watch Now
          </button>
        </div>
      </div>
    </Card>
  );
};
