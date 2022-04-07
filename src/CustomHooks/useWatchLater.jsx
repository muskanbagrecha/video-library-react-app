import { useContext } from "react";
import { WatchLaterContext } from "../Context/watchLaterContext";

export const useWatchLater = () => useContext(WatchLaterContext);
