import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import PopMenu from "./PopMenu";

const StaffTable = ({ data, Role }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the index of the first and last item on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  // Slice the data to get only the items for the current page
  const currentData = data.slice(startIndex, endIndex);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (item) => {
    console.log("View", item);
  };

  const handleEdit = (item) => {
    console.log("Edit", item);
  };

  const handleDelete = (item) => {
    console.log("Delete", item);
  };

  const displayedEntries = currentData.length;
  const totalEntries = data.length;
  const filteredEntries = data.length; // Assuming no filtering, but can adjust for actual filters.

  return (
    <div className="py-4">
      <table className="min-w-full table-fixed border-separate border-spacing-x-4 text-sm">
        <thead>
          <tr className="bg-gray-50 text-left gap-5">
            <th className="font-light p-2">Staff Name</th>
            <th className="font-light p-2">Role/Position</th>
            <th className="font-light p-2">Department</th>
            <th className="font-light p-2">Shift Schedule</th>
            <th className="font-light p-2">Vacation Days </th>
            <th className="font-light p-2">Specialization</th>
            <th className="font-light p-2">Date of Hire</th>
            <th className="font-light p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, idx) => (
            <tr
              key={idx}
              className={`border-b gap-5 text-sm ${
                idx % 2 === 0 ? "bg-blue-100" : "bg-white"
              }`}
            >
              <td className="p-2">{item.Name}</td>
              <td className="p-2">{item.Email}</td>
              <td className="p-2 ">{item.Gender}</td>
              <td className="p-2 ">{item.MobileNumber}</td>
              <td className="p-2 ">{item.Practice}</td>
              <td className="p-2">{item.Specialization}</td>
              <td className="p-2">12-12-2023</td>
              <td className="p-2">
                <PopMenu
                  onView={() => handleView(item)}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        {/* Text on the left side showing entries */}
        <div>
          {`Showing ${
            startIndex + 1
          } to ${endIndex} of ${displayedEntries} entries (filtered from ${filteredEntries} total entries)`}
        </div>

        {/* Pagination controls */}
        <div className="flex items-center">
          <button
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-400 disabled:opacity-50"
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-400 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Numbered Pagination */}
          <div className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`flex items-center justify-center w-10 h-10 border border-gray-400 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-400 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-400 disabled:opacity-50"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;
