import React, { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "./profile.png";
import Logo from "./EMS logo-Transparent.png";
import style from "./navBarStyle.module.css";
import { MdHome } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { MdOutlineSick } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaSortDown } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import DropDown from "./profileDropdown/DropDown";
import ModalContainer from "../modals/ModalContainer";
import { MODAL_TYPES, useModal } from "../context/ModalContext";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isAppointmentDropdown, setIsAppointmentDropdown] = useState(false);
  const [staffDropDown, setStaffDropDown] = useState(false);
  const { openModal, isShowModal, image } = useModal();

  const appointmentDropdownRef = useRef(null);
  const staffDropdownRef = useRef(null);

  const handleClickOutsideDropdown = () => {
    if (
      appointmentDropdownRef.current &&
      !appointmentDropdownRef.current.contains(event.target)
    ) {
      setIsAppointmentDropdown(false);
    }
    if (
      staffDropdownRef.current &&
      !staffDropdownRef.current.contains(event.target)
    ) {
      setStaffDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);

    return () =>
      document.removeEventListener("click", handleClickOutsideDropdown);
  }, []);

  const handleShowModal = (type) => {
    openModal(type);
  };

  const toggleAppointmentDropdown = () => {
    setIsAppointmentDropdown((prev) => !prev);
  };

  return (
    <>
      <nav className={style.dashboardNav}>
        <div className={style.left}>
          <NavLink to="/app">
            <img src={Logo} alt="" className={style.img} />
          </NavLink>
          <ul className={style.ull}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
                to="/app"
              >
                <MdHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/organization"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <GoOrganization /> Department
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/app/staff"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <IoMdPerson /> Staff
              </NavLink> */}
              <CustomLinkWithDropdown
                label="Staff"
                icon={<TbReportMedical />}
                path="/app/staff?type=doctors"
                dropdownItems={[
                  { path: "/app/staff?type=doctor", label: "Doctors" },
                  { path: "/app/staff?type=nurses", label: "Nurses" },
                  { path: "/app/staff?type=pharmacy", label: "Pharmacy" },
                  { path: "/app/staff?type=laboratory", label: "Laboratory" },
                  { path: "/app/staff?type=radiology", label: "Radiology" },
                ]}
              />
            </li>
            <li>
              <NavLink
                to="/app/patients"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <MdOutlineSick /> Patients
              </NavLink>
            </li>
            <li ref={appointmentDropdownRef}>
              <div>
                <span
                  onClick={toggleAppointmentDropdown}
                  className={style.link}
                  style={{ cursor: "pointer" }}
                >
                  <SiGoogleclassroom /> Appointments <FaSortDown />
                </span>
                {isAppointmentDropdown && (
                  <div className={style.dropdownMenu}>
                    <Link to="/app/appointments" className={style.dropdownItem}>
                      Appointment
                    </Link>
                    <Link to="/app/admission" className={style.dropdownItem}>
                      Admission
                    </Link>
                    <Link to="/app/consultation" className={style.dropdownItem}>
                      Consultation
                    </Link>
                    <Link to="/app/discharge" className={style.dropdownItem}>
                      Discharge
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <NavLink
                to="/app/account"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <MdAccountCircle /> Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/reports"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <TbReportMedical /> Reports
              </NavLink>
            </li>
            <li>
              {/* <CustomLink
                label="Reports"
                icon={<TbReportMedical />}
                path="/reports"
              /> */}

              <CustomLinkWithDropdown
                label="Reports"
                icon={<TbReportMedical />}
                path="/reports"
                dropdownItems={[
                  { path: "/reports/admin", label: "Admin" },
                  { path: "/reports/doctors", label: "Doctors" },
                  { path: "/reports/nurses", label: "Nurses" },
                  { path: "/reports/laboratory", label: "Laboratory" },
                  { path: "/reports/radiology", label: "Radiology" },
                  { path: "/reports/pharmacy", label: "Pharmacy" },
                  { path: "/reports/account", label: "Account" },
                ]}
              />
            </li>
            <li>
              <NavLink
                to="/app/help"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <IoMdHelpCircle /> Help
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={style.profileImgContainer}>
          <div className={style.right}>
            <img
              src={image || profileImg}
              alt="Profile"
              className={style.profileImg}
            />
          </div>
          <FaSortDown
            onClick={() => setIsDropdown((prev) => !prev)}
            className={style[`dashboard-icon`]}
          />
        </div>
      </nav>
      {isDropdown && (
        <DropDown
          handlePasswordChange={() => handleShowModal(MODAL_TYPES.TYPE2)}
          handleProfileImageChange={() => handleShowModal(MODAL_TYPES.TYPE1)}
          setIsDropdown={setIsDropdown}
        />
      )}
      {isShowModal && <ModalContainer />}
    </>
  );
};

export default Navbar;

const CustomLink = ({ path, icon, label }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${isActive && "text-purple-600"} flex gap-1 items-center text-sm`
      }
    >
      {icon} <span>{label}</span>
    </NavLink>
  );
};

// const CustomLinkWithDropdown = ({ path, icon, label, dropdownItems }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   return (
//     <div
//       className="relative group"
//       onMouseEnter={() => setIsDropdownOpen(true)}
//       onMouseLeave={() => setIsDropdownOpen(false)}
//     >
//       <NavLink
//         to={path}
//         className={({ isActive }) =>
//           `${
//             isActive ? "text-purple-600" : "text-gray-800"
//           } flex gap-1 items-center text-sm`
//         }
//       >
//         {icon}
//         <span>{label}</span>
//         {/* Conditionally render Chevron icons based on dropdown state */}
//         {dropdownItems && dropdownItems.length > 0 && (
//           <span className="ml-2">
//             {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
//           </span>
//         )}
//       </NavLink>

//       {/* Dropdown */}
//       {dropdownItems && dropdownItems.length > 0 && (
//         <div
//           className={`absolute left-0 mt-2 w-30 bg-white shadow-lg rounded-md z-10 transition-all duration-300 ease-in-out origin-top transform ${
//             isDropdownOpen
//               ? "scale-100 opacity-100"
//               : "scale-95 opacity-0 pointer-events-none"
//           }`}
//           onMouseEnter={() => setIsDropdownOpen(true)}
//           onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//           {dropdownItems.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               className={({ isActive }) =>
//                 `block px-4 py-2 text-sm ${
//                   isActive ? "bg-purple-600 text-white" : "text-gray-800"
//                 } hover:bg-gray-100`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const CustomLinkWithDropdown = ({ path, icon, label, dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // Delay in milliseconds
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${
            isActive ? "text-purple-600" : "text-gray-800"
          } flex gap-1 items-center text-sm`
        }
      >
        {icon}
        <span>{label}</span>
        {dropdownItems && dropdownItems.length > 0 && (
          <span className="ml-2">
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}
      </NavLink>

      {/* Dropdown with Framer Motion animation */}
      {dropdownItems && dropdownItems.length > 0 && (
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute left-0 mt-2 w-30 bg-white shadow-lg rounded-md z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {dropdownItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={handleItemClick} // Close menu on item click
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm ${
                      isActive ? "bg-purple-600 text-white" : "text-gray-800"
                    } hover:bg-gray-100`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
