import { useContext } from "react";
import { LikesContext } from "../Context/likesContext";

export const useLikes = () => useContext(LikesContext);