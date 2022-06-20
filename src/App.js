import React, { useContext } from "react";
import { NewsContext } from "./contexts/NewsContext";
import axios from "axios";
import "./assets/scss/app.scss";

function App() {
  const { tesla } = useContext(NewsContext);
  return (
    <div className="app">
      <header className="">{JSON.stringify(tesla)}</header>
    </div>
  );
}

export default App;
