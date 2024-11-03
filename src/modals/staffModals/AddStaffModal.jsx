import { X } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

// Define schema using zod
const staffSchema = z.object({
  name: z.string().min(1, "Staff name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().optional(),
  location: z.string().optional(),
  role: z.string().optional(),
  dateOfHire: z.string().min(1, "Date of hire is required"),
  department: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  specialization: z.string().optional(),
  phone: z.string().optional(),
  qualification: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  license: z.string().optional(),
});

const AddStaffModal = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "male",
    location: "",
    role: "",
    dateOfHire: "",
    department: "",
    yearsOfExperience: "",
    specialization: "",
    phone: "",
    qualification: "",
    email: "",
    license: "",
  });

  const [keepOpen, setKeepOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleCheckboxChange = (e) => {
    setKeepOpen(e.target.checked);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data using zod schema
    const result = staffSchema.safeParse(formData);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    // Simulate form submission logic
    console.log("Form Data Submitted: ", formData);

    // Clear form data
    setFormData({
      name: "",
      dateOfBirth: "",
      gender: "male",
      location: "",
      role: "",
      dateOfHire: "",
      department: "",
      yearsOfExperience: "",
      specialization: "",
      phone: "",
      qualification: "",
      email: "",
      license: "",
    });

    // Close the form if "Add another staff" is not checked
    if (!keepOpen) {
      toggleForm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
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
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-sm">
              Staff Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
            {formErrors.name && (
              <span className="text-red-500 text-xs">{formErrors.name}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block mb-1 font-medium text-sm"
            >
              Date Of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
            {formErrors.dateOfBirth && (
              <span className="text-red-500 text-xs">
                {formErrors.dateOfBirth}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block mb-1 font-medium text-sm">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block mb-1 font-medium text-sm"
            >
              Location
            </label>
            <textarea
              rows={2}
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-2 resize-none"
            />
          </div>

          <div>
            <label htmlFor="role" className="block mb-1 font-medium text-sm">
              Role/Position <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
          </div>

          <div>
            <label
              htmlFor="dateOfHire"
              className="block mb-1 font-medium text-sm"
            >
              Date Of Hire <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              id="dateOfHire"
              name="dateOfHire"
              value={formData.dateOfHire}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
            {formErrors.dateOfHire && (
              <span className="text-red-500 text-xs">
                {formErrors.dateOfHire}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="department"
              className="block mb-1 font-medium text-sm"
            >
              Department <span className="text-red-400">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            >
              <option>Paediatrics</option>
              <option>A and E</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="yearsOfExperience"
              className="block mb-1 font-medium text-sm"
            >
              Years Of Experience
            </label>
            <input
              type="text"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
          </div>

          <div>
            <label
              htmlFor="specialization"
              className="block mb-1 font-medium text-sm"
            >
              Specialization <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-sm">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
          </div>

          <div>
            <label
              htmlFor="qualification"
              className="block mb-1 font-medium text-sm"
            >
              Educational Qualification
            </label>
            <select
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            >
              <option>ND</option>
              <option>MBBS</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
            {formErrors.email && (
              <span className="text-red-500 text-xs">{formErrors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="license" className="block mb-1 font-medium text-sm">
              License <span className="text-red-400">*</span>
            </label>
            <input
              type="string"
              id="license"
              name="license"
              value={formData.license}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-sm rounded-lg p-1"
            />
          </div>

          <div className="col-span-1 flex items-center gap-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4 flex items-center">
            <input
              type="checkbox"
              checked={keepOpen}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="checkbox" className="text-gray-600">
              Add another staff
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
