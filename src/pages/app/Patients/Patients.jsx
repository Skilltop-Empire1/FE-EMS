import React, { useState, useEffect } from "react";
import style from "./patientStyle.module.css";
import Button from "../../../components/Button/Button";
import Table2 from "../../../components/dataTable2/Table2";
import AddPatients from "../../../modals/patientsModals/AddPatients";
import { listPatients, deletePatient } from "../../../hooks/Api";
import ConfirmationModal from "@src/modals/ConfirmationModal/ConfirmationModal";
import ViewPatients from "@src/modals/patientsModals/ViewPatients";

const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

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


  const randomUsers = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      gender: "Male",
      mobileNumber: "123-456-7890",
      practice: "Dentistry",
      role: "Doctor",
      action: "View"
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      gender: "Female",
      mobileNumber: "098-765-4321",
      practice: "Pediatrics",
      role: "Nurse",
      action: "Edit"
    },
    {
      name: "Robert Johnson",
      email: "robertj@example.com",
      gender: "Male",
      mobileNumber: "456-123-7890",
      practice: "Orthopedics",
      role: "Surgeon",
      action: "Delete"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    },
    {
      name: "Emily Clark",
      email: "emilyc@example.com",
      gender: "Female",
      mobileNumber: "321-654-9870",
      practice: "Neurology",
      role: "Assistant",
      action: "View"
    }
  ];

  // setPatients(randomUsers)
  
  

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
        <Table2
          Role={"Organization"}
          data={randomUsers}
          staff={"none"}
          patients={""}
          deleteFunction={deletePatient}
          refreshList={listPatients}
          runToggle={toggleconfirm}
          runView={toggleView}
        />
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