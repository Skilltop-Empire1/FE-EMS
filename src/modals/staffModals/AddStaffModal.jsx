import React, { useState } from "react";
import { MonitorCheck, MonitorPause } from "lucide-react";
import clsx from "clsx";
import ModalWrapper from "@src/components/shared/ModalWrapper";
import { motion } from "framer-motion";
import AddStaffForm from "./AddStaffForm";

// Define the animation variants
const modalVariants = {
  hidden: { opacity: 0, y: "-50px" },
  visible: { opacity: 1, y: "0" },
  exit: { opacity: 0, y: "50px" },
};

const AddStaffModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);

  if (!show) return null;
  return (
    <ModalWrapper
      onClose={onClose}
      contentMaxWidth="max-w-[700px]"
      modalTitle="Add Staff"
    >
      <motion.div
        className="relative flex-grow"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Modal header
        <div className="flex flex-col items-center justify-center space-y-4 rounded-t p-4">
        </div> */}
        {/* Modal body */}
        <div>
          <AddStaffForm onClose={onClose} />
        </div>
        {/* Modal footer */}
        {/* <div className="flex items-center space-x-3 rounded-b border-t border-gray-200 p-6 rtl:space-x-reverse">
          <button
            type="button"
            onClick={onClose}
            className="flex-grow rounded-full bg-orange-100 px-8 py-2.5 text-center text-xs font-medium hover:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-300"
          >
            Cancel
          </button>
          <button disabled={loading} type="submit">
            {loading ? "Please wait ..." : "Update Role"}
          </button>
        </div> */}
      </motion.div>
    </ModalWrapper>
  );
};

export default AddStaffModal;
