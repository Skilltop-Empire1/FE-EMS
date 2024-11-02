import React from "react";
import { UserPlus, UserCheck, Lock, LogOut } from "lucide-react";
import styles from "./DropDown.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function DropDown({ handleProfileImageChange, handlePasswordChange }) {
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
    <div className={styles.dropdownContainer}>
      <div className={styles.usernameSection}>
        <p>
          <span>Username:</span>
          <span>{userName}</span>
        </p>
        <p className={styles.roleText}>
          <span>Role:</span> <span>{role}</span>
        </p>
      </div>
      <div className={styles.menuItem} onClick={handleProfileImageChange}>
        <UserPlus size={18} />
        <p className={styles.icon}>Add Profile Pic</p>
      </div>
      <div className={styles.menuItem} onClick={handleProfileImageChange}>
        <UserCheck size={18} />
        <p className={styles.icon}>Update Profile Pic</p>
      </div>
      <div className={styles.menuItem} onClick={handlePasswordChange}>
        <Lock size={18} />
        <p className={styles.icon}>Change Password</p>
      </div>
      <div onClick={handleLogout} className={styles.menuItem}>
        <LogOut size={18} />
        <p className={styles.icon}>Logout</p>
      </div>
    </div>
  );
}

export default DropDown;
