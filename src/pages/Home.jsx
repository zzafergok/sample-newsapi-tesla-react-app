import React, { useEffect, useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "../components/Category";

const Home = () => {
  const { error } = useContext(NewsContext);
  useEffect(() => {
    localStorage.removeItem("detail");
    localStorage.removeItem("searchDetail");
    localStorage.removeItem("category");
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Category />
      <ListItem />
      <Footer />
    </div>
  );
};

export default Home;
