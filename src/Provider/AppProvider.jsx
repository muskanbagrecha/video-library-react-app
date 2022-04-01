import { AuthProvider } from "../Context/authContext";
import { ModalProvider } from "../Context/modalContext";
import { FilterProvider } from "../Context/filterContext";
import { AlertProvider } from "../Context/alertContext";

export const AppProvider = ({children}) => {
    return(
        <AuthProvider>
            <AlertProvider>
                <ModalProvider>
                    <FilterProvider>
                        {children}
                    </FilterProvider>
                </ModalProvider>
            </AlertProvider>
        </AuthProvider>
    )
}