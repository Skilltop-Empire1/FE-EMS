import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import { useEditStaffMutation } from "@src/redux/api/staffApi";
import clsx from "clsx";
import React, { useState, useRef } from "react";
import { z } from "zod";
import { useReactToPrint } from "react-to-print";

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

const StaffViewEditForm = ({
  onClose,
  isViewMode = false,
  initialData = {},
}) => {
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
  const { data: fetchedDepartment, isLoading: isLoadingDepartment } =
    useFetchResourceQuery("/department/list");

  const [editStaff, { isLoading, isError, isSuccess }] = useEditStaffMutation();

  const handleCheckboxChange = (e) => setKeepOpen(e.target.checked);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      await editStaff(formData?.staffId, formData).unwrap();
      toast.success("Staff added successfully!");
      onClose();
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


  //printing function

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ 
    contentRef,
    documentTitle: initialData?.firstName + ' ' + initialData?.lastName + ' Information',
   });


  return (
    <div>
      <div className="flex justify-between  mb-4">
        <h2 className="text-xl">{viewMode ? "View Staff" : "Edit Staff"}</h2>
        {/* <button onClick={() => setViewMode(!viewMode)} className="text-blue-600 hover:underline">
          {viewMode ? "Edit" : "View"}
        </button> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        ref={contentRef}
      >
        {isError && (
          <div className="col-span-2 text-xs text-red-500">{apiError}</div>
        )}
        {Object.keys(formData).map((key) => (
          <div
            key={key}
            className={clsx("", {
              hidden: key == "staffId",
            })}
          >
            <label htmlFor={key} className="block mb-1 font-bold text-[17px]">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
              {formErrors[key] && <span className="text-red-400">*</span>}
            </label>
            {viewMode ? (
              <div className="w-full bg-[#F8F8F8] text-sm rounded-lg p-2 ">
                {formData[key] || "N/A"}
              </div>
            ) : key === "dateOfBirth" || key === "dateOfHire" ? (
              <input
                type="date"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full bg-[#F8F8F8] text-sm rounded-lg p-1"
              />
            ) : key === "gender" ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full bg-[#F8F8F8] text-sm rounded-lg p-1"
                disabled={viewMode}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : key === "role" ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full bg-[#F8F8F8] text-sm rounded-lg p-1"
                disabled={viewMode}
              >
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Admin">Admin</option>
              </select>
            ) : key === "departmentName" ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full bg-[#F8F8F8] text-sm rounded-lg p-1"
                disabled={viewMode}
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
                className="w-full bg-[#F8F8F8] text-sm rounded-lg p-1"
                disabled={viewMode}
              />
            )}
            {formErrors[key] && (
              <span className="text-red-500 text-xs">{formErrors[key]}</span>
            )}
          </div>
        ))}

        {viewMode && (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <label className="flex items-center justify-end  space-x-2 m-4">
            <button
              type="button"
              className="w-[150px] h-[50px] bg-emsBlue text-white py-2 rounded-md hover:bg-blue-900 transition"
              onClick={reactToPrintFn}
            >
              Print
            </button>
            </label>
             <label className="flex items-center justify-end  space-x-2 m-4">
            <button
              type="button"
              className="w-[150px] h-[50px] bg-emsRed text-white py-2 rounded-md hover:bg-red-800 transition"
              onClick={onClose}
              
            >
              Cancel
            </button>
            </label>
          </div>
        )}

        {!viewMode && (
          <div className="col-span-1 md:col-span-2 flex justify-center gap-6">
            <label className="inline-block mt-12"></label>
            <button
              type="submit"
              className="w-[150px] h-[50px] bg-emsBlue text-white py-2 rounded-md hover:bg-blue-900 transition"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Staff"}
            </button>
             <button
              type="submit"
              className="w-[150px] h-[50px]  bg-emsRed text-white py-2 rounded-md hover:bg-red-800 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default StaffViewEditForm;
