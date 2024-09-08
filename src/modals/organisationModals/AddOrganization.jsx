import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import usePostRequest from "../../hooks/postRequestApi";
import style from "./OrganisationModals.module.css";

const AddOrganisation = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const { closeModal, modalProps } = useModal();
  console.log(modalProps);

  const {
    data,
    loading,
    error: apiError,
    postRequest,
  } = usePostRequest(
    " https://be-ems-production-2721.up.railway.app/api/v1/organization/update/"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobileNumber ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipcode
    ) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      await postRequest(formData);
      setMessage("Saved successfully.");
      setError("");
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
      });
      setTimeout(() => closeModal(), 2000);
    } catch (err) {
      setError("An error occurred while saving. Please try again.");
      setMessage("");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });

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
        {/* Form Fields */}
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
        </div>

        <div className={style.inputContent}>
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
        </div>

        <div className={style.inputContent}>
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

          <div>
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
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
