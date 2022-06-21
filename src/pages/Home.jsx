import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";

const Home = () => {
  const { tesla } = useContext(NewsContext);

  return <div>Home</div>;
};

export default Home;
