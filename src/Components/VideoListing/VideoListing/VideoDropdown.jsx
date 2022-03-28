import { AddToPlaylist, WatchLater } from "../../../Assets/Icons/Icons";
import "./VideoDropdown.css";

export const VideoDropdown = () => {
  return (
    <div className="video-dropdown">
      <ul className="menu no-list-style">
        <li className="menu-item">
          <i>
            {/* <AddToPlaylist /> */}
            <i class="fa-solid fa-list"></i>
          </i>
          Save to Playlist
        </li>
        <li className="menu-item">
          <i>
            {/* <WatchLater /> */}
            <i className="fa-regular fa-clock"></i>
          </i>
          Watch Later
        </li>
        <li className="menu-item"></li>
      </ul>
    </div>
  );
};
