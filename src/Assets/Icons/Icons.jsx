function Search(props) {
  return (
    <svg width="1.25em" height="1.25em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
      ></path>
    </svg>
  );
}

function User(props) {
  return (
    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      ></path>
    </svg>
  );
}

function AddToPlaylist(props) {
  return (
    <svg width="1.25em" height="1.25em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"
      ></path>
    </svg>
  );
}

function WatchLater(props) {
  return (
    <svg width="1.25em" height="1.25em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8s-8 3.6-8 8s3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m3.3 14.2L14 17l-3-5.2V7h1.5v4.4l2.8 4.8Z"
      ></path>
    </svg>
  );
}

export { Search, User, AddToPlaylist, WatchLater };
