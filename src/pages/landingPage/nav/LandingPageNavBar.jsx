import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./LandingPageNavBar.module.css";

function LandingPageNavBar() {
  const navigate = useNavigate();

  return (
    <nav className={style.navContainer}>
      <Link to="/" aria-label="Home">
        <img src="/ehs.svg" alt="EHS Logo" />
      </Link>

      <ul className={style.nav}>
        <li>
          <NavLink to="#demo" activeClassName={style.activeLink}>
            Demo
          </NavLink>
        </li>
        <li>
          <NavLink to="#video" activeClassName={style.activeLink}>
            Video
          </NavLink>
        </li>
        <li>
          <NavLink to="#support" activeClassName={style.activeLink}>
            Support
          </NavLink>
        </li>
        <li>
          <NavLink to="#contact" activeClassName={style.activeLink}>
            Contact Us
          </NavLink>
        </li>
      </ul>

      <button onClick={() => navigate("/login")} className={style.loginButton}>
        Login
      </button>
    </nav>
  );
}

export default LandingPageNavBar;
