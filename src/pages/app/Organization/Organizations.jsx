import React, { useEffect, useState } from "react";
import style from "./organisation.module.css";
import { initialData, table } from "./data";
import { MODAL_TYPES, useModal } from "../../../context/ModalContext";
import ViewIcon from "../../../assets/ViewIcon";
import EditIcon from "../../../assets/EditIcon";
import DeleteIcon from "../../../assets/DeleteIcon";

function Organizations() {
  const [data, setData] = useState(initialData);
  const { openModal } = useModal();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      console.log("clicked");
      setCurrentPage(pageNumber);
    }
  };

  const handleEdit = (item) => {
    openModal(MODAL_TYPES.TYPE5, item);
    console.log("Edit action for id:", item);
  };

  const handleView = (id) => {
    console.log("View action for id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete action for id:", id);
  };

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
      <table className={style.table}>
        <thead>
          <tr>
            {table.map((header, index) => (
              <td key={index}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.zipCode}</td>
              <td className={style.buttonRow}>
                <button
                  onClick={() => handleView(item.id)}
                  className={style.viewButton}
                >
                  <ViewIcon />
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className={style.editButton}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className={style.deleteButton}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={style.pageButton}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={style.pageNextButton}
        >
          Previous
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={style.pageNextButton}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={style.pageButton}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Organizations;
