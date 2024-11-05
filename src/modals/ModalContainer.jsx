import React, { useState, useRef } from "react";
import style from "./profileModals/popUp.module.css";
import ChangeProfileImage from "./profileModals/ChangeProfileImage";
import ChangePassword from "./resetModal/changePassword";
import LogoutConfirmation from "./profileModals/LogoutConfirmation";
import AddOrganization from "./organisationModals/AddOrganization";
import UpdateOrganization from "./organisationModals/UpdateOrganization";

import { MODAL_TYPES, useModal } from "../context/ModalContext";
import AddAppointment from "./appointmentModals/AddAppointment";
import UpdateAppointment from "./appointmentModals/UpdateAppointment";
import ViewOrganization from "./organisationModals/ViewOrganization";
import DeleteOrganization from "./organisationModals/DeleteOrganization";
import ViewAppointment from "./appointmentModals/ViewAppointment";
import DeleteAppointment from "./appointmentModals/DeleteAppointment";

function ModalContainer() {
  const {
    modalType,
    modalProps,
    closeModal,
    handleFile,
    isDelete,
    closeDeleteModal,
  } = useModal();
  const renderModalContext = () => {
    switch (modalType) {
      case MODAL_TYPES.TYPE1:
        return <ChangeProfileImage {...modalProps} />;

      case MODAL_TYPES.TYPE2:
        return <ChangePassword {...modalProps} />;

      case MODAL_TYPES.TYPE3:
        return <LogoutConfirmation {...modalProps} />;

      case MODAL_TYPES.TYPE4:
        return <AddOrganization {...modalProps} />;

      case MODAL_TYPES.TYPE5:
        return <UpdateOrganization {...modalProps} />;

      case MODAL_TYPES.TYPE6:
        return <AddAppointment {...modalProps} />;

      case MODAL_TYPES.TYPE7:
        return <UpdateAppointment {...modalProps} />;

      case MODAL_TYPES.TYPE8:
        return <ViewOrganization {...modalProps} />;

      case MODAL_TYPES.TYPE9:
        return <DeleteOrganization {...modalProps} />;

      case MODAL_TYPES.TYPE10:
        return <ViewAppointment {...modalProps} />;

      case MODAL_TYPES.TYPE11:
        return <DeleteAppointment {...modalProps} />;

      case MODAL_TYPES.TYPE12:
        return <ChangePassword {...modalProps} />;

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
      <div className={isDelete ? style.deleteModalStyle : style.modalStyle}>
        <button
          onClick={() => {
            isDelete ? closeDeleteModal() : closeModal();
          }}
          className={style.closeButtonStyle}
        >
          &times;
        </button>
        {renderModalContext()}
      </div>
    </div>
  );
}

export default ModalContainer;
