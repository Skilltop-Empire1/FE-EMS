import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import profileImg from "./profile.png";
import Logo from "./EMS logo-Transparent.png";
import style from "./navBarStyle.module.css";
import { MdHome } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { MdOutlineSick } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaSortDown } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
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
               <MdHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organization"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <GoOrganization /> Organization
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
               <IoMdPerson /> Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/patients"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
               <MdOutlineSick /> Patients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
              <SiGoogleclassroom />  Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
              <MdAccountCircle />  Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
              <TbReportMedical />  Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
                to="/settings"
              >
              <IoMdSettings />  Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
              <IoMdHelpCircle />  Help
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
