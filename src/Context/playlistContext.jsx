import { useState, useEffect, createContext } from "react";
import { useFetch } from "../CustomHooks";

export const PlaylistContext = createContext([]);

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : null;

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState(null);
  const { data: allPlaylistResponse, serverCall: allPlaylistServerCall } =
    useFetch();
  const { data: currPlaylistResponse, serverCall: currPlaylistServerCall } =
    useFetch();

  useEffect(() => {
    if (allPlaylistResponse != null && allPlaylistResponse.playlists) {
      setPlaylists(allPlaylistResponse.playlists);
    } else if (token) {
      getAllPlaylists(token);
    }
  }, [allPlaylistResponse]);

  useEffect(() => {
    if (currPlaylistResponse != null && currPlaylistResponse.playlist) {
      const updatedPlaylists = playlists.map((playlist) => {
        return playlist._id === currPlaylistResponse.playlist._id
          ? currPlaylistResponse.playlist
          : playlist;
      });
      setPlaylists(updatedPlaylists);
    }
  }, [currPlaylistResponse]);

  const getAllPlaylists = ({ token }) => {
    allPlaylistServerCall({
      method: "get",
      url: "/api/user/playlists",
      headers: { authorization: token },
    });
  };

  const createPlaylist = ({ playlist, token }) => {
    allPlaylistServerCall({
      method: "post",
      url: "/api/user/playlists",
      data: { playlist },
      headers: { authorization: token },
    });
  };

  const deletePlaylist = ({ playlistId, token }) => {
    allPlaylistServerCall({
      method: "delete",
      url: `/api/user/playlists/${playlistId}`,
      headers: { authorization: token },
    });
  };

  const addVideoToPlaylist = ({ playlistId, video, token }) => {
    currPlaylistServerCall({
      method: "post",
      url: `/api/user/playlists/${playlistId}`,
      data: { video },
      headers: { authorization: token },
    });
  };

  const deleteVideoFromPlaylist = ({ playlistId, videoId, token }) => {
    currPlaylistServerCall({
      method: "delete",
      url: `/api/user/playlists/${playlistId}/${videoId}`,
      headers: { authorization: token },
    });
    console.log("deleted!");
    console.log(currPlaylistResponse);
  };
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        getAllPlaylists,
        createPlaylist,
        deletePlaylist,
        addVideoToPlaylist,
        deleteVideoFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
