import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useDeleteResourceMutation } from "../../redux/api/departmentApi";
import { color } from "framer-motion";

function DeleteOrganization({ id, onDeleteSuccess }) {
  const { modalProps, closeDeleteModal } = useModal();
  const [deleteResource, { isLoading, isError, isSuccess }] =
    useDeleteResourceMutation();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const URL = `/organisationData/${modalProps.id}`;

    try {
      await deleteResource(URL).unwrap();
      onDeleteSuccess();
      setTimeout(() => {
        closeDeleteModal();
      }, 2000);
      setError("");
    } catch (err) {
      setError("Delete failed. Please try again.");
      console.error("Error:", err);
    }
  };

  const btn = {
    width: "170px",
    height: "48px",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "400",
    lineHeight: "27px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: "#FFFFFF",
  };

  const deleteButton = {
    ...btn,
    backgroundColor: "#3F51B5",
    marginRight: "13px",
  };

  const closeButton = {
    ...btn,
    backgroundColor: "#F44336",
    marginLeft: "13px",
  };

  const textStyle = {
    width: "360px",
    height: "54px",
    fontSize: "17px",
    fontWeight: 700,
    lineHeight: "27px",
    textAlign: "left",
    color: " #171A1F",
  };

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "38px",
  };

  return (
    <div style={container}>
      <p style={textStyle}>
        Are you sure you want to delete{" "}
        <span style={{ color: "red" }}>{modalProps.name}</span> Department
        record?
      </p>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isError && (
        <div style={{ color: "red" }}>Error deleting organization.</div>
      )}
      {isSuccess && (
        <div style={{ color: "green" }}>Organization deleted successfully!</div>
      )}
      <div>
        <button
          style={deleteButton}
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <button style={closeButton} onClick={closeDeleteModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default DeleteOrganization;
