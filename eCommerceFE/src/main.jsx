//! Imported Libraries --------------------------
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import App from "./App.jsx";
//! ---------------------------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
