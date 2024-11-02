import React, { useEffect, useState } from "react";
import style from "./Department.module.css";
import { table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import Table from "../../../components/dataTable/Table";
import useFetchRequest from "../../../hooks/fetchRequestApi";
import SearchQuery from "../../../components/SearchQuery/SearchQuery";

function Department() {
  const URL = "/departments/create";

  const { data: fetchedData, loading, error } = useFetchRequest(URL);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal } = useModal();

  console.log("organisation data fetched", fetchedData);

  useEffect(() => {
    if (fetchedData && !loading && !error) {
      setData(fetchedData);
    }
  }, [fetchedData, loading, error]);

  return (
    <div className={style.container}>
      <div>
        <h3 className={style.header}>Department</h3>
      </div>
      <SearchQuery
        setQuery={setQuery}
        setData={setData}
        setCurrentPage={setCurrentPage}
        query={query}
      />
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

export default Department;
