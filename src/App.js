import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";

const App = () => {

  const appStyles = {
    backgroundColor: "rgba(175, 175, 175, 0.12)",
    minHeight: "100vh", // Ensure the app takes the full viewport height
  };

  return (
    <div style={appStyles}>
      <Router>
        <Navigation />
      </Router>
    </div>
  )
};

export default App;
