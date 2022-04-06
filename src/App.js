import { AppRouter } from "./Router/AppRouter";
import {
  Navigation,
  VerticalNavigation,
  Footer,
  Alert,
} from "./Components/UI/";
import { PlaylistModal } from "./Pages/PlaylistPage/Components/";
import { useState, useEffect } from "react";
import { useAlert, usePlaylistModal } from "./CustomHooks/";

export const App = () => {
  const [verticalNavOpen, setVerticalNavOpen] = useState(false);
  const { showAlert, setShowAlert } = useAlert();
  const { playlistModal } = usePlaylistModal();
  useEffect(() => {
    setTimeout(() => {
      setShowAlert({
        setShowAlert: false,
        alertMessage: null,
        type: null,
      });
    }, 2000);
  }, [showAlert.showAlert]);

  return (
    <div className="main-container">
      <Navigation
        setVerticalNavOpen={setVerticalNavOpen}
        verticalNavOpen={verticalNavOpen}
      />
      {showAlert.showAlert && <Alert />}
      {playlistModal.showModal && (
        <PlaylistModal video={playlistModal.playlistItem} />
      )}
      <VerticalNavigation verticalNavOpen={verticalNavOpen} />
      <AppRouter />
      <Footer />
    </div>
  );
};
