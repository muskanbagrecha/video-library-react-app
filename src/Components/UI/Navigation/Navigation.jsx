import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";
import logo from "../../../Assets/logo.png";

export const Navigation = ({ verticalNavOpen, setVerticalNavOpen }) => {
  const burgerRotate = verticalNavOpen ? "rotate" : "";

  return (
    <nav className={`navigation`}>
      <NavLink to="/">
        <img src={logo} alt="logo" className="img-responsive logo" />
      </NavLink>

      <form className="nav-search">
        <input
          type="search"
          placeholder="Search for videos"
          className="input-styled"
        />
        <button className="btn-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>

      <div
        className={`burger ${burgerRotate}`}
        onClick={() => {
          setVerticalNavOpen((prevState) => !prevState);
        }}
      >
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </div>
    </nav>
  );
};

