import React from "react";
import { UserPlus, UserCheck, Lock, LogOut } from "lucide-react";

function DropDown({ handleProfileImageChange, handlePasswordChange }) {
  return (
    <div
      style={{
        width: "200px",
        zIndex: 100,
        position: "absolute",
        right: 0,
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "15px",
      }}
    >
      <div
        style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}
      >
        <p>Username</p>
        <p style={{ color: "#888", fontSize: "12px" }}>Role</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onClick={handleProfileImageChange}
      >
        <UserPlus size={18} />
        <p style={{ marginLeft: "10px" }}>Add Profile Pic</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onClick={handleProfileImageChange}
      >
        <UserCheck size={18} />
        <p style={{ marginLeft: "10px" }}>Update Profile Pic</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onClick={handlePasswordChange}
      >
        <Lock size={18} />
        <p style={{ marginLeft: "10px" }}>Change Password</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
      >
        <LogOut size={18} />
        <p style={{ marginLeft: "10px" }}>Logout</p>
      </div>

      <style jsx>{`
        div:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}

export default DropDown;
