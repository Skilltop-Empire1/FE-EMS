import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import style from "./Table.module.css";
import Loader from "../loader/Loader";
import { MoreHorizontal } from "lucide-react";

const ActionCell = ({ item, onView, onEdit, onDelete }) => (
  <td className={style.buttonRow}>
    <ul>
      <li onClick={() => onView(item.id)}>View</li>
      <hr />
      <li onClick={() => onEdit(item.id)}>Edit</li>
      <hr />
      <li onClick={() => onPrint(item.id)}>Print</li>
      <hr />
      <li onClick={() => onInvite(item.id)}>Invite</li>
      <hr />
      <li onClick={() => onDelete(item.id)}>Delete</li>
    </ul>
  </td>
);

function Table({
  headers,
  data,
  itemsPerPage = 5,
  modalType,
  renderRow,
  isLoading,
  error,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionCell, setActiveActionCell] = useState(null);
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
    console.log(item);
    console.log("Edit action for id:", item.id);
  };

  const handleView = (id) => {
    console.log("View action for id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete action for id:", id);
  };

  const handlePrint = (id) => {
    console.log("Delete action for id:", id);
  };

  const handleInvite = (id) => {
    console.log("Delete action for id:", id);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error.message}</p>}
      <table className={style.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td key={index}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            currentItems.map((item) => (
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
                <div
                  className={style.ActionCell}
                  onClick={() =>
                    setActiveActionCell(
                      activeActionCell === item.id ? null : item.id
                    )
                  }
                >
                  <div>
                    <MoreHorizontal size={24} color="currentColor" />
                  </div>
                  {activeActionCell === item.id && (
                    <ActionCell
                      item={item}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onPrint={handlePrint}
                      onInvite={handleInvite}
                    />
                  )}
                </div>
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
