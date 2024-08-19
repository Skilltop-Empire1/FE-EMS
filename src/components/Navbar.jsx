import React from "react";
import { Link } from "react-router-dom";
import profileImg from './profile.png'
import Logo from './EMS logo-Transparent.png'
import style from './navBarStyle.module.css'

// import profileImg from './profile.png'

import { FaSortDown } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className={style.dashboardNav}>
      <div className={style.left}>
        <Link to='/'><img src={Logo}alt="" className={style.img}/></Link>
        <ul className={style.ull}>
          <li>
           <Link className={style.link} to='/'>Home</Link>
          </li>
          <li>
           <Link className={style.link}>Organization</Link>
          </li>
          <li>
            <Link className={style.link}>Staff</Link>
          </li>
          <li>
            <Link className={style.link}>Patients</Link>
          </li>
          <li>
            <Link className={style.link}>Appointments</Link>
          </li>
          <li>    
            <Link className={style.link}>Account</Link>
          </li>
          <li>
           <Link className={style.link}>Reports</Link>
          </li>
          <li>
            <Link className={style.link} to='/settings'>Settings</Link>
          </li>
          <li>
            <Link className={style.link}>Help</Link>
          </li>
        </ul>
      </div>
      <div className={style.right}>

        <img src={profileImg} alt="profileImage" className={style.img2} />
        <FaSortDown className={style.icon}/>
  {/* <img src={profileImg} alt="" /> */}

      </div>
    </nav>
  );
};

export default Navbar;
