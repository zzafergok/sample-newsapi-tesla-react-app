import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/scss/details.scss";

const Details = () => {
  const { detail, searchDetail } = useContext(NewsContext);

  const getDetail = (title, date, time, image, content, author) => {
    return (
      <div className="container container-item-list">
        <div className="row">
          <div className="col-9">
            <div className="detail-header">
              <div className="detail-header-title">
                <h1>{title}</h1>
              </div>
              <div className="detail-header-date">
                <div>
                  <p className="detail-header-date-label">Date: </p>
                  <p className="detail-header-date-value">{date}</p>
                </div>
                <div>
                  <p className="detail-header-date-label">Time: </p>
                  <p className="detail-header-date-value">{time}</p>
                </div>
              </div>
              <div className="detail-header-image">
                <img src={image} alt={title} />
              </div>
            </div>
            <div className="detail-body">
              <div className="detail-body-content">
                <p>{content}</p>
              </div>
            </div>
            {author && (
              <div className="detail-footer">
                <div className="detail-footer-label">
                  <p>Author:</p>
                </div>
                <div className="detail-footer-author">
                  <p>{author}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {detail.title !== undefined
        ? getDetail(
            detail.title,
            detail.date,
            detail.time,
            detail.image,
            detail.content,
            detail.author
          )
        : searchDetail.title !== undefined
        ? getDetail(
            searchDetail.title,
            searchDetail.date,
            searchDetail.time,
            searchDetail.image,
            searchDetail.content,
            searchDetail.author
          )
        : null}
      <Footer />
    </div>
  );
};

export default Details;
