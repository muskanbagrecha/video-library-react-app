import { useWatchLater, useAuth } from "../../CustomHooks";
import { VideoCard } from "../VideoPage/Components";
import { LoginPromptComponent } from "../../Components/HelperComponents/LoginPromptComponent";
import { useEffect } from "react";

export const WatchLaterPage = () => {
  const { watchLaterVideos, getAllWatchLaterVideos } = useWatchLater();

  const {
    authState: { token, isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (watchLaterVideos.length === 0) {
      getAllWatchLaterVideos({ token });
    }
  }, [watchLaterVideos]);

  return (
    <div className="sub-container">
      <h1 className="styled-title">Watch Later</h1>
      {!isAuthenticated ? (
        <LoginPromptComponent page="Watch Later" />
      ) : (
        <div className="row-container">
          {watchLaterVideos.length === 0 ? (
            <div className="card-container">
              <p>You have no videos to watch later.</p>
            </div>
          ) : (
            <div className="row-container">
              {watchLaterVideos.map((video) => (
                <VideoCard key={video._id} item={video} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
