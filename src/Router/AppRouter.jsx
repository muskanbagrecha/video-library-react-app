import MockmanEs from "mockman-js";
import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  ExplorePage,
  LoginPage,
  VideoPage,
  SignupPage,
  HistoryPage,
  PlaylistPage,
  SinglePlaylistPage,
  LikesPage,
  WatchLaterPage,
  NotFound,
} from "./../Pages/";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/videos" element={<ExplorePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/videos/:id" element={<VideoPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/playlist" element={<PlaylistPage />} />
      <Route path="/playlist/:id" element={<SinglePlaylistPage />} />
      <Route path="/likes" element={<LikesPage />} />
      <Route path="/watchlater" element={<WatchLaterPage />} />
      <Route path="/mockapi" element={<MockmanEs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
