import React, { useState } from 'react'
import style from './table2.module.css'
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { deletePatient } from '../../hooks/Api'; 


const Table2 = ({data=[], Role, patients, staff, deleteFunction, refreshList}) => {

  //running deleting for patients

  const handleDeletePatient = async (mobile_no) => {
    const confirmation = window.confirm('Are you sure you want to delete this patient?');
    if (confirmation) {
      try {
        const result = await deletePatient(mobile_no);
        console.log('Patient deleted:', result);
        // Refresh your data or update the UI accordingly
      } catch (error) {
        console.error('Error deleting patient:', error.message);
      }
    }
  };

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  
    // Slice the data to get only the items for the current page
    const currentData = data.slice(startIndex, endIndex);
  
    // Pagination handlers
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const goToFirstPage = () => {
      setCurrentPage(1);
    };
  
    const goToLastPage = () => {
      setCurrentPage(totalPages);
    };

    //run delete 
    const handleDelete = async (id) => {
      console.log("Deleting ID:", id);
      await deleteFunction(id);
      //to refresh the data after deletion
      refreshList()
  };
  



  return (
    <div>
   <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th className={style.th}>Name</th>
              <th className={style.th}>Email</th>
              <th className={style.th}>Gender</th>
              <th className={style.th}>Mobile Number</th>
              <th className={style.th}>Practice</th>
              <th className={style.th}>{Role}</th>
              <th className={style.th}>Action</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
           {currentData.map((item, idx) => (
             <tr key={idx} style={{display : patients}}>
                <td className={style.td}>{`${item.firstName} ${item.lastName}`}</td>
                <td className={style.td}>{item.email}</td>
                <td className={style.td}>{item.gender}</td>
                <td className={style.td}>{item.phone}</td>
                <td className={style.td}>{item.role}</td>
                <td className={style.td}>{item.organization}</td>
                <td className={style.td}>
               <div className={style.mamaIcons}>
                 <div className={style.actionIcons}>
                   <FaEye />
                 </div >
                 <div className={style.actionIcons}>
                  <MdModeEditOutline />
                 </div>
                 <div className={style.actionIcons} onClick={() => handleDeletePatient(item.mobile_no)}>
                  <RiDeleteBinLine /> 
                 </div>
               </div>
             </td>
           </tr>
           ))}
            {currentData.map((item, idx) => (
             <tr key={idx} style={{display: staff}}>
                <td className={style.td}>{`${item.firstName} ${item.lastName}`}</td>
                <td className={style.td}>{item.email}</td>
                <td className={style.td}>{item.gender}</td>
                <td className={style.td}>{item.mobileNumber}</td>
                <td className={style.td}>{item.practice}</td>
                <td className={style.td}>{item.specialization}</td>
                <td className={style.td}>
               <div className={style.mamaIcons}>
                 <div className={style.actionIcons}>
                   <FaEye />
                 </div >
                 <div className={style.actionIcons}>
                  <MdModeEditOutline />
                 </div>
                 <div className={style.actionIcons} onClick={()=>handleDelete(item.id)}>
                  <RiDeleteBinLine /> 
                 </div>
               </div>
             </td>
           </tr>
           ))}
            
          </tbody>
        </table> 

        <div className={style.pagination}>
        <button onClick={goToFirstPage} disabled={currentPage === 1} className={style.pageButton}>
          First
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className={style.pageNextButton}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className={style.pageNextButton}>
          Next
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages} className={style.pageButton}>
          Last
        </button>
      </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        </div>
  )
}

export default Table2
