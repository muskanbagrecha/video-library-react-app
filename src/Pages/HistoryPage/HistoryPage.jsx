import { useEffect } from "react";
import { useHistory, useAuth } from "../../CustomHooks";
import { VideoCard } from "../VideoPage/Components";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
  const { history, getFromHistory, deleteAllFromHistory } = useHistory();

  const {
    authState: { encodedToken, isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (history.length === 0) {
      getFromHistory({ token: encodedToken });
    }
  }, [history]);

  const navigate = useNavigate();

  return (
    <div className="sub-container">
      <h1 className="styled-title">History</h1>
      {isAuthenticated ? (
        history.length === 0 ? (
          <div className="card-container">
            <p>You have no videos in your history</p>
          </div>
        ) : (
          <div className="row-container">
            {history.map((item) => (
              <VideoCard key={item._id} item={item} type="HISTORY_CARD" />
            ))}
          </div>
        )
      ) : (
        <div className="row-container flex-col-center">
          <p>Please Login to View Your History</p>
          <button
            className="btn btn-primary margin-top-1rem"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
