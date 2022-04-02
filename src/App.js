import { AppRouter } from "./Router/AppRouter";
import {
  Navigation,
  VerticalNavigation,
  Footer,
  Alert,
} from "./Components/UI/";
import { useState, useEffect } from "react";
import { useAlert } from "./CustomHooks";
export const App = () => {
  const [verticalNavOpen, setVerticalNavOpen] = useState(false);
  const { showAlert, setShowAlert } = useAlert();

  useEffect(() => {
    setTimeout(() => {
      setShowAlert({
        setShowAlert: false,
        alertMessage: null,
        type: null,
      });
    }, 2000);
  }, [showAlert.showAlert]);

  return (
    <div className="main-container">
      <Navigation
        setVerticalNavOpen={setVerticalNavOpen}
        verticalNavOpen={verticalNavOpen}
      />
      {showAlert.showAlert && <Alert />}
      <VerticalNavigation verticalNavOpen={verticalNavOpen} />
      <AppRouter />
      <Footer />
    </div>
  );
};
