import "./Nav.css";
import { NavLink } from "react-router-dom";
import Header from "../Header/Header";

const Nav = (props) => {
  const location = props.location;
  return (
    <div className="container-component-nav">
      <nav className="container-nav">
        <NavLink to="/home" className="container-logo">
          <img src="/img/perro.png" alt="" />
        </NavLink>
        <ul className="container-list">
          <li>
            <NavLink
              className={location.pathname === "/home" ? "link-nav-active" : "link-nav"}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={location.pathname === "/createDog" ? "link-nav-active" : "link-nav"} to="/createDog">
              Create Dog
            </NavLink>
          </li>
          <li>
            <NavLink className={location.pathname === "/about" ? "link-nav-active" : "link-nav"} to="/about">
              About
            </NavLink>
          </li>
        </ul>
        <div className="container-contact">
          <a
            href="https://www.linkedin.com/in/rodrigo-roman-0a58811b0/"
            target="_blank"
            className="link-contact"
          >
            <img src="/img/icons8-linkedin.svg" alt="logo linkedin" />
          </a>

          <a
            href="https://github.com/Rodri7Roman"
            target="_blank"
            className="link-contact"
          >
            <img src="/img/icons8-github.svg" alt="logo github" />
          </a>

          <a
            href="mailto:romanrodri03@gmail.com"
            target="_blank"
            className="link-contact"
          >
            <img src="/img/icons8-gmail.svg" alt="logo gmail" />
          </a>
        </div>
      </nav>
      {location.pathname === "/home" && <Header />}
    </div>
  );
};

export default Nav;
