import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../assets/scss/category.scss";

const Category = () => {
  const { capitalizeFirstLetter, allCategory } = useContext(NewsContext);

  let tesla = "tesla";
  return (
    <div className="container">
      <div className="row all-categories">
        <div className="col-12 all-categories-button">
          <button
            onClick={() => {
              window.location.href = `/`;
            }}
          >
            {capitalizeFirstLetter(tesla)}
          </button>
        </div>
        {allCategory.map((item, index) => {
          return (
            <div key={index} className="all-categories-button">
              <button
                onClick={() => {
                  localStorage.setItem("category", JSON.stringify(item));
                  window.location.href = `/${item}`;
                }}
              >
                {capitalizeFirstLetter(item)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
