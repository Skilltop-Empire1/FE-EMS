import React, { useState } from "react";
import PermissionsTable from "./PermitionsTable";
import UserDetails from "./UserDetails";
import { rolesData, permissionsData } from "./data";

import styles from "./settingsStyles.module.css";
import StaffInviteForm from "@src/components/Staff/StaffInviteForm";
import StaffTable from "@src/components/dataTable2/StaffTable";
import AllStaffTable from "@src/components/dataTable2/AllStaffTable";

const UserSettings = () => {
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

  return (
    <div className={styles.body}>
      <div className="my-4 space-y-4">
        <h2 className="text-2xl font-bold text-left">Owner Settings User</h2>
        {/* <p className="text-sm">Last Update October 15, 2024</p> */}
      </div>
      <div>
        <AllStaffTable />
      </div>
      {/* <StaffInviteForm /> */}
    </div>
  );
};

export default UserSettings;
