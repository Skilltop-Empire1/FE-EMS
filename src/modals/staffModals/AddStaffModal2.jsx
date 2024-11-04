import React, { useState } from "react";
import { MonitorCheck, MonitorPause } from "lucide-react";
import clsx from "clsx";
import ModalWrapper from "@src/components/shared/ModalWrapper";
import { motion } from "framer-motion";

// Define the animation variants
const modalVariants = {
  hidden: { opacity: 0, y: "-50px" },
  visible: { opacity: 1, y: "0" },
  exit: { opacity: 0, y: "50px" },
};

const AddStaffModal2 = ({ show, onClose, customer }) => {
  const [loading, setLoading] = useState(false);

  const role = customer?.role;
  const id = customer?.id;

  if (!show) return null;
  return (
    <ModalWrapper onClose={onClose} contentMaxWidth="max-w-5xl">
      <motion.form
        className="relative flex-grow rounded-2xl bg-white shadow"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Modal header */}
        <div className="flex flex-col items-center justify-center space-y-4 rounded-t p-4">
          <div
            className={clsx(
              "mt-8 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full p-2",
              {
                "bg-amber-500/20": role === 1,
                "bg-green-500/20": role === 0,
              }
            )}
          >
            {role === "admin" ? (
              <MonitorPause className="text-amber-600" size={20} />
            ) : (
              <MonitorCheck className="text-green-600" size={20} />
            )}
          </div>
          <h3 className="text-md text-center font-medium text-gray-900">
            Update User Role
          </h3>
        </div>
        {/* Modal body */}
        <div className="space-y-4 p-6 pt-3">
          <div className="flex flex-col space-y-4">
            <p className="text-center italic">Message on User role update</p>
          </div>
        </div>
        {/* Modal footer */}
        <div className="flex items-center space-x-3 rounded-b border-t border-gray-200 p-6 rtl:space-x-reverse">
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
        </div>
      </motion.form>
    </ModalWrapper>
  );
};

export default AddStaffModal2;
