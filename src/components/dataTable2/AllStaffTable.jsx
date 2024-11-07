import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetchAllStaffQuery } from "@src/redux/api/staffApi";
import StaffTableSkeleton from "./StaffTableSkeleton";
import EditStaffModal from "@src/modals/staffModals/EditStaffModal";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";

const AllStaffTable = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Fetch data from API
  const { data, isLoading, isError } = useFetchAllStaffQuery({
    endpoint: "/staff/all-Staffs",
    page: currentPage,
    limit: itemsPerPage,
  });

  // Fetch departments
  const { data: fetchedDepartment, isLoading: isLoadingDepartment } =
    useFetchResourceQuery("/department/list");

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
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Staff Directory</h2>

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
