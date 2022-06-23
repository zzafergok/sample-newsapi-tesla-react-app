import React from "react";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "../components/Category";

function Categories() {
  return (
    <div>
      <Navbar />
      <Category />
      <ListItem />
      <Footer />
    </div>
  );
}

export default Categories;
