import React, {useState, useEffect} from 'react'
import style from './staffStyle.module.css'
// import { tableHeader, tableData } from './staffData';
import { listStaff, deleteStaff, searchStaff } from '../../../hooks/Api';
import Button from '../../../components/Button/Button';
import AddStaff from '../../../modals/staffModals/AddStaff';
import Table2 from '../../../components/dataTable2/Table2';
import SelectFilter from '../../../components/SelectFilter';


const Staff = () => {

  const specializationOptions = [
    { specialization: 'Select Specialization', value: '' },
    { specialization: 'Surgeon', value: 'Surgeon' },
    { specialization: 'Dentist', value: 'Dentist' },
    { specialization: 'Ophthalmologist', value: 'Ophthalmologist' },
  ];

  const practiceOptions = [
    { specialization: 'Select Practice', value: '' },
    { specialization: 'Surgeon', value: 'Surgeon' },
    { specialization: 'Dentist', value: 'Dentist' },
    { specialization: 'Ophthalmologist', value: 'Ophthalmologist' },
  ];

  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [practiceFilter, setPracticeFilter] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await listStaff();
        setPatients(patientData);
        setFilteredPatients(patientData); // Initialize filtered data
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    };

    fetchPatients();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  //confirmation to close the modal
  const toggleForm2 = () => {
    let confirmation = window.confirm('Cancel staff details ?')
    if (confirmation) setShowForm(!showForm);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    filterData(searchValue, specializationFilter, practiceFilter);
  };

  const handleSpecializationChange = (event) => {
    const specializationValue = event.target.value;
    setSpecializationFilter(specializationValue);
    filterData(searchText, specializationValue, practiceFilter);
  };

  const handlePracticeChange = (event) => {
    const practiceValue = event.target.value;
    setPracticeFilter(practiceValue);
    filterData(searchText, specializationFilter, practiceValue);
  };

  const filterData = (searchText, specialization, practice) => {
    const filteredData = patients.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesSpecialization = specialization ? item.specialization === specialization : true;
      const matchesPractice = practice ? item.practice === practice : true;
      return matchesSearch && matchesSpecialization && matchesPractice;
    });
    setFilteredPatients(filteredData);
  };

  //Delete staff

//   const handleDelete = async (i) => {
//     await deleteStaff(id);
//     searchStaff(); // Refresh the staff list after deletion
// };


  return (
    <div className={style.body}>
      <div>
        <div className={style.top}>
          <h2 className={style.header}>Staff</h2>
          <div className={style.sticky}>
            <Button onClick={toggleForm} disabled={showForm} add={'Add Staff'} />
          </div>
        </div>
      </div>
      <div className={style.info}>
        <div>
          <input type="text" placeholder="Name" className={style.filter} onChange={handleSearch} />
          <SelectFilter onChange={handleSpecializationChange} data={specializationOptions} Filter={specializationFilter} />
          <SelectFilter onChange={handlePracticeChange} data={practiceOptions} Filter={practiceFilter} />
        </div>
        <Table2 data={filteredPatients} Role={'Specialization'} staff={''} patients={'none'} deleteFunction={deleteStaff} refreshList={listStaff}/>
      </div>

      {showForm && (
        <div>
          <AddStaff toggleForm={toggleForm2} />
        </div>
      )}
    </div>
  );
};

export default Staff;