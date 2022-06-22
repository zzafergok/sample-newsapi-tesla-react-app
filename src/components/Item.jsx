import React, { useContext, useState, useEffect } from "react";
import { NewsContext } from "../contexts/NewsContext";
import { AiFillEye } from "react-icons/ai";
import "../assets/scss/item.scss";

function Item({ item }) {
  const { tesla, handleClick, detail } = useContext(NewsContext);
  const [items, setItems] = useState(item);

  let splitUrl = item.title.toLowerCase();
  splitUrl = splitUrl.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  let newUrl = splitUrl.replace(/\s/g, "-");

  return (
    <div className="col-md-3 card-wrapper">
      <div className="card">
        <div className="card-header">
          <img
            src={items.urlToImage}
            alt={items.title}
            className="card-header-image"
          />
        </div>
        <div className="card-body">
          <h5 className="card-body-title">{items.title}</h5>
          <p className="card-body-text">{items.description}</p>
        </div>
        <div className={`card-footer end`}>
          <a
            onClick={() => {
              handleClick(item, newUrl);
            }}
            className="card-footer-readMore"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Item;
