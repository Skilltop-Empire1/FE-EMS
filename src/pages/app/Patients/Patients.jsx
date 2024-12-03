import React, { useState, useEffect } from "react";
import style from "./patientStyle.module.css";
import Button from "../../../components/Button/Button";
import Table2 from "../../../components/dataTable2/Table2";
import AddPatients from "../../../modals/patientsModals/AddPatients";
import ConfirmationModal from "src/modals/ConfirmationModal/ConfirmationModal";
import ViewPatients from "src/modals/patientsModals/ViewPatients";
import StaffTableSkeleton from "@src/components/dataTable2/StaffTableSkeleton";
import {
  useFetchResourceQuery,
  useDeleteResourceMutation,
} from "src/redux/api/departmentApi";
import PatientInfo from "src/modals/patientsModals/PatientInfo";
import SearchQuery from "@src/components/searchQuery/SearchQuery";

const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [patientToUpdate, setPatientToUpdate] = useState(null);
  const [patientToView, setPatientToView] = useState(null);

  const {
    data: patientData = [],
    error: patientError,
    isLoading: patientLoading,
  } = useFetchResourceQuery("/patient/list");
  const [deleteResource] = useDeleteResourceMutation();

  useEffect(() => {
    // Initialize filteredPatients with patientData when data is fetched
    setFilteredPatients(patientData);
  }, [patientData]);

  const handlePatientDelete = (id) => {
    setPatientToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteResource(`/patient/delete/${patientToDelete}`).unwrap();
      alert("Patient details deleted successfully");
      setShowConfirm(false);
      setFilteredPatients(
        filteredPatients.filter((patient) => patient.id !== patientToDelete)
      );
    } catch (err) {
      console.error("Failed to delete patient details:", err);
    }
  };

  const toggleForm = () => setShowForm(!showForm);
  const toggleConfirm = () => setShowConfirm(!showConfirm);
  const toggleView = (patient) => {
    setPatientToUpdate(patient);
    setShowView(!showView);
  };
  const toggleInfo = (patient) => {
    setPatientToView(patient);
    setShowInfo(!showInfo);
  };

  // Function to update filteredPatients based on search
  const handleSearch = (query) => {
    setSearchText(query);

    if (query === "") {
      setFilteredPatients(patientData);
    } else {
      const filteredData = patientData.filter((patient) =>
        patient.firstName?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPatients(filteredData);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.top}>
        <h2 className={style.header}>Patients</h2>
      </div>
      <div className={style.info}>
        <div className={style.work}>
          {/* Integrating the SearchQuery component */}
          <SearchQuery
            setQuery={handleSearch}
            query={searchText}
            setData={setFilteredPatients}
            fetchedData={patientData}
            searchKey={["firstName"]}
          />
          <Button onClick={toggleForm} disabled={showForm} add="Add Patient" />
        </div>

        {patientLoading ? (
          <div><StaffTableSkeleton/></div>
        ) : patientError ? (
          <div>Failed to Load patient data</div>
        ) : filteredPatients.length > 0 ? (
          <Table2
            Role="Organization"
            data={filteredPatients}
            staff="none"
            patients=""
            runToggle={handlePatientDelete}
            runView={toggleView}
            runInfo={toggleInfo}
          />
        ) : (
          <div>No data yet</div>
        )}
      </div>

      {showForm && <AddPatients toggleForm={toggleForm} />}
      {showConfirm && (
        <ConfirmationModal
          page="Patient"
          toggle={toggleConfirm}
          runDelete={handleDelete}
        />
      )}
      {showView && (
        <ViewPatients toggleForm={toggleView} patient={patientToUpdate} />
      )}
      {showInfo && (
        <PatientInfo toggleInfo={toggleInfo} infoData={patientToView} />
      )}
    </div>
  );
};

export default Patients;
