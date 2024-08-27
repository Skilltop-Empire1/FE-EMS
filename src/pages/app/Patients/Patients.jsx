import React, {useState} from 'react'
import style from './patientStyle.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Button from '../../../components/Button/Button';
import Table2 from '../../../components/dataTable2/Table2';
import { tableHeader, tableData } from './patientsData';
import AddPatients from '../../../modals/patientsModals/AddPatients';

const Staff = () => {

  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState(tableData);
  const [searchText, setSearchText] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [practiceFilter, setPracticeFilter] = useState('');
  // const [stayOpen, setStayOpen] = useState(false);

  const keepOpen = ()=> {
      setShowForm(!showForm)
  }

 

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    filterData(event.target.value, specializationFilter, practiceFilter);
  };


  const filterData = (searchText, specialization, practice) => {
    const filteredData = tableData.filter((item) => {
      const matchesSearch = item.Name.toLowerCase().includes(searchText.toLowerCase());
      return matchesSearch ;
    });
    setData(filteredData);
  };

  // Step 2: Toggle form visibility when button is clicked
  const toggleForm = () => {
    setShowForm(!showForm);
    
  };

  return (
    <div className={style.body}>
      <div>
        <div className={style.top}>
        <h2 className={style.header}>Patients</h2>
        <div className={style.sticky}>
          <Button onClick={toggleForm} disabled={showForm} add={'Add Patient'}/>
        </div>
        </div>
      </div>
      <div className={style.info}>
        <div >
          <input type="text" placeholder='Search Patient' className={style.filter} onChange={handleSearch}/> 
        </div>
       <Table2 Role={'Organization'} data={data}/>
      </div>

      { showForm &&
        <div>
        <AddPatients toggleForm={toggleForm} />
      </div>
      }
    </div>
  )
}

export default Staff

