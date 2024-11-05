import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import { useCreateStaffMutation } from "@src/redux/api/staffApi";
import React, { useState } from "react";
import { z } from "zod";

// Define schema using zod
const staffSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Role is required"),
  departmentName: z.string().min(1, "Department is required"),
  specialization: z.string().min(1, "Specialization is required"),
  shiftSchedule: z.string().optional(),
  employStatus: z.string().optional(),
  location: z.string().optional(),
  dateOfHire: z.string().min(1, "Date of hire is required"),
  yrOfExperience: z.string().optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().optional(),
  licence: z.string().optional(),
  educationalQualification: z.string().optional(),
});

const StaffViewEditForm = ({ onClose, isViewMode = false, initialData = {} }) => {
  const [createStaff, { isLoading, isError, isSuccess }] = useCreateStaffMutation();
  const [formData, setFormData] = useState({
    ...initialData,
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    role: initialData.role || "",
    departmentName: initialData.departmentName || "",
    specialization: initialData.specialization || "",
    dateOfHire: initialData.dateOfHire || "",
    dateOfBirth: initialData.dateOfBirth || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    gender: initialData.gender || "male",
    licence: initialData.licence || "",
    educationalQualification: initialData.educationalQualification || "",
  });

  const [viewMode, setViewMode] = useState(isViewMode);
  const [keepOpen, setKeepOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Fetch departments
  const { data: fetchedDepartment, isLoading: isLoadingDepartment } = useFetchResourceQuery("/department/list");

  const handleCheckboxChange = (e) => setKeepOpen(e.target.checked);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setFormErrors({});
    // Validate form data using zod schema
    const validationResult = staffSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = {};
      validationResult.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    try {
      await createStaff(formData).unwrap();
      resetForm();
      if (!keepOpen) onClose();
    } catch (error) {
      console.error("Failed to create staff: ", error);
      setApiError(error?.data?.error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
      departmentName: "",
      specialization: "",
      dateOfHire: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      gender: "male",
      licence: "",
      educationalQualification: "",
    });
    setFormErrors({});
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl">{viewMode ? "View Staff" : "Edit Staff"}</h2>
        <button onClick={() => setViewMode(!viewMode)} className="text-blue-600 hover:underline">
          {viewMode ? "Edit" : "View"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isError && <div className="col-span-2 text-xs text-red-500">{apiError}</div>}
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block mb-1 font-medium text-sm">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
              {formErrors[key] && <span className="text-red-400">*</span>}
            </label>
            {viewMode ? (
              <div className="w-full border border-gray-300 text-sm rounded-lg p-2 bg-gray-100">
                {formData[key] || "N/A"}
              </div>
            ) : key === "dateOfBirth" || key === "dateOfHire" ? (
              <input
                type="date"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-sm rounded-lg p-1"
              />
            ) : key === "gender" ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-sm rounded-lg p-1"
                disabled={viewMode}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : key === "departmentName" ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-sm rounded-lg p-1"
                disabled={viewMode}
              >
                <option value="">Select Department</option>
                {fetchedDepartment?.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            ) 
            : (
              <input
                type={key === "email" ? "email" : "text"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-sm rounded-lg p-1"
                disabled={viewMode}
              />
            )}
            {formErrors[key] && <span className="text-red-500 text-xs">{formErrors[key]}</span>}
          </div>
        ))}

        {/* {!viewMode && (
          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={keepOpen} onChange={handleCheckboxChange} className="w-4 h-4" />
              <span className="text-sm">Add another staff</span>
            </label>
          </div>
        )} */}

        {!viewMode && (
          <div className="col-span-1">
            <label className="inline-block mt-12"></label>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Staff"}
            </button>
          </div>
        )}
      </form>

      {isSuccess && <div className="text-green-500 text-sm">Staff saved successfully!</div>}
    </div>
  );
};

export default StaffViewEditForm;
