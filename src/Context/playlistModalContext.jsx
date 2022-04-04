import { createContext, useState } from "react";
const PlaylistModalContext = createContext({
  showModal: false,
});

const PlaylistModalProvider = ({ children }) => {
  const [playlistModal, setPlaylistModal] = useState({
    showModal: false,
    playlistItem: null,
  });

  const displayModal = (video) => {
    setPlaylistModal({
      showModal: true,
      playlistItem: video,
    });
  };

  const hideModal = () => {
    setPlaylistModal({
      showModal: false,
      playlistItem: null,
    });
  };

  return (
    <PlaylistModalContext.Provider
      value={{ playlistModal, displayModal, hideModal }}
    >
      {children}
    </PlaylistModalContext.Provider>
  );
};

export { PlaylistModalContext, PlaylistModalProvider };
