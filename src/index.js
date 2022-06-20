import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NewsContextProvider from "./contexts/NewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewsContextProvider>
      <App />
    </NewsContextProvider>
  </React.StrictMode>
);

reportWebVitals();
