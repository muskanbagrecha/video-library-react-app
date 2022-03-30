import { useContext } from "react";
import { FilterContext } from "../Context/filterContext";

export const useFilter = () => useContext(FilterContext);
