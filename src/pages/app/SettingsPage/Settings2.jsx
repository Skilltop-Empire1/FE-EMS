import React, { useState } from "react";
import PermissionsTable from "./PermitionsTable";
import UserDetails from "./UserDetails";
import { rolesData, permissionsData } from "./data";

import styles from "./settingsStyles.module.css";

const Settings = () => {
  const initialStateForm = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    zipCode: "",
  };

  const initialStateRoles = rolesData.reduce((acc, role) => {
    acc[role] = false;
    return acc;
  }, {});

  const initialStatePermissions = permissionsData.reduce((acc, item) => {
    acc[item] = { view: false, edit: false, create: false, delete: false };
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialStateForm);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  const [permissions, setPermissions] = useState(initialStatePermissions);
  const [checkedRoles, setCheckedRoles] = useState(initialStateRoles);

  const handleCheckboxChange = (role) => {
    setCheckedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  const handleToggle = (item, permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [item]: {
        ...prevPermissions[item],
        [permission]: !prevPermissions[item][permission],
      },
    }));
  };

  const handleSubmit = () => {
    const URL = "";

    const data = {
      permissions,
      roles: checkedRoles,
      formData,
    };

    async function logDataToApi() {
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Data sent successfully:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    logDataToApi();

    console.log(data);
  };

  return (
    <div className={styles.body}>
      <UserDetails formData={formData} handleChange={handleChange} />
      <PermissionsTable
        handleCheckboxChange={handleCheckboxChange}
        handleToggle={handleToggle}
        handleSubmit={handleSubmit}
        rolesData={rolesData}
        permissionsData={permissionsData}
        checkedRoles={checkedRoles}
        permissions={permissions}
      />
    </div>
  );
};

export default Settings;
