import React, { useState } from "react";
import ModalWrapper from "@src/components/shared/ModalWrapper";
import { motion } from "framer-motion";
import StaffViewEditForm from "./StaffViewEditForm";

// Define the animation variants
const modalVariants = {
  hidden: { opacity: 0, y: "-50px" },
  visible: { opacity: 1, y: "0" },
  exit: { opacity: 0, y: "50px" },
};

const ViewStaffModal = ({ show, onClose, staffData, viewMode }) => {
  if (!show) return null;
  return (
    <ModalWrapper onClose={onClose} contentMaxWidth="max-w-5xl" modalTitle="Staff">
      <motion.div
        className="relative flex-grow"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Modal body */}
       <div>
        <StaffViewEditForm onClose={onClose} isViewMode={viewMode} initialData={staffData} />
       </div>
      </motion.div>
    </ModalWrapper>
  );
};

export default ViewStaffModal;
