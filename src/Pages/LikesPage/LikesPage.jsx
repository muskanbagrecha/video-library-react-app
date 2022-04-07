import { useLikes, useAuth } from "../../CustomHooks";
import { VideoCard } from "../VideoPage/Components";
import { LoginPromptComponent } from "../../Components/HelperComponents/LoginPromptComponent";
import { useEffect } from "react";

export const LikesPage = () => {
  const { likedVideos, getAllLikedVideos } = useLikes();

  const {
    authState: { token, isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (likedVideos.length === 0) {
        getAllLikedVideos({ token });
    }
  }, [likedVideos]);

  return (
    <div className="sub-container">
      <h1 className="styled-title">Liked Videos</h1>
      {!isAuthenticated ? (
        <LoginPromptComponent page="Liked Videos" />
      ) : (
        <div className="row-container">
          {likedVideos.length === 0 ? (
            <div className="card-container">
              <p>You have no liked videos</p>
            </div>
          ) : (
            <div className="row-container">
              {likedVideos.map((video) => (
                <VideoCard key={video._id} item={video} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
