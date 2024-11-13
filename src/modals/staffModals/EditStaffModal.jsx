import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import ModalWrapper from "@src/components/shared/ModalWrapper";
import { useEditInviteStaffMutation } from "@src/redux/api/staffApi";
import toast from "react-hot-toast";

// Define the animation variants
const modalVariants = {
  hidden: { opacity: 0, y: "-50px" },
  visible: { opacity: 1, y: "0" },
  exit: { opacity: 0, y: "50px" },
};

const EditStaffModal = ({ show, onClose, data, departments }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: data.userName,
    email: data.email,
    addedDate: data.addedDate,
    staffStatus: data.staffStatus,
    role: data.role,
    departmentName: data.departmentName,
    permissions: data.permission,
  });

  const [editInviteStaff, { isLoading, isError, isSuccess }] =
    useEditInviteStaffMutation();

  useEffect(() => {
    setFormData({
      userName: data.userName,
      email: data.email,
      addedDate: data.addedDate,
      staffStatus: data.staffStatus,
      role: data.role,
      departmentName: data.departmentName,
      permissions: data.permission,
    });
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data?.staffId, formData);
    try {
      await editInviteStaff(data?.staffId, formData).unwrap();
      toast.success("Staff added Updated!");
    } catch (error) {
      toast.error("Failed to Update Staff!");
      console.error("Failed to update staff:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <ModalWrapper
      onClose={onClose}
      contentMaxWidth="max-w-xl"
      modalTitle="Edit Staff"
    >
      <motion.div
        className="relative flex-grow"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Staff Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Staff Email{" "}
              <small className="text-red-600 italic">(readonly)</small>
            </label>
            <input
              type="email"
              name="email"
              readOnly
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <select
              name="departmentName"
              value={formData.departmentName}
              onChange={handleInputChange}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Staff Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Doctor">Doctor</option>
              <option value="Nurses">Nurses</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Staff Status
            </label>
            <select
              name="staffStatus"
              value={formData.staffStatus}
              onChange={handleInputChange}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-around space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 px-8 py-4 text-center text-white text-xs font-medium hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-300"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className={clsx(
                "px-8 py-4 text-xs font-medium",
                loading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              )}
            >
              {loading ? "Please wait ..." : "Update Role"}
            </button>
          </div>
        </form>
      </motion.div>
    </ModalWrapper>
  );
};

export default EditStaffModal;
