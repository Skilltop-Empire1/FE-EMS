import React, { useState } from "react";
import { Search } from "lucide-react";
import SearchQuery from "@src/components/searchQuery/SearchQuery";

function Reports() {
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [practiceFilter, setPracticeFilter] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="w-full px-10 py-5 flex flex-col space-y-4">
      <div className="my-4 space-y-4">
        <h2 className="text-2xl font-bold text-left">Reports</h2>
        <p className="text-sm">Last Update October 15, 2024</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="relative flex items-center max-w-[400px] w-full">
          <SearchQuery />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {ReportList.map(({ label }) => (
          <div className="bg-white shadow-md rounded-lg">
            <div className="p-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold">{label} Section</h2>
            </div>
            <div className="bg-gray-200 h-72 p-4">
              <p className="text-gray-600">
                This is the body content of the card.
              </p>
            </div>
          </div>
        ))}
      </div>

      {showForm && <div>{/* <AddStaffModal toggleForm={toggleForm} /> */}</div>}
    </div>
  );
}

export default Reports;

const ReportList = [
  { label: "Doctor" },
  { label: "Nurse" },
  { label: "Pharmacy" },
  { label: "Laboratory" },
  { label: "Account" },
  { label: "Radiology" },
];
