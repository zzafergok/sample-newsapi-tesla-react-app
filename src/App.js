import React, { useContext } from "react";
import { NewsContext } from "./contexts/NewsContext";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Categories from "./pages/Categories";

const App = () => {
  const { allSort, allCategory } = useContext(NewsContext);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
        {allCategory.map((category) => {
          return (
            <Route
              key={category}
              path={`/${category}`}
              element={<Categories />}
            />
          );
        })}

        {allCategory.map((category) => {
          return allSort.map((sort) => {
            return (
              <Route
                key={sort}
                path={`/${category}?sortBy=${sort}`}
                element={<Categories />}
              />
            );
          });
        })}
      </Routes>
    </>
  );
};

export default App;
