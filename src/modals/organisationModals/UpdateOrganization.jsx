import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import style from "./OrganisationModals.module.css";
import { useEditResourceMutation } from "../../redux/api/departmentApi";

const UpdateOrganization = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    deptId: "",
    name: "",
    hod: "",
    deptContact: "",
    operationHr: "",
    noOfStaff: "",
    location: "",
    bedCapacity: "",
    specialty: "",
    noOfPatient: "",
    equipment: [],
    deptBudget: "",
  });

  const { closeModal, modalProps } = useModal();
  const [editResource, { isLoading }] = useEditResourceMutation();

  useEffect(() => {
    if (modalProps) {
      setFormData(modalProps);
    }
  }, [modalProps]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const URL = `/department/update/${formData.deptId}`;

    try {
      const response = await editResource({
        url: URL,
        data: formData,
      }).unwrap();
      console.log("Update response", response);
      setSuccess("Update successful!");
      setError("");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      setError("Update failed. Please try again.");
      setSuccess("");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      deptId: "",
      name: "",
      hod: "",
      deptContact: "",
      operationHr: "",
      noOfStaff: "",
      location: "",
      bedCapacity: "",
      specialty: "",
      noOfPatient: "",
      equipment: [],
      deptBudget: "",
    });
    closeModal();
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className={style.header}>
        <h3>Update Organization</h3>
      </div>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="name">Department Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="hod">Head of Department:</label>
            <input
              type="text"
              id="hod"
              name="hod"
              value={formData.hod}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="specialty">Specialty:</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="noOfStaff">Number of Staff:</label>
            <input
              type="number"
              id="noOfStaff"
              name="noOfStaff"
              value={formData.noOfStaff}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="noOfPatient">Number of Patients:</label>
            <input
              type="number"
              id="noOfPatient"
              name="noOfPatient"
              value={formData.noOfPatient}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="deptContact">Contact Number:</label>
            <input
              type="tel"
              id="deptContact"
              name="deptContact"
              value={formData.deptContact}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="bedCapacity">Bed Capacity:</label>
            <input
              type="number"
              id="bedCapacity"
              name="bedCapacity"
              value={formData.bedCapacity}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="deptBudget">Department Budget:</label>
            <input
              type="number"
              id="deptBudget"
              name="deptBudget"
              value={formData.deptBudget}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="equipment">Equipment (comma separated):</label>
            <input
              type="text"
              id="equipment"
              name="equipment"
              value={formData.equipment.join(", ")}
              onChange={(e) => {
                const equipmentArray = e.target.value
                  .split(",")
                  .map((item) => item.trim());
                setFormData({ ...formData, equipment: equipmentArray });
              }}
              required
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="operationHr">Operation Hours:</label>
            <input
              type="text"
              id="operationHr"
              name="operationHr"
              value={formData.operationHr}
              onChange={handleChange}
              placeholder="e.g., 8:00AM - 4:00PM"
              required
            />
          </div>
        </div>
      </div>

      <div className={style.formButton}>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateOrganization;
