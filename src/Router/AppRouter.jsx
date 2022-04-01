import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  ExplorePage,
  LoginPage,
  VideoPage,
  SignupPage,
  NotFound,
} from "./../Pages/";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/videos/:id" element={<VideoPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
