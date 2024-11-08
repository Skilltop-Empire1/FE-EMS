import React, { useState } from "react";
import style from "./staffStyle.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Table from "../../../components/dataTable/Table";
import { tableHeader, tableData } from "./staffData";
import { MODAL_TYPES } from "../../../context/ModalContext";
import Button from "../../../components/Button/Button";
import AddStaff from "../../../modals/staffModals/AddStaff";
import Table2 from "../../../components/dataTable2/Table2";
import SelectFilter from "@src/components/SelectFilter";
import { Search } from "lucide-react";
import StaffTable from "@src/components/dataTable2/StaffTable";

const StaffNurse = () => {
  const item = [
    {
      specialization: "Select Specialization",
      value: "",
    },
    {
      specialization: "Surgeon",
      value: "Surgeon",
    },
    {
      specialization: "Dentist",
      value: "Dentist",
    },
    {
      specialization: "Opthamologist",
      value: "Opthamologist",
    },
  ];

  const item2 = [
    {
      specialization: "Select Practice",
      value: "",
    },
    {
      specialization: "Surgeon",
      value: "Surgeon",
    },
    {
      specialization: "Dentist",
      value: "Dentist",
    },
    {
      specialization: "Opthamologist",
      value: "Opthamologist",
    },
  ];

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
        <h2 className="text-2xl font-bold text-left">Staffsoooo</h2>
        <h2 className="text-2xl font-bold text-left">Nurse</h2>
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
          <AddStaff toggleForm={toggleForm} />
        </div>
      )}
    </div>
  );
};

export default StaffNurse;
