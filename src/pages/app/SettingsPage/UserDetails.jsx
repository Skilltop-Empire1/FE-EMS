import React, { useState } from "react";

import styles from "./settingsStyles.module.css";

const UserDetails = ({ formData, handleChange }) => {
  return (
    <div className={styles[`user-details-container`]}>
      <h3>Personal Settings</h3>
      <form>
        <div className={styles[`form-content`]}>
          <div>
            <p>Name:</p>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <p>Email:</p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <p>Phone Number:</p>

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Address:</p>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <br />
            <p>Date of Birth:</p>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <br />
            <p>Zip Code:</p>

            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
