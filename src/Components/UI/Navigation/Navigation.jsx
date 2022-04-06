import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFilter } from "../../../CustomHooks";
import "./Navigation.css";
import logo from "../../../Assets/logo.png";

export const Navigation = ({ verticalNavOpen, setVerticalNavOpen }) => {
  const burgerRotate = verticalNavOpen ? "rotate" : "";
  const [search, setSearch] = useState("");
  const { filterState, filterDispatch } = useFilter();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    navigate("/videos");
    filterDispatch({ type: "SEARCH", payload: search });
    setSearch("");
  };

  return (
    <nav className={`navigation`}>
      <NavLink to="/">
        <img src={logo} alt="logo" className="img-responsive logo" />
      </NavLink>

      <form className="nav-search" onSubmit={searchHandler}>
        <input
          type="search"
          placeholder="Search for videos"
          className="input-styled"
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") {
              filterDispatch({ type: "SEARCH", payload: "" });
            }
          }}
          value={search || filterState.search}
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
