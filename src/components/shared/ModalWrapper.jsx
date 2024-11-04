import clsx from "clsx";
import React from "react";

const ModalWrapper = ({
  children,
  onClose,
  contentMaxWidth = "max-w-lg",
  position = "center",
}) => {
  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={clsx(
          `animate-modal border-4 bg-white relative mt-10 flex flex-col ${contentMaxWidth}`,
          {
            "mx-auto": position === "center",
            "ml-auto": position === "right",
          }
        )}
      >
        {/* Modal content */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:text-gray-900"
            data-modal-hide="modal"
          >
            <svg
              className="h-3 w-3"
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
        <div className="p-4 flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
