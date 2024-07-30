import React, { useState } from "react";

const permissionsData = [
  "Organization",
  "Staff",
  "Patients",
  "Appointment",
  "Account",
  "Report",
];

const rolesData = [
  "Admin",
  "Doctor",
  "Nurse",
  "Laboratory",
  "Radiology",
  "Pharmacy",
  "Finance",
];

const initialStateRoles = rolesData.reduce((acc, role) => {
  acc[role] = false;
  return acc;
}, {});

const initialStatePermissions = permissionsData.reduce((acc, item) => {
  acc[item] = { view: false, edit: false, create: false, delete: false };
  return acc;
}, {});

const PermissionsTable = () => {
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

  const logPermissions = () => {
    console.log(permissions);
  };

  return (
    <>
      <div>
        <h3>Roles</h3>
        <table>
          <tbody>
            {rolesData.map((role, index) => (
              <tr key={index}>
                <td>
                  <label htmlFor={role}>{role}</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={role}
                    name={role}
                    checked={checkedRoles[role]}
                    onChange={() => handleCheckboxChange(role)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Permissions</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>View</th>
              <th>Edit</th>
              <th>Create</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {permissionsData.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>
                  <input
                    type="checkbox"
                    id={`view-switch-${item}`}
                    checked={permissions[item].view}
                    onChange={() => handleToggle(item, "view")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={`edit-switch-${item}`}
                    checked={permissions[item].edit}
                    onChange={() => handleToggle(item, "edit")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={`create-switch-${item}`}
                    checked={permissions[item].create}
                    onChange={() => handleToggle(item, "create")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={`delete-switch-${item}`}
                    checked={permissions[item].delete}
                    onChange={() => handleToggle(item, "delete")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={logPermissions}>Export</button>
    </>
  );
};

export default PermissionsTable;
