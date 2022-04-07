import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { VerticalNavigationItem } from "./VerticalNavigationItem";
import { useAuth, useAlert } from "../../../CustomHooks";
import "./VerticalNavigation.css";

const VerticalNavigation = ({ verticalNavOpen }) => {
  const navClasses = verticalNavOpen ? " vertical-navigation--active" : "";
  const navigate = useNavigate();
  const { setShowAlert } = useAlert();
  const {
    authState: { isAuthenticated, user },
    logout,
  } = useAuth();

  const logoutHandler = () => {
    logout();
    setShowAlert({
      showAlert: true,
      alertMessage: "Logged out!",
      type: "info",
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get("/api/categories");
  //       if (res.status === 200 || res.status === 201) {
  //         setCategories(res.data.categories);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (

    <aside className={`vertical-navigation ${navClasses}`}>
      {isAuthenticated && (
        <div>
          <span className="highlight">
            {`Hi, ${user.firstName} ${user.lastName}`}
          </span>
        </div>
      )}
      <ul className="menu no-list-style">
        <VerticalNavigationItem
          item="Home"
          iconClass="fa-solid fa-house"
          path="/"
        />
        <VerticalNavigationItem
          item="Explore"
          iconClass="fa-solid fa-compass"
          path="/videos"
        />
      </ul>

      <hr />

      <ul className="menu no-list-style">
        <VerticalNavigationItem
          item="Playlist"
          iconClass="fa-solid fa-list"
          path="/playlist"
        />

        <VerticalNavigationItem
          item="History"
          iconClass="fa-solid fa-clock-rotate-left"
          path="/history"
        />
        <VerticalNavigationItem
          item="Watch Later"
          iconClass="fa-regular fa-clock"
          path="/watchlater"
        />
        <VerticalNavigationItem
          item="Liked Videos"
          iconClass="fa-regular fa-thumbs-up"
          path="/likes"
        />
      </ul>

      <hr />

      <div className="user-info flex-col-center">
        {!isAuthenticated ? (
          <>
            <p>Log in to like videos and subscribe.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </button>
          </>
        ) : (
          <button className="btn btn-outline" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default VerticalNavigation;
