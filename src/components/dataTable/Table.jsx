import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import ViewIcon from "../../assets/ViewIcon";
import EditIcon from "../../assets/EditIcon";
import DeleteIcon from "../../assets/DeleteIcon";

import style from "./Table.module.css";

const ActionCell = ({ item, onView, onEdit, onDelete }) => (
  <td className={style.buttonRow}>
    <button onClick={() => onView(item.id)} className={style.viewButton}>
      <ViewIcon />
    </button>
    <button onClick={() => onEdit(item)} className={style.editButton}>
      <EditIcon />
    </button>
    <button onClick={() => onDelete(item.id)} className={style.deleteButton}>
      <DeleteIcon />
    </button>
  </td>
);

function Table({ headers, data, itemsPerPage = 5, modalType, renderRow }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal } = useModal();

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEdit = (item) => {
    openModal(modalType, item);
  };

  const handleView = (id) => {
    console.log("View action for id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete action for id:", id);
  };

  return (
    <>
      <table className={style.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td key={index}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {renderRow ? (
                renderRow(item)
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipCode}</td>
                </>
              )}
              <ActionCell
                item={item}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
    </>
  );
}

export default Table;
