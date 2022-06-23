import React, { useContext, useState, useEffect } from "react";
import { NewsContext } from "../contexts/NewsContext";
import { AiFillEye } from "react-icons/ai";
import "../assets/scss/item.scss";

function Item({ item }) {
  const { tesla, handleClick, detail } = useContext(NewsContext);
  const [items, setItems] = useState(item);

  let splitUrl = item && item.title && item.title.toLowerCase();
  splitUrl = splitUrl && splitUrl.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  let newUrl = splitUrl && splitUrl.replace(/\s/g, "-");

  const getCategory = (imageUrl, title, desc) => {
    return (
      <div className="card">
        <div>
          <div className="card-header">
            <img src={imageUrl} alt={title} className="card-header-image" />
          </div>
          <div className="card-body">
            <h4 className="card-body-title">{title}</h4>
            <p className="card-body-text">{desc}</p>
          </div>
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
    );
  };

  return (
    <div className="col-md-3 card-wrapper">
      {getCategory(items.urlToImage, items.title, items.description)}
      {/* <div className="card">
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
      </div> */}
    </div>
  );
}

export default Item;
