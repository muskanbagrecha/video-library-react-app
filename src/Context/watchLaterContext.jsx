import { createContext, useState, useEffect } from "react";
import { useFetch } from "../CustomHooks";

export const WatchLaterContext = createContext([]);
export const WatchLaterProvider = ({ children }) => {
  const { data: watchLaterResponse, serverCall: watchLaterServerCall } =
    useFetch();

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  useEffect(() => {
    if (watchLaterResponse != null && watchLaterResponse.watchlater) {
      setWatchLaterVideos(watchLaterResponse.watchlater);
    } else if (token) {
        getAllWatchLaterVideos({
        token,
      });
    }
  }, [watchLaterResponse]);

  const getAllWatchLaterVideos = ({ token }) => {
    watchLaterServerCall({
      method: "get",
      url: "/api/user/watchlater",
      headers: { authorization: token },
    });
  };

  const addVideoToWatchLater = ({ video, token }) => {
    watchLaterServerCall({
      method: "post",
      url: "/api/user/watchlater",
      data: { video },
      headers: { authorization: token },
    });
  };

  const deleteVideoFromWatchLater = ({ videoId, token }) => {
    watchLaterServerCall({
      method: "delete",
      url: `/api/user/watchlater/${videoId}`,
      headers: { authorization: token },
    });
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLaterVideos,
        getAllWatchLaterVideos,
        addVideoToWatchLater,
        deleteVideoFromWatchLater,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};
