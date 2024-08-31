import React, { useState } from "react";
import style from "./organisation.module.css";
import { initialData, table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import Table from "../../../components/dataTable/Table";

function Organizations() {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal } = useModal();

  const handleSearch = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setQuery(value);

    if (!value) {
      setData(initialData);
      return;
    }

    const filteredData = initialData.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
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
          value={query}
        />
        <button onClick={() => openModal(MODAL_TYPES.TYPE4)} type="button">
          Add organisation
        </button>
      </div>
      <Table headers={table} data={data} modalType={MODAL_TYPES.TYPE4} />
    </div>
  );
}

export default Organizations;
