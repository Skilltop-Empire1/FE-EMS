import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./LandingPageNavBar.module.css";
import WatchDemo from "./WatchDemo";

function LandingPageNavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDemoClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className={style.navContainer}>
        <Link to="/" aria-label="Home">
          <img src="/ehs.svg" alt="EHS Logo" />
        </Link>

        <ul className={style.nav}>
          <li onClick={handleDemoClick}>
            <NavLink
              to="#demo"
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              Demo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#video"
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              Video
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#support"
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              Support
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#contact"
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        <button
          onClick={() => navigate("/login")}
          className={style.loginButton}
        >
          Login
        </button>
      </nav>

      <WatchDemo isOpen={isModalOpen} onRequestClose={handleModalClose} />
    </>
  );
}

export default LandingPageNavBar;
