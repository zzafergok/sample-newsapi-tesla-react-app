import React from "react";
import Logo from "../assets/images/icecat_logo.webp";
import "../assets/scss/navbar.scss";

const Navbar = () => {
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
            <div className="col-9 navbar-brand-wrapper">
              <a className="navbar-brand-wrapper-home" href="/">
                Home
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
