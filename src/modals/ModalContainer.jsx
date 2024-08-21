import React, { useState, useRef } from "react";
import style from "./popUp.module.css";
import ChangeProfileImage from "./ChangeProfileImage";
import ChangePassword from "./ChangePassword";
import LogoutConfirmation from "./LogoutConfirmation";
import { MODAL_TYPES, useModal } from "../context/ModalContext";

function ModalContainer() {
  const { modalType, modalProps, closeModal, handleFile } = useModal();
  const renderModalContext = () => {
    switch (modalType) {
      case MODAL_TYPES.TYPE1:
        return <ChangeProfileImage {...modalProps} />;

      case MODAL_TYPES.TYPE2:
        return <ChangePassword {...modalProps} />;

      case MODAL_TYPES.TYPE3:
        return <LogoutConfirmation {...modalProps} />;

      default:
        return null;
    }
  };
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={style.overlayStyle}
    >
      <div className={style.modalStyle}>
        <button onClick={() => closeModal()} className={style.closeButtonStyle}>
          &times;
        </button>
        {renderModalContext()}
      </div>
    </div>
  );
}

export default ModalContainer;