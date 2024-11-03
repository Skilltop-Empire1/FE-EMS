import React, { useState } from "react";
import { tableHeader, tableData } from "./staffData";
import { Search } from "lucide-react";
import StaffTable from "@src/components/dataTable2/StaffTable";
import AddStaffModal from "@src/modals/staffModals/AddStaffModal";

const Staff = ({ type }) => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState(tableData);
  const [searchText, setSearchText] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [practiceFilter, setPracticeFilter] = useState("");
  // const [stayOpen, setStayOpen] = useState(false);

  const keepOpen = () => {
    setShowForm(!showForm);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    filterData(event.target.value, specializationFilter, practiceFilter);
  };

  const handleSpecializationChange = (event) => {
    setSpecializationFilter(event.target.value);
    filterData(searchText, event.target.value, practiceFilter);
  };

  const handlePracticeChange = (event) => {
    setPracticeFilter(event.target.value);
    filterData(searchText, specializationFilter, event.target.value);
  };

  const filterData = (searchText, specialization, practice) => {
    const filteredData = tableData.filter((item) => {
      const matchesSearch = item.Name.toLowerCase().includes(
        searchText.toLowerCase()
      );
      const matchesSpecialization = specialization
        ? item.Specialization === specialization
        : true;
      const matchesPractice = practice ? item.Practice === practice : true;
      return matchesSearch && matchesSpecialization && matchesPractice;
    });
    setData(filteredData);
  };

  return (
    <div className="w-full px-10 py-5 flex flex-col space-y-4">
      <div className="my-4">
        <h2 className="text-2xl font-bold text-left">Staffs</h2>
        <h2 className="text-2xl font-bold text-left">{type}</h2>
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

        <div className="flex gap-2 items-center">
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
        </div>
      </div>
      <div>
        <StaffTable data={data} Role={"Specialization"} />
      </div>

      {showForm && (
        <div>
          <AddStaffModal toggleForm={toggleForm} />
        </div>
      )}
    </div>
  );
};

export default Staff;
