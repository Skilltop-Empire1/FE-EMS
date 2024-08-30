import React, { useState, useRef } from "react";
import { MODAL_TYPES, useModal } from "../../context/ModalContext";

import style from "./AppointmentModal.module.css";

const AddAppointment = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    patient: "",
    consultingDoctor: "",
    dateOfAppointment: "",
    timeOfAppointment: "",
    reason: "",
    practice: "",
    organization: "",
  });

  const { closeModal, openModal } = useModal();
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const validateForm = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const handleSubmit = () => {
    if (!validateForm) {
      setError("Please fill in all fields.");
      setMessage("");
      return false;
    }

    const isSuccess = true;

    if (isSuccess) {
      setMessage(" Your appointment has been scheduled successfully.");
      setError("");

      setFormData({
        patient: "",
        consultingDoctor: "",
        dateOfAppointment: "",
        timeOfAppointment: "",
        reason: "",
        practice: "",
        organization: "",
      });

      setTimeout(() => closeModal(), 2000);
      return true;
    } else {
      setError("An error occurred while setting a schedule. Please try again.");
      setMessage("");
      return false;
    }
  };

  const handleAddMore = () => {
    if (!validateForm) {
      setError("Please fill in all fields.");
      setMessage("");
      return false;
    }

    const isSuccess = true;

    if (isSuccess) {
      setMessage(" Your appointment has been scheduled successfully."),
        setError("");

      setFormData({
        patient: "",
        consultingDoctor: "",
        dateOfAppointment: "",
        timeOfAppointment: "",
        reason: "",
        practice: "",
        organization: "",
      });

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return true;
    } else {
      setError("An error occurred while setting a schedule. Please try again.");
      setMessage("");
      return false;
    }
  };

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <div className={style.header}>
        <h3>Add Appointment</h3>
      </div>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div className={style.inputField}>
            <label htmlFor="patient">Patient</label>
            <input
              type="text"
              id="patient"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              placeholder="Patient"
            />
          </div>

          <div>
            <label htmlFor="consulting-doctor">Consulting Doctor</label>
            <input
              type="text"
              id="consulting-doctor"
              name="consultingDoctor"
              value={formData.consultingDoctor}
              onChange={handleChange}
              placeholder="Consulting Doctor"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="date-of-appointment">Date of Appointment</label>
            <input
              type="date"
              id="date-of-appointment"
              name="dateOfAppointment"
              value={formData.dateOfAppointment}
              onChange={handleChange}
              min={today}
              className={style.dateInput}
            />
          </div>

          <div>
            <label htmlFor="time-of-appointment">Time of Appointment</label>
            <input
              type="time"
              id="time-of-appointment"
              name="timeOfAppointment"
              value={formData.timeOfAppointment}
              onChange={handleChange}
              placeholder="Time of Appointment"
            />
          </div>
        </div>

        <div className={style.inputContent}>
          <div>
            <label htmlFor="reason">Reason</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Reason"
            />
          </div>

          <div>
            <label htmlFor="practice">Practice</label>
            <input
              type="text"
              id="practice"
              name="practice"
              value={formData.practice}
              onChange={handleChange}
              placeholder="Practice"
            />
          </div>
        </div>

        <div className={style.inputContent}>
          <div>
            <label htmlFor="organization">Organization</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Organization"
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="submit" onClick={handleSubmit}>
          Schedule
        </button>
        <button type="button" onClick={handleAddMore}>
          More
        </button>
      </div>
    </form>
  );
};

export default AddAppointment;
