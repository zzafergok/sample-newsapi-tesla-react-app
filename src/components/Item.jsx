import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import { AiFillEye } from "react-icons/ai";
import { Triangle } from "react-loader-spinner";
import "../assets/scss/item.scss";

function Item({ item }) {
  const { teslaLoading, teslaItem, tesla } = useContext(NewsContext);

  let splitUrl = item && item.title && item.title.toLowerCase();
  splitUrl = splitUrl && splitUrl.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  let newUrl = splitUrl && splitUrl.replace(/\s/g, "-");

  //go to detail page
  const handleClick = (item, url) => {
    tesla.length > 0 &&
      tesla.filter((element) => {
        let elementSplitUrl = element.title.toLowerCase();
        elementSplitUrl = elementSplitUrl.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ""
        );
        let elementNewUrl = elementSplitUrl.replace(/\s/g, "-");

        if (elementNewUrl === url) {
          let newDetail = {
            idTitle: elementNewUrl,
            title: element.title,
            content: element.content,
            image: element.urlToImage,
            author: element.author,
            date: element.publishedAt.slice(0, -10),
            time: element.publishedAt.slice(11, -1),
            isRead: true,
          };

          localStorage.setItem("detail", JSON.stringify(newDetail));
        }

        //seen
        if (element.description === item.description) {
          let newDetail = {
            author: item.author,
            content: item.content,
            description: item.description,
            publishedAt: item.publishedAt,
            title: item.title,
            url: item.url,
            urlToImage: item.urlToImage,
            isSeen: true,
          };

          const newArr = [...teslaItem, newDetail];

          const uniqueIds = [];

          const uniqueTeslaItem = newArr.filter((element) => {
            const isDuplicate = uniqueIds.includes(element.title);

            if (!isDuplicate) {
              uniqueIds.push(element.title);
              return true;
            }
            return false;
          });

          localStorage.setItem("teslaItem", JSON.stringify(uniqueTeslaItem));
        }

        window.location.href = `/${url}`;
      });

    searchArray.length > 0 &&
      searchArray?.filter((element) => {
        let elementSplitUrl = element.title.toLowerCase();
        elementSplitUrl = elementSplitUrl.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ""
        );
        let elementNewUrl = elementSplitUrl.replace(/\s/g, "-");

        if (elementNewUrl === url) {
          let newDetail = {
            idTitle: elementNewUrl,
            title: element.title,
            content: element.content,
            image: element.urlToImage,
            author: element.author,
            date: element.publishedAt.slice(0, -10),
            time: element.publishedAt.slice(11, -1),
            isRead: true,
          };
          localStorage.setItem("searchDetail", JSON.stringify(newDetail));
        }
        window.location.href = `/${url}`;
      });
  };

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
