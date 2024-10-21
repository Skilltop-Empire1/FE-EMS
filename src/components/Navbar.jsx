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
import { ChevronDown, ChevronUp, House } from "lucide-react";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const { openModal, isShowModal, image } = useModal();

  const handleShowModal = (type) => {
    openModal(type);
  };
  const handlePasswordChange = () => {};
  return (
    <>
      <nav className={`${style.dashboardNav} border-b !bg-gray-200`}>
        <div className={style.left}>
          <NavLink to="/">
            <img src={Logo} alt="" className={style.img} />
          </NavLink>
          <ul className="flex gap-5 items-center flex-wrap">
            <li>
              <CustomLink label="Home" icon={<House size={14} />} path="/" />
            </li>
            <li>
              <CustomLink
                label="Organization"
                icon={<GoOrganization />}
                path="/organization"
              />
            </li>
            <li>
              <CustomLinkWithDropdown
                label="Staff"
                icon={<IoMdPerson />}
                path="/staff"
                dropdownItems={[
                  { path: "/staff/doctors", label: "Doctors" },
                  { path: "/staff/nurses", label: "Nurses" },
                  { path: "/staff/pharmacists", label: "Pharmacists" },
                  { path: "/staff/lab-scientist", label: "Lab. Scientist" },
                  { path: "/staff/radiographers", label: "Radiographers" },
                ]}
              />
            </li>
            <li>
              <CustomLink
                label="Patients"
                icon={<MdOutlineSick />}
                path="/patients"
              />
            </li>
            <li>
              <CustomLink
                label="Appointments"
                icon={<SiGoogleclassroom />}
                path="/appointments"
              />
            </li>
            <li>
              <CustomLink
                label="Account"
                icon={<MdAccountCircle />}
                path="/account"
              />
            </li>
            <li>
              <CustomLink
                label="Reports"
                icon={<TbReportMedical />}
                path="/reports"
              />
            </li>
            <li>
              <CustomLink
                label="Settings"
                icon={<IoMdSettings />}
                path="/settings"
              />
            </li>
            <li>
              <CustomLink label="Help" icon={<IoMdHelpCircle />} path="/help" />
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

const CustomLink = ({ path, icon, label }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${isActive && "text-purple-600"} flex gap-1 items-center text-sm`
      }
    >
      {icon} <span>{label}</span>
    </NavLink>
  );
};

const CustomLinkWithDropdown = ({ path, icon, label, dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${
            isActive ? "text-purple-600" : "text-gray-800"
          } flex gap-1 items-center text-sm`
        }
      >
        {icon}
        <span>{label}</span>
        {/* Conditionally render Chevron icons based on dropdown state */}
        {dropdownItems && dropdownItems.length > 0 && (
          <span className="ml-2">
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}
      </NavLink>

      {/* Dropdown */}
      {dropdownItems && dropdownItems.length > 0 && (
        <div
          className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 transition-all duration-300 ease-in-out origin-top transform ${
            isDropdownOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {dropdownItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm ${
                  isActive ? "bg-purple-600 text-white" : "text-gray-800"
                } hover:bg-gray-100`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
