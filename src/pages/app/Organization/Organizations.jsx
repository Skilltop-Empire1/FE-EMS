import React, { useEffect, useState } from "react";
import style from "./organisation.module.css";
import { table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import Table from "../../../components/dataTable/Table";
import { useFetchResourceQuery } from "../../../redux/api/departmentApi";
import { useNavigate } from "react-router-dom";
import SearchQuery from "../../../components/searchQuery/SearchQuery";

function Organizations() {
  const URL = "/department/list";
  const navigate = useNavigate();

  const { data: fetchedData, isLoading, error } = useFetchResourceQuery(URL);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const { openModal } = useModal();

  useEffect(() => {
    if (fetchedData && !isLoading && !error) {
      setData(fetchedData);
    }
  }, [fetchedData, isLoading, error]);

  const handleEdit = (item) => {
    openModal(MODAL_TYPES.TYPE5, item);
  };

  return (
    <div className={style.container}>
      <div className={style.departmentName}>
        <h3 className={style.header}>Department Name</h3>
      </div>
      <div className={style.searchContainer}>
        <SearchQuery
          searchKey={["name", "location", "specialty", "equipment", "hod"]}
          query={query}
          setData={setData}
          setQuery={setQuery}
          fetchedData={fetchedData}
        />
        <div>
          <button
            className={style.staffNavButton}
            onClick={() => navigate("/staff")}
            type="button"
          >
            Add Staff
          </button>
          <button onClick={() => openModal(MODAL_TYPES.TYPE4)} type="button">
            Add Department
          </button>
        </div>
      </div>
      <Table
        headers={table}
        data={data}
        editModal={MODAL_TYPES.TYPE5}
        viewModal={MODAL_TYPES.TYPE8}
        deleteModal={MODAL_TYPES.TYPE9}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        getId={(item) => item.deptId}
      />
    </div>
  );
}

export default Organizations;
