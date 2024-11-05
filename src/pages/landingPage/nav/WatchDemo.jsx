import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Adjust according to your root element

const WatchDemo = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    title: "",
    organization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    onRequestClose(); // Close modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-full max-w-md mx-auto bg-white rounded-lg p-5"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-lg font-bold mb-4">Watch Demo</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="organization">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-300 rounded px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WatchDemo;
