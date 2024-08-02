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
      }}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <UpdateProfileIcon />
          <p>Update Profile Pic</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ChangePassIcon />
          <p>Change Password</p>
        </div>
        <div>
          <p style={{ marginLeft: "16px" }}>Logout</p>
        </div>
      </div>
      <div>
        <EditIcon />
      </div>
    </div>
  );
}

export default DropDown;
