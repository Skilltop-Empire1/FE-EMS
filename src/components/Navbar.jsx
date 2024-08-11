import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <img src={Logo} alt="" className={style.img} />
          </Link>
          <ul className={style.ull}>
            <li>
              <Link className={style.link} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/organization" className={style.link}>
                Organization
              </Link>
            </li>
            <li>
              <Link to="/staff" className={style.link}>
                Staff
              </Link>
            </li>
            <li>
              <Link to="/patients" className={style.link}>
                Patients
              </Link>
            </li>
            <li>
              <Link to="/appointments" className={style.link}>
                Appointments
              </Link>
            </li>
            <li>
              <Link to="/account" className={style.link}>
                Account
              </Link>
            </li>
            <li>
              <Link to="/reports" className={style.link}>
                Reports
              </Link>
            </li>
            <li>
              <Link className={style.link} to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/help" className={style.link}>
                Help
              </Link>
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
