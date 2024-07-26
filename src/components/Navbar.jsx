import React from "react";
import { Link } from "react-router-dom";
import profileImg from './profile.png'
import { FaSortDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="dashboard-nav sticky-top">
      <div className="left">
        <ul>
          <li>
           <Link className="link">Home</Link>
          </li>
          <li>
           <Link className="link">Organization</Link>
          </li>
          <li>
            <Link className="link">Staff</Link>
          </li>
          <li>
            <Link className="link">Patients</Link>
          </li>
          <li>
            <Link className="link">Appointments</Link>
          </li>
          <li>    
            <Link className="link">Account</Link>
          </li>
          <li>
           <Link className="link">Reports</Link>
          </li>
          <li>
            <Link className="link">Settings</Link>
          </li>
          <li>
            <Link className="link">Help</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        <img src={profileImg} alt="profileImage" />
        <FaSortDown className="dashboard-icon"/>
      </div>
    </nav>
  )
      ;
};

export default Navbar;
