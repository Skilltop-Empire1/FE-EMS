import React, { useEffect, useRef } from "react";
import { UserPlus, UserCheck, Lock, LogOut } from "lucide-react";
import styles from "./Dropdown.module.css"; // Import the CSS module

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

  return (
    <div ref={profileDropdownRef} className={styles.dropdown}>
      <div className={styles.dropdownHeader}>
        <p>Username</p>
        <p style={{ color: "#888", fontSize: "12px" }}>Role</p>
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
      <div className={styles.dropdownItem}>
        <LogOut size={18} />
        <p style={{ marginLeft: "10px" }}>Logout</p>
      </div>
    </div>
  );
}

export default DropDown;
