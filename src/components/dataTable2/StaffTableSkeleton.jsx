import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const StaffTableSkeleton = () => {
  return (
    <div className="py-4">
      <table className="min-w-full table-fixed border-separate border-spacing-x-4 text-sm">
        <thead>
          <tr className="bg-gray-50 text-left gap-5">
            {[
              "Staff Name",
              "Role/Position",
              "Department",
              "Shift Schedule",
              "Vacation Days",
              "Specialization",
              "Date of Hire",
              "Action",
            ].map((header, index) => (
              <th key={index} className="font-semibold p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr
              key={idx}
              className={`border-b gap-5 text-sm ${
                idx % 2 === 0 ? "bg-blue-100" : "bg-white"
              }`}
            >
              {Array.from({ length: 8 }).map((_, colIdx) => (
                <td key={colIdx} className="p-2">
                  <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        {/* Text on the left side showing entries */}
        <div className="w-60 h-5 bg-gray-300 rounded animate-pulse"></div>

        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
            <ChevronsLeft size={20} />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
            <ChevronLeft size={20} />
          </div>

          {/* Numbered Pagination */}
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>

          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
            <ChevronRight size={20} />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
            <ChevronsRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffTableSkeleton;
