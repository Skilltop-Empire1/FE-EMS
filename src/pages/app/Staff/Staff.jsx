import React, {useState} from 'react'
import style from './staffStyle.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Table from '../../../components/dataTable/Table';
import { tableHeader, tableData } from './staffData';
import { MODAL_TYPES } from '../../../context/ModalContext';
import Button from '../../../components/Button/Button';
import AddStaff from '../../../modals/staffModals/AddStaff';
import Table2 from '../../../components/dataTable2/Table2';


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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    filterData(event.target.value, specializationFilter, practiceFilter);
  };

  const handleSpecializationChange = (event) => {
    setSpecializationFilter(event.target.value);
    filterData(searchText, event.target.value, practiceFilter);
  };

  const handlePracticeChange = (event) => {
    setPracticeFilter(event.target.value);
    filterData(searchText, specializationFilter, event.target.value);
  };

  const filterData = (searchText, specialization, practice) => {
    const filteredData = tableData.filter((item) => {
      const matchesSearch = item.Name.toLowerCase().includes(searchText.toLowerCase());
      const matchesSpecialization = specialization ? item.Specialization === specialization : true;
      const matchesPractice = practice ? item.Practice === practice : true;
      return matchesSearch && matchesSpecialization && matchesPractice;
    });
    setData(filteredData);
  };

  return (
    <div className={style.body}>
      <div>
        <div className={style.top}>
        <h2 className={style.header}>Staffs</h2>
        <div className={style.sticky}>
          <Button onClick={toggleForm} disabled={showForm} add={'Add Staff'}/>
        </div>
        </div>
      </div>
      <div className={style.info}>
        <div >
          <input type="text" placeholder='Name' className={style.filter} onChange={handleSearch}/> 
          <select
            name="Specialization"
            className={style.filter}
            value={specializationFilter}
            onChange={handleSpecializationChange}
          >
            <option value="">Select Specialization</option>
            <option value="Dentist">Dentist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Dermatologist">Dermatologist</option>
          </select>
          <select
            name="Practice"
            className={style.filter}
            value={practiceFilter}
            onChange={handlePracticeChange}
          >
            <option value="">Select Practice</option>
            <option value="Dentist">Dentist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Dermatologist">Dermatologist</option>
          </select>
        </div>
        <Table2 data={data} Role={'Specialization'}/>
        {/* <Table headers={tableHeader} data={tableData} itemsPerPage={6} renderRow={renderRow} modalType={MODAL_TYPES.TYPE4}/> */}

      </div>

      { showForm &&
        <div>
          <AddStaff toggleForm={toggleForm} />
        </div>
      }
    </div>
  )
}

export default Staff

