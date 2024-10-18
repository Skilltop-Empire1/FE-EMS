import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";

import style from "./OrganisationModals.module.css";

const UpdateOrganization = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const { closeModal, modalProps } = useModal();

  useEffect(() => {
    if (modalProps) {
      setFormData(modalProps);
    }
  }, [modalProps]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const URL = `https://www./${modalProps.id}`;

    const updateUser = () => {
      fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => console.log("success", data))
        .catch((error) => console.error("error", error));
    };

    updateUser();
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      city: "",
      state: "",
      zipcode: "",
    });

    closeModal();
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className={style.header}>
        <h3>Update Organization</h3>
      </div>
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="zipcode">Address</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateOrganization;
