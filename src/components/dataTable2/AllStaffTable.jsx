import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useEditInviteStaffMutation,
  useFetchAllStaffQuery,
} from "@src/redux/api/staffApi";
import StaffTableSkeleton from "./StaffTableSkeleton";
import EditStaffModal from "@src/modals/staffModals/EditStaffModal";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import SelectPermission from "../settings/SelectPermission";
import toast from "react-hot-toast";

const AllStaffTable = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [permissions, setPermissions] = useState([]); // State for permissions

  // Fetch data from API
  const { data, isLoading, isError } = useFetchAllStaffQuery({
    endpoint: "/staff/all-Staffs",
    page: currentPage,
    limit: itemsPerPage,
  });

  // Fetch departments
  const { data: fetchedDepartment, isLoading: isLoadingDepartment } =
    useFetchResourceQuery("/department/list");

  // const [
  //   updateStaffPermission,
  //   {
  //     isLoading: isLoadingMutation,
  //     isSuccess,
  //     isError: isUpdatePermissionMutation,
  //     error,
  //   },
  // ] = useUpdateStaffPermissionMutation(); // Mutation hook for updating staff permission

  const [
    editInviteStaff,
    {
      isLoading: isLoadingMutation,
      isSuccess,
      isError: isUpdatePermissionMutation,
      error,
    },
  ] = useEditInviteStaffMutation();

  useEffect(() => {
    setCurrentPage(data?.currentPage || 1);
  }, [data]);

  if (isLoading) return <StaffTableSkeleton />;
  if (isError) return <p>Error loading staff data. Please try again later.</p>;

  // Pagination controls
  const handlePageClick = (page) => setCurrentPage(page);
  const handleNextPage = () =>
    currentPage < data.totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const launchEditStaffModal = (data) => {
    setShowEditModal(true);
    setStaffData(data);
  };

  const handleRowClick = (staffMember) => {
    setSelectedStaff((prevSelected) =>
      prevSelected?.staffId === staffMember.staffId ? null : staffMember
    );
    setPermissions((prevSelected) =>
      prevSelected?.staffId === staffMember.staffId
        ? []
        : staffMember?.permissions
    );
  };

  const handleUpdatePermission = async () => {
    if (selectedStaff) {
      console.log({ permissions });
      try {
        let data = await editInviteStaff(selectedStaff.staffId, permissions); // Update the role
        console.log({ data });
        toast.success("Staff Permissions Updated!");
      } catch (error) {
        toast.error("Failed to Update Staff!");
        console.error("Failed to update staff:", error);
      }
    }
  };

  // Handle permissions change
  const handlePermissionsChange = (updatedPermissions) => {
    setPermissions(updatedPermissions);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-x-4 text-sm">
          <thead>
            <tr className="bg-gray-50 text-left gap-5">
              <th className="font-semibold p-2 w-10">
                <input type="checkbox" disabled />
              </th>
              <th className="font-semibold p-2">Username</th>
              <th className="font-semibold p-2">Email</th>
              <th className="font-semibold p-2">Added Date</th>
              <th className="font-semibold p-2">Status</th>
              <th className="font-semibold p-2">Role</th>
              <th className="font-semibold p-2">Department Name</th>
              <th className="font-semibold p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.staff.map((staffMember, idx) => (
              <tr
                key={staffMember.staffId}
                className={`border-b gap-5 text-sm cursor-pointer ${
                  idx % 2 === 0 ? "bg-blue-100" : "bg-white"
                } ${
                  selectedStaff?.staffId === staffMember.staffId
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleRowClick(staffMember)}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedStaff?.staffId === staffMember.staffId}
                    onChange={() => handleRowClick(staffMember)}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(staffMember)}
                  />
                </td>
                <td className="p-2">{staffMember.userName}</td>
                <td className="p-2">{staffMember.email}</td>
                <td className="p-2">
                  {new Date(staffMember.addedDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {getStatusBadge(staffMember.staffStatus)}
                </td>
                <td className="p-2">{staffMember.role}</td>
                <td className="p-2">{staffMember.departmentName || "N/A"}</td>
                <td className="p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      launchEditStaffModal(staffMember);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <EditStaffModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          data={staffData}
          departments={fetchedDepartment || []}
        />
      )}

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Page {data?.currentPage} of {data?.totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-400 disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={!data?.hasPrevPage}
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={`flex items-center justify-center w-10 h-10 border border-gray-400 ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-400 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={!data?.hasNextPage}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {selectedStaff && (
        <div className="flex flex-col gap-4">
          <SelectPermission
            loadedPermissions={selectedStaff?.permissions || permissions}
            permissions={selectedStaff?.permissions || permissions}
            onPermissionsChange={handlePermissionsChange}
          />
          <div className="text-center">
            {isSuccess && (
              <p className="text-green-400">
                Permissions Updated Successfully!
              </p>
            )}

            {isUpdatePermissionMutation && <p>Error Updating Permissions</p>}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-emsBlue text-white rounded self-center disabled:bg-emsBlue/80"
            onClick={handleUpdatePermission}
            disabled={isLoadingMutation}
          >
            {isLoadingMutation ? "Updating" : "Update Permission"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllStaffTable;

const getStatusBadge = (status) => {
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  let colorClass = "";
  switch (status.toLowerCase()) {
    case "inactive":
      colorClass = "bg-red-500 text-white";
      break;
    case "registered":
      colorClass = "bg-amber-500 text-white";
      break;
    case "active":
      colorClass = "bg-green-500 text-white";
      break;
    default:
      colorClass = "bg-gray-300 text-black";
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {formattedStatus}
    </span>
  );
};
