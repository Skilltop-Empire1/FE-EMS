import React, { useState } from "react";
import { motion } from "framer-motion";

import ModalWrapper from "@src/components/shared/ModalWrapper";
import { useDeleteStaffMutation } from "@src/redux/api/staffApi";
import toast from "react-hot-toast";

// Define animation variants for the modal and buttons
const modalVariants = {
  hidden: { opacity: 0, y: "-50px" },
  visible: { opacity: 1, y: "0" },
  exit: { opacity: 0, y: "50px" },
};

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

const DeleteStaffModal = ({ show, onClose, staffData }) => {
  const [deleteStaff, { isLoading }] = useDeleteStaffMutation();

  const handleStaffDelete = async () => {
    try {
      console.log({ id: staffData?.staffId });
      await deleteStaff(staffData?.staffId).unwrap();
      onClose();
      toast.success("Successfully Deleted this Staff");
    } catch (error) {
      toast.error("Cannot Delete Staff at the moment, please try again");
      console.error("Failed to delete staff: ", error);
    }
  };

  if (!show) return null;

  return (
    <ModalWrapper
      onClose={onClose}
      contentMaxWidth="max-w-lg"
      modalTitle="Delete Staff"
    >
      <motion.div
        className="relative flex-grow p-4 text-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Modal body */}
        <h2 className="text-lg mb-4">
          Are you sure you want to delete this staff record?
        </h2>

        <div className="flex justify-center space-x-4">
          {/* Delete Button */}
          <motion.button
            onClick={handleStaffDelete}
            disabled={isLoading}
            className="w-[150px] h-[50px] bg-emsBlue text-white py-2 rounded-md hover:bg-blue-900 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </motion.button>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="w-[150px] h-[50px] bg-emsRed text-white py-2 rounded-md hover:bg-red-800 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </ModalWrapper>
  );
};

export default DeleteStaffModal;
