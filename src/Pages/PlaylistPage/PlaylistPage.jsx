import { useState } from "react";
import { usePlaylist, useAuth, useAlert } from "../../CustomHooks";
import { PlaylistCard } from "./Components/PlaylistCard/PlaylistCard";
import "./PlaylistPage.css";
export const PlaylistPage = () => {
  const initialInput = {
    title: "",
    description: "",
    error: null,
  };

  const { playlists, createPlaylist } = usePlaylist();
  const [showInputField, setShowInputField] = useState(false);
  const [playlistInput, setPlaylistInput] = useState(initialInput);
  const {
    authState: { token, isAuthenticated },
  } = useAuth();
  const { setShowAlert } = useAlert();

  const inputChangeHandler = (event) => {
    setPlaylistInput({
      ...playlistInput,
      [event.target.name]: event.target.value,
    });
  };

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAlert({
        showAlert: true,
        alertMessage: "You must be logged in to create a playlist",
        type: "danger",
      });
      return;
    }
    if (!showInputField) {
      setShowInputField(true);
      return;
    }
    if (playlistInput.title.trim() === "") {
      setPlaylistInput({ ...playlistInput, error: "Title is required" });
      return;
    }
    setPlaylistInput({ ...playlistInput, error: null });
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
    setPlaylistInput({ title: "", description: "", error: null });
    setShowInputField(false);
  };

  return (
    <div className="sub-container">
      <h1 className="styled-title">My Playlists</h1>
      <div className="col-container">
        {playlists === null || playlists?.length === 0 ? (
          <div className="card-container">
            <p>You have no playlists</p>
          </div>
        ) : (
          <div className="playlist-container">
            {playlists?.map(({ _id, title, description, videos }) => (
              <PlaylistCard
                key={_id}
                {...{ _id, title, description, videos }}
              />
            ))}
          </div>
        )}
        {showInputField && (
          <form className="input-form playlist-form">
            <input
              type="text"
              placeholder="title"
              onChange={inputChangeHandler}
              name="title"
              value={playlistInput.title}
            />
            <input
              type="text"
              placeholder="description"
              onChange={inputChangeHandler}
              name="description"
              value={playlistInput.description}
            />
            {playlistInput.error && (
              <p className="red">{playlistInput.error}</p>
            )}
          </form>
        )}
        <button className="btn btn-primary" onClick={createPlaylistHandler}>
          Create New
        </button>
      </div>
    </div>
  );
};
