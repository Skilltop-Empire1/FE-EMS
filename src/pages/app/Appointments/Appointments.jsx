import React, { useState } from "react";
import style from "./Appointment.module.css";
import { initialData, table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import Table from "../../../components/dataTable/Table";
import SelectionFilter from "../../../components/selectionFilter/SelectionFilter";

function Appointment() {
  const [data, setData] = useState(initialData);
  const { openModal } = useModal();

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
          <SelectionFilter
            data={data}
            setData={setData}
            field="practice"
            query="practice"
          />
          <SelectionFilter
            data={data}
            setData={setData}
            field="organization"
            query="organization"
          />
          <SelectionFilter
            data={data}
            setData={setData}
            field="patient"
            query="patient"
          />
        </div>

        <button onClick={() => openModal(MODAL_TYPES.TYPE6)} type="button">
          Add Appointment
        </button>
      </div>

      <Table
        headers={table}
        data={data}
        itemsPerPage={5}
        renderRow={renderRow}
        modalType={MODAL_TYPES.TYPE6}
      />
    </div>
  );
}

export default Appointment;
