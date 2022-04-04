import { useContext } from "react";
import { PlaylistContext } from "../Context/playlistContext";

export const usePlaylist = () => useContext(PlaylistContext);