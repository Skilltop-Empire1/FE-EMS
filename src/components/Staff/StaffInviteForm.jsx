import React, { useState } from "react";
import { z } from "zod";
import RolesPermissionsCard from "../settings/RolesPermissionsCard";
import { useInviteStaffMutation } from "@src/redux/api/staffApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Define Zod schema for form validation
const staffInviteSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional(), // Add validation for role
  // permissions: z.array(
  //   z.object({
  //     label: z.string(),
  //     view: z.boolean(),
  //     create: z.boolean(),
  //     edit: z.boolean(),
  //     approval: z.boolean(),
  //   })
  // ),
});

const StaffInviteForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(""); // State for selected role
  const [permissions, setPermissions] = useState([]); // State for permissions
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [inviteStaff, { isLoading, isSuccess, isError }] =
    useInviteStaffMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before validation

    // Validate form data with Zod
    const validationResult = staffInviteSchema.safeParse({
      email,
      password,
      username,
      // role, // Include role in validation
      // permissions,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      console.log({ fieldErrors });
      setErrors(fieldErrors);
      return;
    }

    try {
      // Call the mutation with form data
      await inviteStaff({
        email,
        password,
        userName: username,
        // role,
        // permissions,
      }).unwrap();
      setEmail("");
      setPassword("");
      setUsername("");
      setRole("");
      setPermissions([]);
      setLoading(false);
      toast.success("Invite sent successfully!");
    } catch (error) {
      toast.error("Email Record Does Not Exist");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors?.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username._errors}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email._errors}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password._errors}
              </p>
            )}
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mt-5">
              {/* Email Address */}
            </label>
            <Link
              to="/app/settings/user"
              type="button"
              className="border inline-block border-emsPurple text-emsPurple w-full py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsPurple"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className="mt-14">
          <RolesPermissionsCard
            showExport={false}
            onRoleChange={(role) => setRole(role)} // Pass handler to update role
            onPermissionsChange={(permissions) => setPermissions(permissions)} // Pass handler to update permissions
          />
          {errors?.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role._errors}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-emsPurple text-white py-2 px-6 rounded-md shadow-md hover:bg-emsPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsPurple"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Sending Invite..." : "Send Invite"}
          </button>
          <button className="bg-red-600 text-white py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imsPurple">
            Cancel
          </button>
        </div>

        {/* Success/Error Messages */}
        {/* {isSuccess && (
          <p className="text-green-600 text-sm mt-4">
            Invite sent successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-sm mt-4">
            Failed to send invite. Please try again.
          </p>
        )} */}
      </form>
    </div>
  );
};

export default StaffInviteForm;
