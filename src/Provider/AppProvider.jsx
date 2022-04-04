import { AuthProvider } from "../Context/authContext";
import { PlaylistModalProvider } from "../Context/playlistModalContext";
import { FilterProvider } from "../Context/filterContext";
import { AlertProvider } from "../Context/alertContext";
import { HistoryProvider } from "../Context/historyContext";
import { PlaylistProvider } from "../Context/playlistContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvider>
        <PlaylistModalProvider>
          <HistoryProvider>
            <PlaylistProvider>
              <FilterProvider>{children}</FilterProvider>
            </PlaylistProvider>
          </HistoryProvider>
        </PlaylistModalProvider>
      </AlertProvider>
    </AuthProvider>
  );
};
