import React, { useEffect, useRef, useState } from "react";
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
import DropDown from "./profileDropdown/DropDown";
import ModalContainer from "../modals/ModalContainer";
import { MODAL_TYPES, useModal } from "../context/ModalContext";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isAppointmentDropdown, setIsAppointmentDropdown] = useState(false);
  const { openModal, isShowModal, image } = useModal();

  const appointmentDropdownRef = useRef(null);

  const handleClickOutsideDropdown = () => {
    if (
      appointmentDropdownRef.current &&
      !appointmentDropdownRef.current.contains(event.target)
    ) {
      setIsAppointmentDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);
    return () =>
      document.removeEventListener("click", handleClickOutsideDropdown);
  }, []);

  const handleShowModal = (type) => {
    openModal(type);
  };

  const toggleAppointmentDropdown = () => {
    setIsAppointmentDropdown((prev) => !prev);
  };

  return (
    <>
      <nav className={style.dashboardNav}>
        <div className={style.left}>
          <NavLink to="/app">
            <img src={Logo} alt="" className={style.img} />
          </NavLink>
          <ul className={style.ull}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
                to="/app"
              >
                <MdHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/organization"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <GoOrganization /> Department
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/staff"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <IoMdPerson /> Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/patients"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <MdOutlineSick /> Patients
              </NavLink>
            </li>
            <li ref={appointmentDropdownRef}>
              <div>
                <span
                  onClick={toggleAppointmentDropdown}
                  className={style.link}
                  style={{ cursor: "pointer" }}
                >
                  <SiGoogleclassroom /> Appointments <FaSortDown />
                </span>
                {isAppointmentDropdown && (
                  <div className={style.dropdownMenu}>
                    <Link to="/app/appointments" className={style.dropdownItem}>
                      Appointment
                    </Link>
                    <Link to="/app/admission" className={style.dropdownItem}>
                      Admission
                    </Link>
                    <Link to="/app/consultation" className={style.dropdownItem}>
                      Consultation
                    </Link>
                    <Link to="/app/discharge" className={style.dropdownItem}>
                      Discharge
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <NavLink
                to="/app/account"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <MdAccountCircle /> Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/reports"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <TbReportMedical /> Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
                to="/app/settings"
              >
                <IoMdSettings /> Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/help"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <IoMdHelpCircle /> Help
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
          setIsDropdown={setIsDropdown}
        />
      )}
      {isShowModal && <ModalContainer />}
    </>
  );
};

export default Navbar;
