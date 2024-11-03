import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { usePostResourceMutation } from "../../redux/api/departmentApi";
import style from "./OrganisationModals.module.css";

const AddOrganisation = () => {
  const initialData = {
    name: "",
    location: "",
    hod: "",
    specialty: "",
    noOfStaff: "",
    noOfPatient: "",
    deptContact: "",
    bedCapacity: "",
    deptBudget: "",
    equipment: [],
    operationHr: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { closeModal } = useModal();
  const URL = "/department/create";

  const [postResource, { isLoading: loading, isError: apiError }] =
    usePostResourceMutation(URL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "equipment" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      await postResource({ url: URL, data: formData });
      setMessage("Saved successfully.");
      setError("");
      setFormData(initialData);
      setTimeout(() => setMessage(""), 1500);

      if (!isChecked) {
        setTimeout(() => closeModal(), 2000);
      }
    } catch (err) {
      setError("An error occurred while saving. Please try again.");
      setMessage("");
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    closeModal();
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.header}>
        <h3>Add Department</h3>
      </div>
      {loading && <div style={{ color: "blue" }}>Loading...</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {apiError && <div style={{ color: "red" }}>{apiError.message}</div>}
      <div className={style.formContainer}>
        <div className={style.inputContent}>
          <div className={style.inputField}>
            <label htmlFor="name">Department Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Department Name"
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="hod">Head of Department</label>
            <input
              type="text"
              id="hod"
              name="hod"
              value={formData.hod}
              onChange={handleChange}
              placeholder="Head of Department"
            />
          </div>
          <div>
            <label htmlFor="specialty">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Specialty"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="noOfStaff">Number of Staff</label>
            <input
              type="number"
              id="noOfStaff"
              name="noOfStaff"
              value={formData.noOfStaff}
              onChange={handleChange}
              placeholder="Number of Staff"
            />
          </div>
          <div>
            <label htmlFor="noOfPatient">Number of Patients</label>
            <input
              type="number"
              id="noOfPatient"
              name="noOfPatient"
              value={formData.noOfPatient}
              onChange={handleChange}
              placeholder="Number of Patients"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="deptContact">Department Contact</label>
            <input
              type="tel"
              id="deptContact"
              name="deptContact"
              value={formData.deptContact}
              onChange={handleChange}
              placeholder="Department Contact"
            />
          </div>
          <div>
            <label htmlFor="bedCapacity">Bed Capacity</label>
            <input
              type="number"
              id="bedCapacity"
              name="bedCapacity"
              value={formData.bedCapacity}
              onChange={handleChange}
              placeholder="Bed Capacity"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="operationHr">Operation Hour</label>
            <input
              type="text"
              id="operationHr"
              name="operationHr"
              value={formData.operationHr}
              onChange={handleChange}
              placeholder="Operation Hour (e.g. 8.00AM - 4.00PM)"
            />
          </div>
          <div>
            <label htmlFor="deptBudget">Department Budget</label>
            <input
              type="number"
              id="deptBudget"
              name="deptBudget"
              value={formData.deptBudget}
              onChange={handleChange}
              placeholder="Department Budget"
            />
          </div>
        </div>
        <div className={style.inputContent}>
          <div>
            <label htmlFor="equipment">Equipment (comma-separated)</label>
            <input
              type="text"
              id="equipment"
              name="equipment"
              value={formData.equipment.join(",")}
              onChange={handleChange}
              placeholder="Equipment (e.g. MRI Machine, Scanner)"
            />
          </div>
        </div>
      </div>
      <div className={style.checkbox}>
        <div className="check">
          <input
            type="checkbox"
            id="addMore"
            checked={isChecked}
            onChange={handleCheck}
          />
          <label htmlFor="addMore">Create another Department</label>
        </div>
        <div className={style.formButton}>
          <button type="submit" disabled={loading}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddOrganisation;
