import { AppRouter } from "./Router/AppRouter";
import { Navigation, VerticalNavigation, Footer } from "./Components/UI/";
import { useState } from "react";

export const App = () => {
  const [verticalNavOpen, setVerticalNavOpen] = useState(false);

  return (
    <div className="main-container">
      <Navigation
        setVerticalNavOpen={setVerticalNavOpen}
        verticalNavOpen={verticalNavOpen}
      />
      <VerticalNavigation verticalNavOpen={verticalNavOpen} />
      <Footer />
      <AppRouter />
    </div>
  );
};
