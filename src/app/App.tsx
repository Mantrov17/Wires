import React from "react";
import { AppProvider } from "./providers/AppProvider";
import { MainPage } from "../pages/MainPage/MainPage";

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainPage />
    </AppProvider>
  );
};

export default App;
