import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import usePostRequest from "../../hooks/postRequestApi";
import style from "./AppointmentModal.module.css";

const AddAppointment = () => {
  const URL = "http://localhost:5000/appointmentData";
  const initialState = {
    patient: "",
    consultingDoctor: "",
    dateOfAppointment: "",
    timeOfAppointment: "",
    reason: "",
    practice: "",
    organization: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { closeModal } = useModal();
  const { loading, error: apiError, postRequest } = usePostRequest(URL);

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

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      await postRequest(formData);
      setMessage("Saved successfully.");
      setError("");
      setFormData(initialState);
      setTimeout(() => closeModal(), 2000);
    } catch (err) {
      setError("An error occurred while saving. Please try again.");
      setMessage("");
    }
  };

  const handleAddMore = async () => {
    if (!validateForm()) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      await postRequest(formData);
      setMessage(
        "Your appointment has been scheduled successfully. You can add more appointments."
      );
      setError("");
      setFormData(initialState);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setError("An error occurred while scheduling. Please try again.");
      setMessage("");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={style.header}>
        <h3>Add Appointment</h3>
      </div>
      {loading && <div style={{ color: "blue" }}>Loading...</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {apiError && <div style={{ color: "red" }}>{apiError.message}</div>}
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
            <label htmlFor="consultingDoctor">Consulting Doctor</label>
            <input
              type="text"
              id="consultingDoctor"
              name="consultingDoctor"
              value={formData.consultingDoctor}
              onChange={handleChange}
              placeholder="Consulting Doctor"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="dateOfAppointment">Date of Appointment</label>
            <input
              type="date"
              id="dateOfAppointment"
              name="dateOfAppointment"
              value={formData.dateOfAppointment}
              onChange={handleChange}
              min={today}
              className={style.dateInput}
            />
          </div>

          <div>
            <label htmlFor="timeOfAppointment">Time of Appointment</label>
            <input
              type="time"
              id="timeOfAppointment"
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
        <button type="button" onClick={handleSubmit} disabled={loading}>
          Schedule
        </button>
        <button type="button" onClick={handleAddMore} disabled={loading}>
          Add More
        </button>
      </div>
    </form>
  );
};

export default AddAppointment;
