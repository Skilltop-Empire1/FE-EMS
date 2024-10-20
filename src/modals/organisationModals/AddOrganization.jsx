import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import usePostRequest from "../../hooks/postRequestApi";
import style from "./OrganisationModals.module.css";

const AddOrganisation = () => {
  const initialData = {
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    username: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { closeModal } = useModal();
  const URL = "http://localhost:5000/organisationData";
  const { loading, error: apiError, postRequest } = usePostRequest(URL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      await postRequest(formData);
      setMessage("Saved successfully.");
      setError("");
      setFormData(initialData);
      setTimeout(() => closeModal(), 2000);
    } catch (err) {
      setError("An error occurred while saving. Please try again.");
      setMessage("");
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.header}>
        <h3>Add Organization</h3>
      </div>
      {loading && <div style={{ color: "blue" }}>Loading...</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {apiError && <div style={{ color: "red" }}>{apiError.message}</div>}
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div className={style.inputField}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
        </div>

        <div className={style.inputContent}>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
        </div>

        <div className={style.inputContent}>
          <div>
            <label htmlFor="zipCode">Zipcode</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Zipcode"
            />
          </div>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User Name"
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="submit" disabled={loading}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddOrganisation;
