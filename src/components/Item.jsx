import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../assets/scss/item.scss";

function Item({ item }) {
  const { setDetail, tesla, handleClick, detail } = useContext(NewsContext);
  let splitUrl = item.title.toLowerCase();
  splitUrl = splitUrl.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  let newUrl = splitUrl.replace(/\s/g, "-");

  console.log("detail", detail);

  return (
    <div className="col-md-3 card-wrapper">
      <div className="card">
        <div className="card-header">
          <img
            src={item.urlToImage}
            alt={item.title}
            className="card-header-image"
          />
        </div>
        <div className="card-body">
          <h5 className="card-body-title">{item.title}</h5>
          <p className="card-body-text">{item.description}</p>
        </div>
        <div className="card-footer">
          <a
            onClick={() => {
              handleClick(item, newUrl);
            }}
            className="btn btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Item;
