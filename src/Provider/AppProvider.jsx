import { AuthProvider } from "../Context/authContext";
import { PlaylistModalProvider } from "../Context/playlistModalContext";
import { FilterProvider } from "../Context/filterContext";
import { AlertProvider } from "../Context/alertContext";
import { HistoryProvider } from "../Context/historyContext";
import { PlaylistProvider } from "../Context/playlistContext";
import { LikesProvider } from "../Context/likesContext";
import { WatchLaterProvider } from "../Context/watchLaterContext";

export const AppProvider = ({ children }) => {
  return (
    <AlertProvider>
      <AuthProvider>
        <PlaylistModalProvider>
          <HistoryProvider>
            <PlaylistProvider>
              <WatchLaterProvider>
                <LikesProvider>
                  <FilterProvider>{children}</FilterProvider>
                </LikesProvider>
              </WatchLaterProvider>
            </PlaylistProvider>
          </HistoryProvider>
        </PlaylistModalProvider>
      </AuthProvider>
    </AlertProvider>
  );
};
