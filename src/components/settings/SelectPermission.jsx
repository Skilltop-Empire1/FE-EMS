import React, { useEffect, useState } from "react";

// Custom Toggle Switch Component
const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300 ${
        isOn ? "border border-emsBlue bg-emsBlue/30" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-0 h-4 w-4 transform rounded-full shadow transition-transform duration-300 ${
          isOn ? "translate-x-6 bg-emsBlue" : "translate-x-1 bg-white"
        }`}
      />
    </div>
  );
};

const initialPermissions = [
  {
    label: "Department",
    view: true,
    edit: false,
    create: false,
    transfer: false,
    delete: false,
  },
  {
    label: "Staff",
    view: false,
    edit: false,
    create: false,
    transfer: false,
    delete: false,
  },
  {
    label: "Patients",
    view: false,
    edit: false,
    create: false,
    transfer: false,
    delete: false,
  },
  {
    label: "Appointments",
    view: false,
    edit: false,
    create: false,
    transfer: false,
    delete: false,
  },
  {
    label: "Accounts",
    view: true,
    edit: false,
    create: false,
    transfer: false,
    delete: false,
  },
  {
    label: "Reports",
    view: false,
    edit: false,
    create: false,
    transfer: false,
    delete: false,
  },
  // {
  //   label: "Accounts",
  //   view: false,
  //   create: false,
  //   edit: false,
  //   approval: false,
  // },
];

const SelectPermission = ({ onPermissionsChange, loadedPermissions }) => {
  const [permissions, setPermissions] = useState(
    loadedPermissions || initialPermissions
  );

  // console.log({ loadedPermissions, permissions });
  const handleToggleChange = (rowIndex, permissionType) => {
    const updatedPermissions = permissions.map((permission, index) => {
      if (index === rowIndex) {
        return {
          ...permission,
          [permissionType]: !permission[permissionType],
        };
      }
      return permission;
    });
    setPermissions(updatedPermissions);
    onPermissionsChange(updatedPermissions);
  };
  useEffect(() => {
    if (loadedPermissions) {
      console.log("first");
      setPermissions(loadedPermissions);
    } else {
      setPermissions(initialPermissions);
      console.log("else");
    }
  }, [loadedPermissions]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Create
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transfer
            </th>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {permissions.map((permission, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {permission.label}
              </td>
              {["view", "edit", "create", "transfer", "delete"].map((type) => (
                <td key={type} className="px-4 py-2 text-center">
                  <ToggleSwitch
                    isOn={permission[type]}
                    handleToggle={() => handleToggleChange(rowIndex, type)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectPermission;
