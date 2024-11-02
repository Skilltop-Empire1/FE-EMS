import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useDeleteResourceMutation } from "../../redux/api/departmentApi";

function DeleteOrganization({ id, onDeleteSuccess }) {
  const { closeModal, modalProps } = useModal();
  const [deleteResource, { isLoading, isError, isSuccess }] =
    useDeleteResourceMutation();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const URL = `/appointmentData/${modalProps.id}`;

    try {
      await deleteResource(URL).unwrap();
      onDeleteSuccess();
      setTimeout(() => {
        closeModal();
      }, 2000);
      setError("");
    } catch (err) {
      setError("Delete failed. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <p>
        Are you sure you want to delete{" "}
        <span style={{ color: "red" }}>{modalProps.patientName}</span>{" "}
        Appointment record?
      </p>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isError && (
        <div style={{ color: "red" }}>Error deleting organization.</div>
      )}
      {isSuccess && (
        <div style={{ color: "green" }}>Organization deleted successfully!</div>
      )}
      <div>
        <button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default DeleteOrganization;
