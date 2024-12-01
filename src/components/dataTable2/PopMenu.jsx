import React, { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Printer,
  BringToFront,
} from "lucide-react";

const PopMenu = ({ onView, onEdit, onDelete, hide1, hide2 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Function to close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle item selection and close menu after
  const handleAction = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <MoreHorizontal className="text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-50">
          <button
            onClick={() => handleAction(onView)}
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </button>
          <button
            onClick={() => handleAction(onEdit)}
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => handleAction(onEdit)}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${hide1}`}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button
            onClick={() => handleAction(onEdit)}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${hide2}`}
          >
            <BringToFront className="w-4 h-4 mr-2" />
            Invite
          </button>
          <button
            onClick={() => handleAction(onDelete)}
            className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PopMenu;
