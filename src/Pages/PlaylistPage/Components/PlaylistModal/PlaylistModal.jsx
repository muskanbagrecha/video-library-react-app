import { useState, useEffect } from "react";
import {
  usePlaylist,
  useAuth,
  useAlert,
  usePlaylistModal,
} from "../../../../CustomHooks";
import { Modal } from "../../../../Components/UI";
import "./PlaylistModal.css";

export const PlaylistModal = ({ video }) => {
  const [playlistInput, setPlaylistInput] = useState({
    title: "",
    description: "",
    error: null,
  });

  const {
    playlists,
    getAllPlaylists,
    createPlaylist,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
  } = usePlaylist();

  const {
    authState: { token, isAuthenticated },
  } = useAuth();

  const { setShowAlert } = useAlert();
  useEffect(() => {
    if (playlists === null) {
      getAllPlaylists({ token });
    }
  }, [playlists]);

  const { playlistModal } = usePlaylistModal();

  const inputChangeHandler = (event) => {
    setPlaylistInput({
      ...playlistInput,
      [event.target.name]: event.target.value,
    });
  };

  const createPlaylistHandler = (e) => {
    setPlaylistInput({ ...playlistInput, error: false });
    e.preventDefault();
    if (isAuthenticated) {
      if (playlistInput.title.trim() === "") {
        setPlaylistInput({ ...playlistInput, error: "Title is required" });
        return;
      }
      createPlaylist({
        playlist: {
          title: playlistInput.title,
          description: playlistInput.description,
        },
        token,
      });
      setShowAlert({
        showAlert: true,
        alertMessage: "Playlist Created Successfully",
        type: "success",
      });
      setPlaylistInput({ title: "", description: "", error: false });
    }
  };

  const playlistChangeHandler = (event) => {
    if (event.target.checked) {
      const playlistId = playlists.find(
        (playlist) => playlist.title === event.target.name
      )._id;
      addVideoToPlaylist({
        playlistId,
        video: playlistModal.playlistItem,
        token,
      });
      setShowAlert({
        showAlert: true,
        alertMessage: "Video Added to Playlist Successfully",
        type: "success",
      });
    } else if (!event.target.checked) {
      deleteVideoFromPlaylist({
        playlistId: playlists.find(
          (playlist) => playlist.title === event.target.name
        )._id,
        videoId: playlistModal.playlistItem._id,
        token,
      });
      setShowAlert({
        showAlert: true,
        alertMessage: "Video Removed from Playlist",
        type: "info",
      });
    }
  };

  const playlistItems = playlists?.map(({ _id, title, videos }) => {
    return (
      <li key={_id} title={title}>
        <label htmlFor={title}>
          <input
            type="checkbox"
            name={title}
            id={title}
            checked={videos.some((item) => item._id === video._id)}
          />{" "}
          {title}
        </label>
      </li>
    );
  });

  return (
    <Modal modalClass="playlist-modal">
      <h3>My Playlists</h3>
      {playlists?.length > 0 ? (
        <>
          <legend>Pick Playlist</legend>
          <div
            className="playlist-item-container"
            onChange={playlistChangeHandler}
          >
            <ul className="no-list-style">{playlistItems}</ul>
          </div>
        </>
      ) : (
        <legend>Create Playlist</legend>
      )}

      <form
        className="input-form flex-col-center"
        onSubmit={createPlaylistHandler}
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          value={playlistInput.title}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={playlistInput.description}
          onChange={inputChangeHandler}
        />
        <button className="btn btn-primary">Create New</button>
        {playlistInput.error && <p className="red">{playlistInput.error}</p>}
      </form>
    </Modal>
  );
};
