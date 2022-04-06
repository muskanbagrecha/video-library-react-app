import { createContext, useState, useEffect } from "react";
import { useFetch } from "../CustomHooks";

export const LikesContext = createContext([]);
export const LikesProvider = ({ children }) => {
  const { data: likesResponse, serverCall: likesServerCall } = useFetch();

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    if (likesResponse != null && likesResponse.likes) {
      setLikedVideos(likesResponse.likes);
    } else if (token) {
      getAllLikedVideos({
        token,
      });
    }
  }, [likesResponse]);

  const getAllLikedVideos = ({ token }) => {
    likesServerCall({
      method: "get",
      url: "/api/user/likes",
      headers: { authorization: token },
    });
  };

  const addVideoToLikes = ({ video, token }) => {
    likesServerCall({
      method: "post",
      url: "/api/user/likes",
      data: { video },
      headers: { authorization: token },
    });
  };

  const deleteVideoFromLikes = ({ videoId, token }) => {
    likesServerCall({
      method: "delete",
      url: `/api/user/likes/${videoId}`,
      headers: { authorization: token },
    });
  };

  return (
    <LikesContext.Provider
      value={{
        likedVideos,
        getAllLikedVideos,
        addVideoToLikes,
        deleteVideoFromLikes,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};
