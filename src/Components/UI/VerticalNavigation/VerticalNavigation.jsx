import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { VerticalNavigationItem } from "./VerticalNavigationItem";
import { useAuth, useAlert } from "../../../CustomHooks";
import "./VerticalNavigation.css";

const VerticalNavigation = ({ verticalNavOpen }) => {
  const navClasses = verticalNavOpen ? " vertical-navigation--active" : "";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/categories");
        if (res.status === 200 || res.status === 201) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const categoriesEl = categories
    ? categories.map((category) => {
        return (
          <li className="menu-item" key={category._id}>
            <i className="fa-solid fa-play"></i>
            <span>{category.categoryName}</span>
          </li>
        );
      })
    : null;

  return (
    //routes will be added in next PR

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
          item="Library"
          iconClass="fa-solid fa-list"
          path="/"
        />

        <VerticalNavigationItem
          item="History"
          iconClass="fa-solid fa-clock-rotate-left"
          path="/"
        />
        <VerticalNavigationItem
          item="Watch Later"
          iconClass="fa-regular fa-clock"
          path="/"
        />
        <VerticalNavigationItem
          item="Liked Videos"
          iconClass="fa-regular fa-thumbs-up"
          path="/"
        />
      </ul>

      <hr />

      <ul className="menu no-list-style">{categoriesEl}</ul>

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
