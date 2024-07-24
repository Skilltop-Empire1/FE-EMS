import React from "react";
import { Link } from "react-router-dom";
import profileImg from './profile.png'
import { FaSortDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="dashboard-nav">
      <div className="left">
        <Link className="link">Home</Link>
        <Link className="link">Organization</Link>
        <Link className="link">Staff</Link>
        <Link className="link">Patients</Link>
        <Link className="link">Appointments</Link>
        <Link className="link">Account</Link>
        <Link className="link">Reports</Link>
        <Link className="link">Settings</Link>
        <Link className="link">Help</Link>
      </div>
      <div className="right">
        <img src={profileImg} alt="" />
        <FaSortDown className="dashboard-icon"/>
      </div>
    </nav>
  )
      ;
};

export default Navbar;
