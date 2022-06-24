import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../contexts/NewsContext";
import SearchBar from "../components/SearchBar";
import Logo from "../assets/images/icecat_logo.webp";
import "../assets/scss/navbar.scss";

const Navbar = () => {
  const { detail, error } = useContext(NewsContext);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    searchBar();
    if (window.location.pathname.split("/")[1] === detail.idTitle) {
      setFlag(true);
    }
  }, [detail.idTitle, flag]);

  const searchBar = () => {
    if (window.location.pathname.split("/")[1] === detail.idTitle) {
      return null;
    } else {
      return <SearchBar />;
    }
  };

  return (
    <nav className={`navbar ${flag === true ? "navbar-flag" : ""}`}>
      <div className="container">
        <div className="row">
          <div
            className={`col-5 navbar-logo-link-group ${
              flag === true ? "navbar-logo-link-group-flag" : ""
            }`}
          >
            <div className="navbar-logo">
              <a className="navbar-logo-link" href="/">
                <img src={Logo} alt="Icecat" />
              </a>
            </div>
            <div className="navbar-brand-wrapper">
              <a className="navbar-brand-wrapper-home" href="/">
                Home
              </a>
            </div>
          </div>
          <div className="col-7 navbar-brand-search">{searchBar()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
