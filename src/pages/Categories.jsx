import React, { useEffect } from "react";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "../components/Category";
import Error from "../components/Error";

function Categories() {
  useEffect(() => {
    localStorage.removeItem("detail");
    localStorage.removeItem("searchDetail");
  }, []);
  return (
    <div>
      <Navbar />
      <Error />
      <Category />
      <ListItem />
      <Footer />
    </div>
  );
}

export default Categories;
