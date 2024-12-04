import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./LandingPageNavBar.module.css";
import WatchDemo from "./WatchDemo";
import { ChevronDown, Menu } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LandingPageNavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMailtoClicked, setIsMailtoClicked] = useState(false);

  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const emailLink = "mailto:info@skilltopempire.com";

    const isMailtoSupported = window.location.protocol === "mailto:";

    if (isMailtoSupported) {
      setIsMailtoClicked(false);
      window.location.href = emailLink;
    } else {
      setIsMailtoClicked(true);

      toast.error(
        "It seems like you don’t have an email client set up. You can contact us via WhatsApp or use the contact form on our website.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setTimeout(() => {
        setIsMailtoClicked(false);
      }, 3000);
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+2348062675088", "_blank");
  };

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
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              Demo
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              Video
            </NavLink>
          </li>
          <li ref={dropdownRef}>
            <NavLink
              to="#"
              className={`${style.dropdown}`}
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen ? "true" : "false"}
              aria-haspopup="true"
            >
              <span>Support</span>
              <ChevronDown
                className={`${style.dropdownIcon} ${isDropdownOpen ? style.rotated : ""}`}
                size={16}
              />
            </NavLink>

            {isDropdownOpen && (
              <ul className={style.dropdownMenu}>
                <li>
                  <a
                    onClick={handleEmailClick}
                    href="mailto:info@skilltopempire.com"
                    className={style.dropdownItem}
                  >
                    Email
                  </a>
                </li>
                <li onClick={handleWhatsAppClick}>
                  <a href="#" className={style.dropdownItem}>
                    WhatsApp
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="https://skilltopempire.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className={style.externalLink}
            >
              Contact Us
            </a>
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

      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
}

export default LandingPageNavBar;
