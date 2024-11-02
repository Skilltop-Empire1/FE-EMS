import React, { useEffect, useRef } from "react";
import { UserPlus, UserCheck, Lock, LogOut } from "lucide-react";
import styles from "./Dropdown.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

function DropDown({
  handleProfileImageChange,
  handlePasswordChange,
  setIsDropdown,
}) {
  const profileDropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!profileDropdownRef.current.contains(e.target)) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const user = localStorage.getItem("user");
  const { userName, role } = user
    ? JSON.parse(user)
    : { userName: "Guest", role: "User" };

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    console.log("clicked logout");
    localStorage.removeItem("user");
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div ref={profileDropdownRef} className={styles.dropdown}>
      <div className={styles.dropdownHeader}>
        <p>
          <span>User:</span>
          <span>{userName}</span>
        </p>
        <p style={{ color: "#888", fontSize: "12px" }}>
          {" "}
          <span>Role:</span>
          <span>{role}</span>
        </p>
      </div>
      <div className={styles.dropdownItem} onClick={handleProfileImageChange}>
        <UserPlus size={18} />
        <p style={{ marginLeft: "10px" }}>Add Profile Pic</p>
      </div>
      <div className={styles.dropdownItem} onClick={handleProfileImageChange}>
        <UserCheck size={18} />
        <p style={{ marginLeft: "10px" }}>Update Profile Pic</p>
      </div>
      <div className={styles.dropdownItem} onClick={handlePasswordChange}>
        <Lock size={18} />
        <p style={{ marginLeft: "10px" }}>Change Password</p>
      </div>
      <div onClick={handleLogout} className={styles.dropdownItem}>
        <LogOut size={18} />
        <p style={{ marginLeft: "10px" }}>Logout</p>
      </div>
    </div>
  );
}

export default DropDown;
