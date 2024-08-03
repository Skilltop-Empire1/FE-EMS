import React from "react";
import {
  ChangePassIcon,
  EditIcon,
  UpdateProfileIcon,
} from "../assets/ProfileIcons";

function DropDown() {
  return (
    <div
      style={{
        width: "160px",
        height: "46px",
        zIndex: "100",
        position: "absolute",
        right: "0",
        fontSize: "12px",
        fontWeight: "400",
        display: "flex",
        flexDirection: "row",
        position: "fixed",
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
