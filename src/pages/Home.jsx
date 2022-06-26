import React, { useEffect } from "react";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "../components/Category";
import Error from "../components/Error";

const Home = () => {
  useEffect(() => {
    localStorage.removeItem("detail");
    localStorage.removeItem("searchDetail");
    localStorage.removeItem("category");
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Error />
      <Category />
      <ListItem />
      <Footer />
    </div>
  );
};

export default Home;
