import React, { useEffect, useState } from "react";
import style from "./organisation.module.css";
import { initialData, table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import ViewIcon from "../../../assets/ViewIcon";
import EditIcon from "../../../assets/EditIcon";
import DeleteIcon from "../../../assets/DeleteIcon";
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

  return (
    <div className={style.container}>
      <div>
        <h3 className={style.header}>Organizations Name</h3>
      </div>
      <div className={style.searchContainer}>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Enter name to search"
        />
        <button onClick={() => openModal(MODAL_TYPES.TYPE4)} type="submit">
          Add organisation
        </button>
      </div>
      <Table headers={table} data={data} modalType={MODAL_TYPES.TYPE4} />
    </div>
  );
}

export default Organizations;
