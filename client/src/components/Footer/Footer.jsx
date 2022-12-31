import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="container-footer">
        <div className="flex-footer">
          <div>
            <NavLink to="/home" className="container-logo">
              <img src="/img/perro.png" alt="" />
            </NavLink>
            <ul className="container-list-footer">
              <li>
                <NavLink className={"link-nav"} to="/home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={"link-nav"} to="/createDog">
                  Create Dog
                </NavLink>
              </li>
              <li>
                <NavLink className={"link-nav"} to="/about">
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="container-redes">
            <h2 className="contact-text">Contact</h2>
            <div className="container-redes-footer">
              <div className="redes-footer">
                <img className="red" src="/img/icons8-github.svg" alt="logo" />
                <a target="_blank" href="https://www.github.com/Rodri7Roman">
                  Rodri7Roman
                </a>
              </div>

              <div className="redes-footer">
                <img
                  className="red"
                  src="/img/icons8-linkedin.svg"
                  alt="logo"
                />
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/rodrigo-roman-0a58811b0/"
                >
                  Rodrigo Roman
                </a>
              </div>

              <div className="redes-footer">
                <img className="red" src="/img/icons8-gmail.svg" alt="logo" />
                <a
                  href="mailto:romanrodri03@gmail.com"
                  target="_blank"
                  className="link-contact"
                >
                  romanrodri03@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copy">
        <p>© Copyright 2022 - Rodrigo Roman</p>
      </div>
    </>
  );
};

export default Footer;
