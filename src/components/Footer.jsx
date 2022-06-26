import React from "react";
import { BsGithub } from "react-icons/bs";
import "../assets/scss/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>
          You can access the source codes of this website on
          <BsGithub
            className="github-icon"
            onClick={() => {
              window.open(
                "https://github.com/zzafergok/sample-newsapi-tesla-react-app"
              );
            }}
          />
          .
        </p>
      </div>
    </div>
  );
};

export default Footer;
