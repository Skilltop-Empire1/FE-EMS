import clsx from "clsx";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define animation variants for the modal
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-30px" },
  visible: { opacity: 1, y: "0" },
  exit: { opacity: 0, y: "30px" },
};

const ModalWrapper = ({
  children,
  onClose,
  contentMaxWidth = "max-w-lg",
  position = "center",
  modalTitle = "Modal Title",
}) => {
  return (
    <AnimatePresence>
      <motion.div
        id="modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-black"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        ></motion.div>

        {/* Modal container */}
        <motion.div
          className={clsx(
            `rounded-xl bg-white relative mt-10 flex flex-col ${contentMaxWidth}`,
            {
              "mx-auto": position === "center",
              "ml-auto": position === "right",
            }
          )}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Modal header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">{modalTitle}</h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-gray-400 hover:text-gray-900"
              data-modal-hide="modal"
            >
              <svg
                className="h-2 w-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 flex-grow">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalWrapper;
