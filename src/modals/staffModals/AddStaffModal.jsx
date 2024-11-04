import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import { useCreateStaffMutation } from "@src/redux/api/staffApi";
import { X } from "lucide-react";
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

const AddStaffModal = ({ toggleForm }) => {
  const [createStaff, { isLoading, isError, isSuccess }] =
    useCreateStaffMutation();
  const [formData, setFormData] = useState({
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

  const [keepOpen, setKeepOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Fetch departments
  const { data: fetchedDepartment, isLoading: isLoadingDepartment } =
    useFetchResourceQuery("/department/list");

  const handleCheckboxChange = (e) => setKeepOpen(e.target.checked);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const generateRandomValue = (field) => {
    switch (field) {
      case "yrOfExperience":
        return `${Math.floor(Math.random() * 10)} years`;
      case "shiftSchedule":
        return "Day Shift";
      case "employStatus":
        return "Active";
      case "location":
        return "Default Location";
      case "licence":
        return `${Math.floor(Math.random() * 10000000000)}`;
      case "educationalQualification":
        return "Bachelor's Degree";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const dataToSubmit = {
      ...formData,
      yrOfExperience: generateRandomValue("yrOfExperience"),
      shiftSchedule: generateRandomValue("shiftSchedule"),
      employStatus: generateRandomValue("employStatus"),
      location: generateRandomValue("location"),
      licence: generateRandomValue("licence"),
      educationalQualification: generateRandomValue("educationalQualification"),
    };

    try {
      console.log({ dataToSubmit });
      await createStaff(dataToSubmit).unwrap(); // Use unwrap to handle promise resolution
      resetForm();
      if (!keepOpen) toggleForm(); // Close the form if not adding another staff
    } catch (error) {
      console.error("Failed to create staff: ", error);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl !mt-20 !mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Staff</h3>
          <button
            onClick={toggleForm}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block mb-1 font-medium text-sm">
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
                {formErrors[key] && <span className="text-red-400">*</span>}
              </label>
              {key === "dateOfBirth" || key === "dateOfHire" ? (
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
                >
                  <option value="">Select Department</option>
                  {fetchedDepartment?.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={key === "email" ? "email" : "text"}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-sm rounded-lg p-1"
                />
              )}
              {formErrors[key] && (
                <span className="text-red-500 text-xs">{formErrors[key]}</span>
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={keepOpen}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Add another staff</span>
            </label>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
              disabled={isLoading} // Disable while loading
            >
              {isLoading ? "Adding Staff..." : "Add Staff"}
            </button>
          </div>
        </form>

        {isError && (
          <div className="text-red-500 text-sm">
            Failed to add staff. Please try again.
          </div>
        )}
        {isSuccess && (
          <div className="text-green-500 text-sm">
            Staff added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStaffModal;
