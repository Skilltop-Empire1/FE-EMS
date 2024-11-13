import React, { useState } from "react";
import { Search } from "lucide-react";

function Reports() {
  const [showForm, setShowForm] = useState(false);
  // const [data, setData] = useState(tableData);
  const [searchText, setSearchText] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [practiceFilter, setPracticeFilter] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    // filterData(event.target.value, specializationFilter, practiceFilter);
  };

  return (
    <div className="w-full px-10 py-5 flex flex-col space-y-4">
      <div className="my-4 space-y-4">
        <h2 className="text-2xl font-bold text-left">Reports</h2>
        <p className="text-sm">Last Update October 15, 2024</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="relative flex items-center max-w-[400px] w-full">
          <Search className="absolute left-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
            onChange={handleSearch}
          />
        </div>

        {/* <div className="flex gap-2 items-center">
          <button
            className="bg-transparent border border-emsBlue text-emsBlue px-6 py-3 font-light rounded-lg text-sm"
            onClick={toggleForm}
            disabled={showForm}
          >
            Add Appointment
          </button>
          <button
            className="bg-emsBlue text-white px-6 py-3 font-light rounded-lg text-sm"
            onClick={toggleForm}
            disabled={showForm}
          >
            Add Staff
          </button>
        </div> */}
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
