import React, { useState } from 'react'
import style from './table2.module.css'
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { deletePatient } from '../../hooks/Api'; 

const Table2 = ({data = [], patients, staff, deleteFunction, refreshList, runToggle, runView}) => {

    const [action, setAction] = useState({})
  //running deleting for patients

  const handleDeletePatient = async (phone) => {
    const confirmation = window.confirm('Are you sure you want to delete this patient?');
    if (confirmation) {
      try {
        const result = await deletePatient(phone);
        console.log('Patient deleted:', result);
        // Refresh your data or update the UI accordingly
      } catch (error) {
        console.error('Error deleting patient:', error.message);
      }
    }
  };


    //set up the table pages
    const itemsPerPage = 15;
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
      refreshList()
  };
  


  const openAction = (index) => {
    setAction((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific row by index
    }));
  };


  const generatePagination = () => {
    const pages = [];

    // Go back two pages
    if (currentPage > 2) {
      pages.push(currentPage - 2);
    }

    // Go back one page
    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }

    // First two pages
    if (currentPage > 2) {
      pages.push(1, 2);
      pages.push('...');
    }

    // Current page and next 3 pages (if applicable)
    for (let i = currentPage; i <= Math.min(totalPages, currentPage + 3); i++) {
      pages.push(i);
    }

    // Go forward one page (if not the last)
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    // Go forward two pages (if applicable)
    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 2);
    }

    return pages;
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
              <th className={style.th}>Department</th>
              <th className={style.th}>Action</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
           {currentData.map((item, idx) => (
             <tr key={idx} style={{display : patients}}>
                <td className={style.td}>{`${item.name}`}</td>
                <td className={style.td}>{item.mobileNumber}</td>
                <td className={style.td}>{item.email}</td>
                <td className={style.td}>{item.gender}</td>
                <td className={style.td}>{item.gender}</td>
                <td className={style.td}>{item.role}</td>
                <td className={style.td}>{item.organization}</td>
                <td className={`${style.td} `}>
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
              <div  onClick={() => openAction(idx)} className={style.actionMama}>
              ...
              </div>

              { action[idx] && <div className={`${style.action}`}>
                <p>View</p>
                <hr />
                <p onClick={runView}>Edit</p>
                <hr />
                <p>Print</p>
                <hr />
                <p onClick={runToggle}>Delete</p>
               </div>}
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

        <div className={style.identifier}>
        <span>Page {currentPage} of {totalPages}</span>
        <div className={style.pagination}>
            {generatePagination().map((page, idx) => (
              <button
                key={idx}
                onClick={() => page !== '...' && goToPage(page)}
                disabled={page === currentPage || page === '...'}
                className={style.pageButton}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
        </div>
  )
}

export default Table2
