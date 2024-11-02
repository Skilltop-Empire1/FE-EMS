import React from "react";
import { UserPlus, UserCheck, Lock, LogOut } from "lucide-react";
import styles from "./DropDown.module.css";

function DropDown({ handleProfileImageChange, handlePasswordChange }) {
  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.usernameSection}>
        <p>Username</p>
        <p className={styles.roleText}>Role</p>
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
      <div className={styles.menuItem}>
        <LogOut size={18} />
        <p className={styles.icon}>Logout</p>
      </div>
    </div>
  );
}

export default DropDown;
