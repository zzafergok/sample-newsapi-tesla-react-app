import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import { AiFillEye } from "react-icons/ai";
import { Triangle } from "react-loader-spinner";
import "../assets/scss/item.scss";

function Item({ item }) {
  const { handleClick, teslaLoading, teslaItem } = useContext(NewsContext);

  let splitUrl = item && item.title && item.title.toLowerCase();
  splitUrl = splitUrl && splitUrl.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  let newUrl = splitUrl && splitUrl.replace(/\s/g, "-");

  const getCategory = (imageUrl, title, desc) => {
    return (
      <div className="card">
        <div>
          <div
            className={`card-header ${
              teslaLoading === true ? "card-loading" : ""
            }`}
          >
            {teslaLoading === true ? (
              <Triangle ariaLabel="loading-indicator" color="grey" />
            ) : (
              <img src={imageUrl} alt={title} className="card-header-image" />
            )}
          </div>
          <div className="card-body">
            <h4 className="card-body-title">{title}</h4>
            <p className="card-body-text">{desc}</p>
          </div>
        </div>
        <div className="card-footer between">
          <a
            onClick={() => {
              handleClick(item, newUrl);
            }}
            className="card-footer-readMore"
          >
            Read More
          </a>

          {teslaItem.map((tItem, index) => {
            if (tItem.title === item.title) {
              return (
                <div className="card-footer-left" key={index}>
                  <span>Seen</span>
                  <AiFillEye />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="col-md-3 col-sm-4 col-8 card-wrapper">
      {getCategory(item.urlToImage, item.title, item.description)}
    </div>
  );
}

export default Item;
