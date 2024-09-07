import React, { useState, useEffect } from "react";
import style from "./patientStyle.module.css";
import Button from "../../../components/Button/Button";
import Table2 from "../../../components/dataTable2/Table2";
import AddPatients from "../../../modals/patientsModals/AddPatients";
import { listPatients, deletePatient } from "../../../hooks/Api";

const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleForm2 = () => {
    let confirmation = window.confirm('Cancel Patient details ?')
    if (confirmation) setShowForm(!showForm);
  };



  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const PatientData = await listPatients();
        setPatients(PatientData);
        setFilteredPatients(PatientData); // Initialize filteredPatients with the full dataset
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    filterData(searchValue);
  };

  const filterData = (searchValue) => {
    const filteredData = patients.filter((item) => {
      const matchesSearch = item.firstname.toLowerCase().includes(
        searchValue.toLowerCase()
      );
      return matchesSearch;
    });
    setFilteredPatients(filteredData);
  };

  return (
    <div className={style.body}>
      <div>
        <div className={style.top}>
          <h2 className={style.header}>Patients</h2>
          <div className={style.sticky}>
            <Button
              onClick={toggleForm}
              disabled={showForm}
              add={"Add Patient"}
            />
          </div>
        </div>
      </div>
      <div className={style.info}>
        <div>
          <input
            type="text"
            placeholder="Search Patient"
            className={style.filter}
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <Table2 Role={"Organization"} data={filteredPatients} staff={'none'} patients={''} deleteFunction={deletePatient} refreshList={listPatients}/>
      </div>

      {showForm && (
        <div>
          <AddPatients toggleForm={toggleForm2} />
        </div>
      )}
    </div>
  );
};

export default Patients;