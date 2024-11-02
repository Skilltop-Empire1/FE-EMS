import React from "react";
import { MODAL_TYPES, useModal } from "../../context/ModalContext";
import style from "../organisationModals/OrganisationModals.module.css";
import { formatDate } from "../../utils/formatDate";

const AppointmentViewModal = () => {
  const { closeModal, openModal, modalProps: appointment } = useModal();

  console.log("AppointmentViewModal", appointment);

  const handleEdit = () => {
    openModal(MODAL_TYPES.TYPE7, appointment);
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.header}>
        <h3>View Appointment Details</h3>
      </div>
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div>
            <label>Patient Name:</label>
            <input
              type="text"
              value={appointment.patName}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Patient Address:</label>
            <input
              type="text"
              value={appointment.address}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Patient Gender:</label>
            <input
              type="text"
              value={appointment.gender}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Consulting Doctor:</label>
            <input
              type="text"
              value={appointment.staff.firstName}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={appointment.email}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={appointment.phone}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              value={formatDate(appointment.dateOfBirth)}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Department:</label>
            <input
              type="text"
              value={appointment.department.name}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Appointment Date:</label>
            <input
              type="date"
              value={appointment.appointDate}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Appointment Time:</label>
            <input
              type="time"
              value={appointment.appointTime}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Reason for Appointment:</label>
            <input
              type="text"
              value={appointment.reason}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentViewModal;
