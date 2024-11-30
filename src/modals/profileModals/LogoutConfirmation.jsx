import { useModal } from "@src/context/ModalContext";
import React from "react";
import { useNavigate } from "react-router";

function LogoutConfirmation() {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const logout = () => {
    localStorage.clear();
    closeModal();
    navigate("/");
  };
  const btn = {
    width: "170px",
    height: "48px",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "400",
    lineHeight: "27px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: "#FFFFFF",
  };

  const deleteButton = {
    ...btn,
    backgroundColor: "#3F51B5",
    marginRight: "13px",
  };

  const closeButton = {
    ...btn,
    backgroundColor: "#F44336",
    marginLeft: "13px",
  };

  const btnGroup = {
    display: "flex",
    justifyContent: "space-between",
    gap: "13px",
  };

  const textStyle = {
    width: "360px",
    height: "54px",
    fontSize: "17px",
    fontWeight: 700,
    lineHeight: "27px",
    textAlign: "center",
    color: " #171A1F",
  };

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "38px",
    paddingTop: "20px",
    paddingBottom: "20px",
  };
  return (
    <div style={container}>
      <p style={textStyle}>Are you sure you want to Logout </p>

      <div style={btnGroup}>
        <button onClick={() => closeModal()} style={deleteButton}>
          No
        </button>
        <button style={closeButton} onClick={logout}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default LogoutConfirmation;
