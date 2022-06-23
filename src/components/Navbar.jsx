import React, { useContext, useEffect } from "react";
import { NewsContext } from "../contexts/NewsContext";
import SearchBar from "../components/SearchBar";
import Logo from "../assets/images/icecat_logo.webp";
import "../assets/scss/navbar.scss";

const Navbar = () => {
  const { detail } = useContext(NewsContext);

  useEffect(() => {
    searchBar();
  }, [detail.idTitle]);

  const searchBar = () => {
    if (window.location.pathname.split("/")[1] === detail.idTitle) {
      return null;
    } else {
      return <SearchBar />;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container ">
          <div className="row">
            <div className="col-3 navbar-logo">
              <a className="navbar-logo-link" href="/">
                <img src={Logo} alt="Icecat" />
              </a>
            </div>
            <div className="col-2 navbar-brand-wrapper">
              <a className="navbar-brand-wrapper-home" href="/">
                Home
              </a>
            </div>
            <div className="col-7 navbar-brand-search">{searchBar()}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
