import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../../../CustomHooks";
import "./VerticalNavigation.css";
const VerticalNavigation = ({ verticalNavOpen }) => {
  const navClasses = verticalNavOpen ? " vertical-navigation--active" : "";

  const { data, serverCall: fetchCategories } = useFetch();

  useEffect(() => {
    fetchCategories({ method: "get", url: "/api/categories" });
  }, []);

  const categoriesEl = data.categories
    ? data.categories.map((category) => {
        return (
          <li className="menu-item" key={category._id}>
            <i className="fa-solid fa-play"></i>
            <span>{category.categoryName}</span>
          </li>
        );
      })
    : null;

  return (
    <aside className={`vertical-navigation ${navClasses}`}>
      <ul className="menu no-list-style">
        <li className="menu-item">
          <i className="fa-solid fa-house"></i>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li className="menu-item">
          <i className="fa-solid fa-compass"></i> <span>Explore</span>
        </li>
      </ul>

      <hr />

      <ul className="menu no-list-style">
        <li className="menu-item">
          <i className="fa-solid fa-list"></i>
          <span>Library</span>
        </li>
        <li className="menu-item">
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span>History</span>
        </li>
        <li className="menu-item">
          <i className="fa-regular fa-clock"></i> <span>Watch Later</span>
        </li>
        <li className="menu-item">
          <i className="fa-regular fa-thumbs-up"></i> <span>Liked Videos</span>
        </li>
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
