import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import profileImg from "./profile.png";
import Logo from "./EMS logo-Transparent.png";
import { FaSortDown } from "react-icons/fa";
import DropDown from "./DropDown";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  return (
    <>
      <nav className="dashboard-nav sticky-top">
        <div className="left">
          <img src={Logo} alt="" />
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "link")}
                to="home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organization"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Organization
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/patients"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? "active" : "link")}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" className="link">
                Help
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="right">
          <img src={profileImg} alt="" />
          <FaSortDown
            onClick={() => setIsDropdown((prevValue) => !prevValue)}
            className="dashboard-icon"
          />
        </div>
      </nav>
      {isDropdown && <DropDown />}
    </>
  );
};

export default Navbar;
