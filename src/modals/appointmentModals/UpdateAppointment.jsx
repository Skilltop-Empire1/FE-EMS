import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import style from "../organisationModals/OrganisationModals.module.css";
import { useEditResourceMutation } from "../../redux/api/departmentApi";
import { formatDate } from "../../utils/formatDate";

const AppointmentUpdateModal = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    patName: "",
    address: "",
    gender: "",
    consultingDoctor: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    department: "",
    appointDate: "",
    appointTime: "",
    reason: "",
  });

  const { closeModal, modalProps } = useModal();
  const [editResource, { isLoading }] = useEditResourceMutation();

  useEffect(() => {
    if (modalProps) {
      setFormData(modalProps);
    }
  }, [modalProps]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const URL = `/appointmentData/${modalProps.appointId}`;

    try {
      await editResource({ url: URL, data: formData }).unwrap();
      setSuccess("Update successful!");
      setError("");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch {
      setError("Update failed. Please try again.");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    setFormData({
      patName: "",
      address: "",
      gender: "",
      consultingDoctor: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      department: "",
      appointDate: "",
      appointTime: "",
      reason: "",
    });
    closeModal();
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className={style.header}>
        <h3>Update Appointment</h3>
      </div>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="patName">Patient Name:</label>
            <input
              type="text"
              id="patName"
              name="patName"
              value={formData.patName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Patient Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="gender">Patient Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="consultingDoctor">Consulting Doctor:</label>
            <input
              type="text"
              id="consultingDoctor"
              name="consultingDoctor"
              value={formData.staff?.firstName || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formatDate(formData.dateOfBirth)}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department?.name || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="appointDate">Appointment Date:</label>
            <input
              type="date"
              id="appointDate"
              name="appointDate"
              value={formData.appointDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="appointTime">Appointment Time:</label>
            <input
              type="time"
              id="appointTime"
              name="appointTime"
              value={formData.appointTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="reason">Reason for Appointment:</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AppointmentUpdateModal;
