import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  ExplorePage,
  LoginPage,
  VideoPage,
  SignupPage,
  HistoryPage,
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
