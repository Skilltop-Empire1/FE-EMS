import React, { useState, useRef, useEffect } from "react";
import style from "./table3.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { deletePatient } from "../../hooks/Api";
import { MoreHorizontal } from "lucide-react";
import PopMenu from "../dataTable2/PopMenu";

const Table3 = ({
  data = [],
  patients,
  staff,
  deleteFunction,
  refreshList,
  runToggle,
  runView,
  update,
  runInfo,
}) => {
  const [action, setAction] = useState({});
  const actionRef = useRef(null);
  //running deleting for patients

  const handleDeletePatient = async (phone) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (confirmation) {
      try {
        const result = await deletePatient(phone);
        console.log("Patient deleted:", result);
        // Refresh your data or update the UI accordingly
      } catch (error) {
        console.error("Error deleting patient:", error.message);
      }
    }
  };

  //close action div
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setAction({}); // Close all action divs
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //set up the table pages
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the index of the first and last item on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  // Slice the data to get only the items for the current page
  const currentData = data.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const openAction = (index) => {
    setAction((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific row by index
    }));
  };

  return (
    <div>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th className={style.th}>Patient Name</th>
            <th className={style.th}>Payment Method</th>
            <th className={style.th}>Payment Provider</th>
            <th className={style.th}>Amount</th>
            <th className={style.th}>Outstanding balance</th>
            <th className={style.th}>payment Date</th>
            <th className={style.th}>Payment Status</th>
            <th className={style.th}>Action</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {currentData.map((item, idx) => (
            <tr key={idx} style={{ display: patients }}>
              <td className={style.td}>{`${item.patName}`}</td>
              <td className={style.td}>{item.paymentMethod}</td>
              <td className={style.td}>{item.paymentProvider}</td>
              <td className={style.td}>{item.amount}</td>
              <td className={style.td}>{item.outstandBal}</td>
              <td className={style.td}>{item.createdAt.substr(0, 10)}</td>
              <td className={style.td}>{item.paymentStatus}</td>
              <td className={`${style.td} flex justify-center`}>
              <PopMenu
                  onView={() => runInfo(item)}
                  onEdit={() => runView(item)}
                  onDelete={() => runToggle(item.accId)}
                  hide1='hidden'
                  hide2='hidden'
                />
              </td>
            </tr>
          ))}
          {currentData.map((item, idx) => (
            <tr key={idx} style={{ display: staff }}>
              <td className={style.td}>{`${item.patName} ${item.lastName}`}</td>
              <td className={style.td}>{item.email}</td>
              <td className={style.td}>{item.gender}</td>
              <td className={style.td}>{item.mobileNumber}</td>
              <td className={style.td}>{item.practice}</td>
              <td className={style.td}>{item.specialization}</td>
              <td className={style.td}>
                <div className={style.mamaIcons}>
                  <div className={style.actionIcons}>
                    <FaEye />
                  </div>
                  <div className={style.actionIcons}>
                    <MdModeEditOutline />
                  </div>
                  <div
                    className={style.actionIcons}
                    onClick={() => handleDelete(item.id)}
                  >
                    <RiDeleteBinLine />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={style.identifier}>
        <span>
          {" "}
          Showing {startIndex + 1} to{" "}
          {currentPage === totalPages
            ? data.length
            : currentPage * itemsPerPage}{" "}
          of {data.length} entries
        </span>
        <div className={`${style.pagination}`}>
          <button
            onClick={() => goToPage(1)}
            className={style.pageButton}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>

          <button
            onClick={() => goToPage(currentPage - 1)}
            className={style.pageButton}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={currentPage === index + 1 ? style.pageButton : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            className={style.pageButton}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>

          <button
            onClick={() => goToPage(totalPages)}
            className={style.pageButton}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table3;
