import { NavLink } from "react-router-dom";

export const VerticalNavigationItem = ({ item, iconClass, path }) => {
  return (
    <li className="menu-item">
      <i className={iconClass} aria-hidden="true"></i>
      <NavLink to={path}>{item}</NavLink>
    </li>
  );
};
