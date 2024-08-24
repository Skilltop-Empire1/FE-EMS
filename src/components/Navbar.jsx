import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImg from "./profile.png";
import Logo from "./EMS logo-Transparent.png";
import style from "./navBarStyle.module.css";

import { FaSortDown } from "react-icons/fa";
import DropDown from "./DropDown";
import ModalContainer from "../modals/ModalContainer";
import { MODAL_TYPES, useModal } from "../context/ModalContext";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const { openModal, isShowModal, image } = useModal();

  const handleShowModal = (type) => {
    openModal(type);
  };
  const handlePasswordChange = () => {};
  return (
    <>
      <nav className={style.dashboardNav}>
        <div className={style.left}>
          <NavLink to="/">
            <img src={Logo} alt="" className={style.img} />
          </NavLink>
          <ul className={style.ull}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organization"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Organization
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/patients"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
                to="/settings"
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                Help
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={style.profileImgContainer}>
          <div className={style.right}>
            <img
              src={image || profileImg}
              alt="Profile"
              className={style.profileImg}
            />
          </div>
          <FaSortDown
            onClick={() => setIsDropdown((prev) => !prev)}
            className={style[`dashboard-icon`]}
          />
        </div>
      </nav>
      {isDropdown && (
        <DropDown
          handlePasswordChange={() => handleShowModal(MODAL_TYPES.TYPE2)}
          handleProfileImageChange={() => handleShowModal(MODAL_TYPES.TYPE1)}
        />
      )}
      {isShowModal && <ModalContainer />}
    </>
  );
};

export default Navbar;
