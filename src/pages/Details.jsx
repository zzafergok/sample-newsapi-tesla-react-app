import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/scss/details.scss";

const Details = () => {
  const { detail } = useContext(NewsContext);

  return (
    <div>
      <Navbar />
      <div className="container container-item-list">
        <div className="row">
          <div className="col-9">
            <div className="detail-header">
              <div className="detail-header-title">
                <h1>{detail.title}</h1>
              </div>
              <div className="detail-header-date">
                <p className="detail-header-date-label">Date: </p>
                <p className="detail-header-date-value">{detail.date}</p>
              </div>
              <div className="detail-header-image">
                <img src={detail.image} alt={detail.title} />
              </div>
            </div>
            <div className="detail-body">
              <div className="detail-body-content">
                <p>{detail.content}</p>
              </div>
            </div>
            {detail.author && (
              <div className="detail-footer">
                <div className="detail-footer-label">
                  <p>Author:</p>
                </div>
                <div className="detail-footer-author">
                  <p>{detail.author}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
