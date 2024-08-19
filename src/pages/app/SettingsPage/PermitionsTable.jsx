import React, { useState } from "react";
import { CheckedIcon, UncheckedIcon } from "../../../assets/ToggleIcons";

import styles from "./settingsStyles.module.css";
import PermissionTicIcon, { EditPen } from "../../../assets/PermissionTicIcon";

const PermissionsTable = ({
  handleCheckboxChange,
  handleToggle,
  handleSubmit,
  rolesData,
  permissionsData,
  checkedRoles,
  permissions,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.rolesContainer}>
          <div className={styles.permissionsHeader}>
            <h3>Roles</h3>
            <EditPen />
          </div>
          <thead>
            <tr> </tr>
          </thead>
          <table>
            <tbody>
              {rolesData.map((role, index) => (
                <tr className={styles.roles} key={index}>
                  <td>
                    <input
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "3px",
                      }}
                      type="checkbox"
                      id={role}
                      name={role}
                      checked={checkedRoles[role]}
                      onChange={() => handleCheckboxChange(role)}
                    />
                  </td>
                  <td>
                    <label htmlFor={role}>{role}</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.permissionsContainer}>
          <div className={styles.permissionsHeader}>
            <h3>Permissions</h3>
            <EditPen />
          </div>

          <table>
            <thead>
              <tr>
                <th>ITEM</th>
                <th>VIEW</th>
                <th>EDIT</th>
                <th>CREATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {permissionsData.map((item, index) => (
                <tr key={index}>
                  <td className={styles.permissionsItems}>
                    <span>{item}</span>
                    <span>
                      {" "}
                      <PermissionTicIcon />
                    </span>
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      id={`view-switch-${item}`}
                      checked={permissions[item].view}
                      onChange={() => handleToggle(item, "view")}
                      className={styles.hidden}
                    />
                    <span
                      onClick={() => handleToggle(item, "view")}
                      className="switch-label"
                    >
                      {permissions[item].view ? (
                        <CheckedIcon />
                      ) : (
                        <UncheckedIcon />
                      )}
                    </span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`edit-switch-${item}`}
                      checked={permissions[item].edit}
                      onChange={() => handleToggle(item, "edit")}
                      className={styles.hidden}
                    />{" "}
                    <span
                      onClick={() => handleToggle(item, "edit")}
                      className="switch-label"
                    >
                      {permissions[item].edit ? (
                        <CheckedIcon />
                      ) : (
                        <UncheckedIcon />
                      )}
                    </span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`create-switch-${item}`}
                      checked={permissions[item].create}
                      className={styles.hidden}
                      onChange={() => handleToggle(item, "create")}
                    />{" "}
                    <span
                      onClick={() => handleToggle(item, "create")}
                      className={styles[`switch-label`]}
                    >
                      {permissions[item].create ? (
                        <CheckedIcon />
                      ) : (
                        <UncheckedIcon />
                      )}
                    </span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id={`delete-switch-${item}`}
                      checked={permissions[item].delete}
                      onChange={() => handleToggle(item, "delete")}
                      className={styles.hidden}
                    />{" "}
                    <span
                      onClick={() => handleToggle(item, "delete")}
                      className={styles[`switch-label`]}
                    >
                      {permissions[item].delete ? (
                        <CheckedIcon />
                      ) : (
                        <UncheckedIcon />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.permissionsBtn} onClick={handleSubmit}>
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default PermissionsTable;
