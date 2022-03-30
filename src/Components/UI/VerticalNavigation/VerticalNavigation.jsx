import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../../../CustomHooks";
import axios from "axios";
import { VerticalNavigationItem } from "./VerticalNavigationItem";
import "./VerticalNavigation.css";

const VerticalNavigation = ({ verticalNavOpen }) => {
  const navClasses = verticalNavOpen ? " vertical-navigation--active" : "";

  // const { data, serverCall: fetchCategories } = useFetch();

  const [categories, setCategories] = useState([]);

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

  // useEffect(() => {
  //   fetchCategories({ method: "get", url: "/api/videos" });
  // }, []);

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
      <ul className="menu no-list-style">
        <VerticalNavigationItem
          item="Home"
          iconClass="fa-solid fa-house"
          path="/"
        />
        <VerticalNavigationItem
          item="Explore"
          iconClass="fa-solid fa-compass"
          path="/explore"
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
        <p>Log in to like videos and subscribe.</p>
        <button className="btn btn-primary">Log In</button>
      </div>
    </aside>
  );
};

export default VerticalNavigation;