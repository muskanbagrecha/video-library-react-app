import { useEffect } from "react";
import { useHistory, useAuth, useAlert } from "../../CustomHooks";
import { VideoCard } from "../VideoPage/Components";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
  const { history, getFromHistory, deleteAllFromHistory } = useHistory();

  const {
    authState: { token, isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (history.length === 0) {
      getFromHistory({ token });
    }
  }, [history]);

  const navigate = useNavigate();
  const { setShowAlert } = useAlert();

  const deleteAllFromHistoryHandler = () => {
    deleteAllFromHistory({ token });
    setShowAlert({
      showAlert: true,
      alertMessage: "All videos have been deleted from history",
      type: "info",
    });
  };

  return (
    <div className="sub-container">
      <h1 className="styled-title">History</h1>
      {isAuthenticated ? (
        history.length === 0 ? (
          <div className="card-container">
            <p>You have no videos in your history</p>
          </div>
        ) : (
          <>
            <div className="flex-col-center">
              <button
                className="btn btn-outline"
                onClick={deleteAllFromHistoryHandler}
              >
                Clear All
              </button>
              <div className="row-container">
                {history.map((item) => (
                  <VideoCard key={item._id} item={item} type="HISTORY_CARD" />
                ))}
              </div>
            </div>
          </>
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
