import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./LandingPageNavBar.module.css";
import WatchDemo from "./WatchDemo";
import { Menu } from "lucide-react";

function LandingPageNavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleDemoClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <>
      <nav className={style.navContainer}>
        <Link
          className={`${style.nav} ${isShowMenu ? style.show : ""}`}
          to="/"
          aria-label="Home"
        >
          <img src="/ehs.svg" alt="EHS Logo" />
        </Link>

        <ul className={`${style.nav} ${isShowMenu ? style.show : ""}`}>
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
          className={`${style.loginButton} ${style.nav} ${isShowMenu ? style.show : ""}`}
        >
          Login
        </button>

        <WatchDemo isOpen={isModalOpen} onRequestClose={handleModalClose} />

        {/* Hamburger Menu Icon */}
        <button
          className={style.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={32} />
        </button>
      </nav>
    </>
  );
}

export default LandingPageNavBar;
