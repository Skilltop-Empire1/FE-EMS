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
  } = useFetchResourceQuery(URL);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const { openModal } = useModal();

  useEffect(() => {
    if (fetchedData && !loading && !error) {
      setData(fetchedData?.appointments);
    }
  }, [fetchedData, loading, error]);

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
      <div>
        <h3 className={style.header}>Appointments</h3>
      </div>
      <div className={style.searchContainer}>
        <SearchQuery
          searchKey={["patName", "phone", "email"]}
          query={query}
          setData={setData}
          setQuery={setQuery}
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
      <Table
        headers={table}
        data={data}
        itemsPerPage={5}
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
