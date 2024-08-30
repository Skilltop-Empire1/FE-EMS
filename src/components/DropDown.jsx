import React from "react";
import {
  ChangePassIcon,
  EditIcon,
  UpdateProfileIcon,
} from "../assets/ProfileIcons";

function DropDown({ handleProfileImageChange, handlePasswordChange }) {
  return (
    <div
      style={{
        width: "160px",
        height: "86px",
        zIndex: "100",
        position: "absolute",
        right: "0",
        fontSize: "12px",
        fontWeight: "400",
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        backgroundColor: "#fff",
        boxShadow: '0px 0px 10px 0px #171A1F1F',
        padding: '15px'
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={handleProfileImageChange}
        >
          <UpdateProfileIcon />
          <p>Update Profile Pic</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={handlePasswordChange}
        >
          <ChangePassIcon />
          <p>Change Password</p>
        </div>
        <div style={{ marginLeft: "16px", cursor: "pointer" }}>
          <p>Logout</p>
        </div>
      </div>
      <div>
        <EditIcon />
      </div>
    </div>
  );
}

export default DropDown;
