import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import style from "../organisationModals/OrganisationModals.module.css";
import { usePostResourceMutation } from "../../redux/api/departmentApi";

const AddAppointment = () => {
  const initialData = {
    patName: "",
    address: "",
    gender: "",
    consultingDoctor: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    deptId: "",
    appointDate: "",
    appointTime: "",
    reason: "to see a doctor",
  };

  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const { closeModal } = useModal();
  const URL = `/appointment/book/:${patientId}`;
  const [postResource, { isLoading: loading, isError: apiError }] =
    usePostResourceMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      const result = await postResource({ url: URL, data: formData });

      if (result.error) {
        throw new Error(result.error.message);
      }

      setMessage("Appointment added successfully.");
      console.log("Appointment added successfully", {
        ...formData,
        sendMessage,
      });
      setError("");
      setFormData(initialData);
      setSendMessage(false);
      setTimeout(() => setMessage(""), 1500);

      if (!isChecked) {
        setTimeout(() => closeModal(), 2000);
      }
    } catch (err) {
      setError(
        "An error occurred while adding the appointment. Please try again."
      );
      setMessage("");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setSendMessage(false);
    closeModal();
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSmsCheckbox = (e) => {
    setSendMessage(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <label htmlFor="patName">Patient Name:</label>
            <input
              type="text"
              id="patName"
              name="patName"
              value={formData.patName}
              onChange={handleChange}
              placeholder="Patient Name"
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
              placeholder="Patient Address"
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
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="consultingDoctor">Consulting Doctor:</label>
            <input
              type="text"
              id="consultingDoctor"
              name="consultingDoctor"
              value={formData.staff}
              onChange={handleChange}
              placeholder="Consulting Doctor"
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
              placeholder="Email"
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
              placeholder="Phone Number"
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
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="deptId">Department ID:</label>
            <input
              type="text"
              id="deptId"
              name="deptId"
              value={formData.deptId}
              onChange={handleChange}
              placeholder="Department ID"
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
            <input
              type="checkbox"
              id="sendMessage"
              name="sendMessage"
              checked={sendMessage}
              onChange={handleSmsCheckbox}
            />
            <label htmlFor="sendMessage">Send Patient Message</label>
          </div>
        </div>
      </div>
      <div className={style.checkbox}>
        <div className="check">
          <input
            type="checkbox"
            id="addMore"
            checked={isChecked}
            onChange={handleCheck}
          />
          <label htmlFor="addMore">Create another Appointment</label>
        </div>
        <div className={style.formButton}>
          <button type="submit" disabled={loading}>
            Add
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddAppointment;
