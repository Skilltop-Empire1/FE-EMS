import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import StaffTable from "@src/components/dataTable2/StaffTable";
import AddStaffModal from "@src/modals/staffModals/AddStaffModal";
import { useFetchStaffQuery } from "@src/redux/api/staffApi";
import StaffTableSkeleton from "@src/components/dataTable2/StaffTableSkeleton";
import AddStaffModal2 from "@src/modals/staffModals/AddStaffModal2";

const StaffTypeList = [
  "doctor",
  "nurses",
  "pharmacy",
  "laboratory",
  "radiography",
];

const Staff = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [practiceFilter, setPracticeFilter] = useState("");
  const [selectedType, setSelectedType] = useState("doctor");

  // Extract `type` from query params
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  // Validate the type and set default if invalid
  const isValidType = StaffTypeList.includes(type);
  // isValidType ? type : "doctor";
  const URL = `/staff/${selectedType}/all`;

  // Fetch data based on `URL`
  const { data: fetchedData, isLoading, error } = useFetchStaffQuery(URL);
  console.log({ fetchedData, URL });
  // Update URL if `type` is invalid
  useEffect(() => {
    if (!isValidType) {
      navigate(`/app/staff?type=doctor`, { replace: true });
      setSelectedType("doctor");
    } else {
      setSelectedType(type);
    }
  }, [isValidType, navigate, type, selectedType]);

  const toggleForm = () => setShowForm((prev) => !prev);

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
        <h2 className="text-2xl font-bold text-left">{selectedType}</h2>
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

      {isLoading ? (
        <StaffTableSkeleton />
      ) : (
        <div>
          <StaffTable
            data={
              fetchedData?.[
                selectedType === "doctor"
                  ? "doctors"
                  : selectedType == "nurses"
                  ? "nurse"
                  : selectedType
              ]
            }
            Role={"Specialization"}
          />
        </div>
      )}

      <AddStaffModal2 show={true} onClose={() => {}} customer={{}} />

      {showForm && (
        <div>
          <AddStaffModal toggleForm={toggleForm} />
        </div>
      )}
    </div>
  );
};

export default Staff;
