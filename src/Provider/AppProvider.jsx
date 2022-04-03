import { AuthProvider } from "../Context/authContext";
import { ModalProvider } from "../Context/modalContext";
import { FilterProvider } from "../Context/filterContext";
import { AlertProvider } from "../Context/alertContext";
import { HistoryProvider } from "../Context/historyContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvider>
        <ModalProvider>
          <HistoryProvider>
            <FilterProvider>{children}</FilterProvider>
          </HistoryProvider>
        </ModalProvider>
      </AlertProvider>
    </AuthProvider>
  );
};
