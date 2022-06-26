import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/scss/index.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter } from "react-router-dom";
import NewsContextProvider from "./contexts/NewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NewsContextProvider>
  </React.StrictMode>
);

reportWebVitals();
