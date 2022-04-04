import { useContext } from "react";
import { PlaylistModalContext } from "../Context/playlistModalContext.jsx";

export const usePlaylistModal = () => useContext(PlaylistModalContext);
