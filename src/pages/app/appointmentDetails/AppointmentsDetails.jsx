import Table from "@src/components/dataTable/Table";
import SearchQuery from "@src/components/searchQuery/SearchQuery";
import { MODAL_TYPES, useModal } from "@src/context/ModalContext";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { table } from "./data";
import style from "./AppointmentDetails.module.css";

function AppointmentsDetails() {
  const URL = "/appointment";
  const navigate = useNavigate();

  const {
    data: fetchedData,
    isLoading: loading,
    error,
    refetch, // Used for retrying fetching data
  } = useFetchResourceQuery(URL);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState(""); // Search query state
  const { openModal } = useModal();

  useEffect(() => {
    if (fetchedData && !loading && !error) {
      setData(fetchedData?.appointments);
    }
  }, [fetchedData, loading, error]);

  // Handle search change (client-side filtering)
  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
    if (fetchedData?.appointments) {
      const filteredData = fetchedData.appointments.filter(
        (item) =>
          item.patName.toLowerCase().includes(newQuery.toLowerCase()) ||
          item.phone.toLowerCase().includes(newQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(newQuery.toLowerCase())
      );
      setData(filteredData);
    }
  };

  // Render each row in the table
  const renderRow = (item) => (
    <>
      <td>{item.patName}</td>
      <td>{item.phone}</td>
      <td>{item.staff.lastName}</td>
      <td>{item.appointDate}</td>
      <td>{item.appointTime}</td>
      <td>{item.reason}</td>
      <td>{item.department.name}</td>
    </>
  );

  return (
    <div className={style.container}>
      <div className={style.nameContainer}>
        <h3 className={style.header}>Appointments</h3>
      </div>
      <div className={style.searchContainer}>
        <SearchQuery
          searchKey={["patName", "phone", "email"]}
          query={query}
          setData={setData}
          setQuery={handleSearchChange} // Pass the search change handler
          fetchedData={fetchedData?.appointments}
        />
        <div>
          <button
            className={style.staffNavButton}
            onClick={() => navigate("/app/staff")}
            type="button"
          >
            Add Staff
          </button>
          <button onClick={() => openModal(MODAL_TYPES.TYPE6)} type="button">
            Add Appointment
          </button>
        </div>
      </div>

      {/* Error handling UI */}
      {error && (
        <div className={style.errorContainer}>
          <p className={style.errorMessage}>
            There was an error loading the data.
          </p>
          <button onClick={refetch} type="button">
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && <div>Loading appointments...</div>}

      {/* Table rendering */}
      <Table
        headers={table}
        data={data}
        renderRow={renderRow}
        editModal={MODAL_TYPES.TYPE7}
        viewModal={MODAL_TYPES.TYPE10}
        deleteModal={MODAL_TYPES.TYPE11}
        isLoading={loading}
        error={error}
        getId={(item) => item.appointId}
      />
    </div>
  );
}

export default AppointmentsDetails;
