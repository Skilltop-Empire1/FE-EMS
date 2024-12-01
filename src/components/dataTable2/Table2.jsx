import React, { useState, useEffect, useRef } from "react";
import style from "./table2.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { MoreHorizontal } from "lucide-react";

const Table2 = ({
  data = [],
  patients,
  staff,
  deleteFunction,
  refreshList,
  runToggle,
  runView,
  runInfo,
}) => {
  const [action, setAction] = useState({});
  const actionRef = useRef(null);
  //running deleting for patients

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

  //run delete
  const handleDelete = async (id) => {
    console.log("Deleting ID:", id);
    await deleteFunction(id);
    //to refresh the data after deletion
    refreshList();
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
            <th className={style.th}>Name</th>
            <th className={style.th}>Phone</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>Gender</th>
            <th className={style.th}>Date Of Birth</th>
            <th className={style.th}>Last visit Date</th>
            {/* <th className={style.th}>Department</th> */}
            <th className={style.th}>Action</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {currentData.map((item, idx) => (
            <tr key={idx} style={{ display: patients }}>
              <td
                className={style.td}
              >{`${item.firstName} ${item.lastName}`}</td>
              <td className={style.td}>{item.phone}</td>
              <td className={style.td}>{item.email}</td>
              <td className={style.td}>{item.gender}</td>
              <td className={style.td}>{item.dateOfBirth}</td>
              <td className={style.td}>{item.lastVisit?.substr(0, 10)}</td>
              {/* <td className={style.td}>{item.organization}</td> */}
              <td style={{ textAlign: "right" }} className={`${style.td} `}>
                {/* <div className={style.mamaIcons}>
                 <div className={style.actionIcons}>
                   <FaEye />
                 </div >
                 <div className={style.actionIcons}>
                  <MdModeEditOutline />
                 </div>
                 <div className={style.actionIcons} onClick={() => handleDeletePatient(item.phone)}>
                  <RiDeleteBinLine /> 
                 </div>
               </div> */}
                <div
                  onClick={() => openAction(idx)}
                  className={style.actionMama}
                >
                  <MoreHorizontal size={24} />
                </div>

                {action[idx] && (
                  <div className={`${style.action}`} ref={actionRef}>
                    <p onClick={() => runInfo(item)}>View</p>
                    <hr />
                    <p onClick={() => runView(item)}>Edit</p>
                    <hr />
                    <p>Print</p>
                    <hr />
                    <p onClick={() => runToggle(item.patId)}>Delete</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {currentData.map((item, idx) => (
            <tr key={idx} style={{ display: staff }}>
              <td
                className={style.td}
              >{`${item.firstName} ${item.lastName}`}</td>
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

export default Table2;
