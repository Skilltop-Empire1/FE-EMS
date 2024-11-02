import React from "react";
import { MODAL_TYPES, useModal } from "../../context/ModalContext";
import style from "./OrganisationModals.module.css";

const ViewOrganization = () => {
  const { closeModal, openModal, modalProps: organization } = useModal();
  console.log("viewOrganization", organization);

  const handleEdit = () => {
    openModal(MODAL_TYPES.TYPE5, organization);
  };

  // Inline style for inputs
  const inputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.header}>
        <h3>View Department Details</h3>
      </div>
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div>
            <label>Department Name:</label>
            <input
              type="text"
              value={organization.name}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={organization.location}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>HOD:</label>
            <input
              type="text"
              value={organization.hod}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Specialty:</label>
            <input
              type="text"
              value={organization.specialty}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Number of Staff:</label>
            <input
              type="number"
              value={organization.noOfStaff}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Number of Patients:</label>
            <input
              type="number"
              value={organization.noOfPatient}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Contact Number:</label>
            <input
              type="tel"
              value={organization.deptContact}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Bed Capacity:</label>
            <input
              type="number"
              value={organization.bedCapacity}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Department Budget:</label>
            <input
              type="number"
              value={organization.deptBudget}
              disabled
              style={inputStyle}
            />
          </div>
          <div>
            <label>Equipment:</label>
            <input
              type="text"
              value={organization.equipment}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label>Operation Hour:</label>
            <input
              type="text"
              value={organization.operationHr}
              disabled
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewOrganization;
