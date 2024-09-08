import React, { useEffect, useState } from "react";
import style from "./organisation.module.css";
import { table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import Table from "../../../components/dataTable/Table";
import useFetchRequest from "../../../hooks/fetchRequestApi";

function Organizations() {
  const {
    data: fetchedData,
    loading,
    error,
  } = useFetchRequest(
    " https://be-ems-production-2721.up.railway.app/api/v1/organization/list"
  );
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal } = useModal();

  useEffect(() => {
    if (fetchedData && !loading && !error) {
      setData(fetchedData);
    }
  }, [fetchedData, loading, error]);

  const handleSearch = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setQuery(value);

    if (!value) {
      setData(fetchedData);
      console.log("Fetched data", fetchedData);
      return;
    }

    const filteredData = fetchedData.filter((item) =>
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
      <Table
        headers={table}
        data={data}
        modalType={MODAL_TYPES.TYPE4}
        isLoading={loading}
        error={error}
      />
    </div>
  );
}

export default Organizations;
