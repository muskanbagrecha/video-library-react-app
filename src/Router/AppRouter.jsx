import { Routes, Route } from "react-router-dom";
import { Homepage } from "../Pages/Homepage/Homepage";
import { ExplorePage } from "../Pages/ExplorePage/ExplorePage";
import { VideoPage } from "../Pages/VideoPage/VideoPage";
import { NotFound } from "../Pages/NotFound/NotFound";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/videos/:id" element={<VideoPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
