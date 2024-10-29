import React, { useState, useEffect } from "react";
import style from "./patientStyle.module.css";
import Button from "../../../components/Button/Button";
import Table2 from "../../../components/dataTable2/Table2";
import AddPatients from "../../../modals/patientsModals/AddPatients";
import { listPatients, deletePatient } from "../../../hooks/Api";
import ConfirmationModal from "@src/modals/ConfirmationModal/ConfirmationModal";
import ViewPatients from "@src/modals/patientsModals/ViewPatients";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";

const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  //fetching the patient data
  const { data: patientData, error: patientError, isLoading: patientLoading } = useFetchResourceQuery("/api/v1/patient/list");

  // Unified toggleForm function with confirmation when closing
  const toggleForm = () => {
    setShowForm(!showForm);
  }
  const toggleconfirm = () => {
    setShowConfirm(!showConfirm);
  };
   const toggleView = () => {
    setShowView(!showView);
  };



 const handleSearch = (event) => {
  const searchValue = event.target.value;
  setSearchText(searchValue);
  if (searchValue === "") {
    setFilteredPatients(patients); // Reset filtered list when search is cleared
  } else {
    filterData(searchValue);
  }
};
  
// filter data
  const filterData = (searchValue) => {
    const filteredData = randomUsers.filter((item) => {
      // Check if firstname exists
      const matchesSearch = item?.name?.toLowerCase().includes(
        searchText.toLowerCase()
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
         
        </div>
      </div>
      <div className={style.info}>
        <div>
          <div className={style.work}>
              <input
                type="text"
                placeholder="Search Patient"
                className={style.filter}
                value={searchText}
                onChange={handleSearch}
              />
              <div className={style.sticky}>
                  <Button
                    onClick={toggleForm}
                    disabled={showForm}
                    add={"Add Patient"}
                  />
                </div>
          </div>
        </div>
        {patientLoading ? (
          <div>
            Loading...
          </div>
        )
          :
        patientError ? (
          <div>Failed to Load patient data</div>
        ) 
        :
          (patientData.length > 0 ? (
          <Table2
          Role={"Organization"}
          data={patientData}
          staff={"none"}
          patients={""}
          deleteFunction={deletePatient}
          refreshList={listPatients}
          runToggle={toggleconfirm}
          runView={toggleView}
        />) :
          <div>no data yet</div>
     ) }
      </div>

      {showForm && (
        <div>
          <AddPatients toggleForm={toggleForm} />
        </div>
      )}

        { showConfirm && (
          <ConfirmationModal page={'Patient'} toggle={toggleconfirm}/>
        )}

        {showView && (
          <div>
            <ViewPatients toggleForm={toggleView}/>
          </div>
        )}
    </div>
  );
};

export default Patients;