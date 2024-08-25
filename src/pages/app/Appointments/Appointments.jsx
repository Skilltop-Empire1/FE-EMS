import React, { useState } from "react";
import style from "./Appointment.module.css";
import { initialData, table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";

import Table from "../../../components/dataTable/Table";

function Organizations() {
  const [data, setData] = useState(initialData);
  const { openModal } = useModal();

  const handleSearch = (event) => {
    const filteredData = data.filter((item) =>
      item.username.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const renderRow = (item) => (
    <>
      <td>{item.patient}</td>
      <td>{item.consultingDoctor}</td>
      <td>{item.dateOfAppointment}</td>
      <td>{item.timeOfAppointment}</td>
      <td>{item.reason}</td>
      <td>{item.practice}</td>
      <td>{item.organization}</td>
    </>
  );

  return (
    <div className={style.container}>
      <div>
        <h3 className={style.header}>Appointments</h3>
      </div>
      <div className={style.searchContainer}>
        <div>
          <select name="" id=""></select>
        </div>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Enter name to search"
        />
        <input type="text" />
        <button onClick={() => openModal(MODAL_TYPES.TYPE4)} type="submit">
          Add Appointment
        </button>
      </div>
      <Table
        headers={table}
        data={data}
        itemsPerPage={5}
        renderRow={renderRow}
      />
    </div>
  );
}

export default Organizations;
