import React, { useEffect, useState } from "react";
import style from "./Appointment.module.css";
import { table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import Table from "../../../components/dataTable/Table";
import { useFetchResourceQuery } from "../../../redux/api/departmentApi";
import { useNavigate } from "react-router-dom";
import SearchQuery from "../../../components/searchQuery/SearchQuery";

function Appointment() {
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
      <td>{item.email}</td>
      <td>{item.gender}</td>
      <td>{item.dateOfBirth}</td>
      <td>{item.updatedAt}</td>
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
            onClick={() => navigate("/staff")}
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

export default Appointment;
