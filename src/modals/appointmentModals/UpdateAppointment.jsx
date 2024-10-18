import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";

import style from "./AppointmentModal.module.css";
import useEditResource from "../../hooks/editRequestApi";

const UpdateAppointment = () => {
  const initialData = {
    patient: "",
    consultingDoctor: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    practice: "",
    organization: "",
  };
  const { closeModal, modalProps } = useModal();
  const [formData, setFormData] = useState(initialData);
  const [placeholder] = useState(modalProps);

  const { editResource, loading, error, success } = useEditResource(
    ` https://be-ems-production-2721.up.railway.app/api/v1/appointment/update/${modalProps.id}`
  );

  console.log("modal props", modalProps);
  console.log("modal props", modalProps.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await editResource(formData);
    if (success) {
      setFormData(initialData);
      closeModal();
    }
  };

  const handleCancel = () => {
    setFormData(initialData);

    closeModal();
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className={style.header}>
        <h3>Update Appointment</h3>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="patient">Patient:</label>
            <input
              type="text"
              id="patient"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              placeholder={placeholder.patient}
              required
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
              placeholder={placeholder.consultingDoctor}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="appointmentDate">Appointment Date</label>

            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              placeholder={placeholder.appointmentDate}
              required
            />
          </div>

          <div>
            <label htmlFor="appointmentTime">Appointment Time</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              placeholder={placeholder.appointmentTime}
              required
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
              placeholder={placeholder.reason}
              required
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
              placeholder={placeholder.practice}
              required
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
              placeholder={placeholder.organization}
              required
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button disabled={loading} type="submit">
          Update
        </button>
        <button disabled={loading} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateAppointment;
