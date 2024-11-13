import React, { useEffect, useState, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown, Settings } from "lucide-react";
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
import { IoMdSettings, IoMdPerson, IoMdHelpCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import DropDown from "./profileDropdown/DropDown";
import ModalContainer from "../modals/ModalContainer";
import { MODAL_TYPES, useModal } from "../context/ModalContext";
import { useFetchProfileImageQuery } from "@src/redux/api/departmentApi";
import { ClipLoader } from "react-spinners";

const Navbar = () => {
  const [dropdowns, setDropdowns] = useState({
    isDropdown: false,
    isAppointmentDropdown: false,
    staffDropDown: false,
  });

  const { openModal, isShowModal, image } = useModal();
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  const { data, isLoading, isError } = useFetchProfileImageQuery({
    url: "/staff/get-profilePic",
    token: token,
  });

  const staffDropdownRef = useRef(null);
  const appointmentDropdownRef = useRef(null);

  const handleClickOutsideDropdown = useCallback((event) => {
    if (
      staffDropdownRef.current &&
      !staffDropdownRef.current.contains(event.target)
    ) {
      setDropdowns((prev) => ({ ...prev, staffDropDown: false }));
    }
    if (
      appointmentDropdownRef.current &&
      !appointmentDropdownRef.current.contains(event.target)
    ) {
      setDropdowns((prev) => ({ ...prev, isAppointmentDropdown: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, [handleClickOutsideDropdown]);

  const handleShowModal = (type) => {
    openModal(type);
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const profileImageUrl = data?.profilePic || image || profileImg;

  return (
    <>
      <nav className={style.dashboardNav}>
        <div className={style.left}>
          <NavLink to="/app">
            <img src={Logo} alt="Logo" className={style.img} />
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
            <li>
              <CustomLinkWithDropdown
                label="Appointments"
                icon={<SiGoogleclassroom />}
                path="/app/appointments"
                dropdownItems={[
                  {
                    path: "/app/appointments/appointment",
                    label: "Appointment",
                  },
                  { path: "/app/appointments/admission", label: "Admission" },
                  {
                    path: "/app/appointments/consultation",
                    label: "Consultation",
                  },
                  { path: "/app/appointments/discharge", label: "Discharge" },
                ]}
              />
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
              <CustomLinkWithDropdown
                label="Reports"
                icon={<TbReportMedical />}
                path="/reports"
                dropdownItems={[
                  { path: "/app/reports/admin", label: "Admin" },
                  { path: "/app/reports/doctors", label: "Doctors" },
                  { path: "/app/reports/nurses", label: "Nurses" },
                  { path: "/app/reports/laboratory", label: "Laboratory" },
                  { path: "/app/reports/radiology", label: "Radiology" },
                  { path: "/app/reports/pharmacy", label: "Pharmacy" },
                  { path: "/app/reports/account", label: "Account" },
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
            <li>
              <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                  isActive ? style.active : style.link
                }
              >
                <Settings /> Settings
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={style.profileImgContainer}>
          <div className={style.right}>
            {isLoading ? (
              <ClipLoader color="#b79f9f" size={16} />
            ) : (
              <img
                src={profileImageUrl}
                alt="Profile"
                className={style.profileImg}
              />
            )}
          </div>
          <FaSortDown
            onClick={() => toggleDropdown("isDropdown")}
            className={style["dashboard-icon"]}
          />
        </div>
      </nav>
      {dropdowns.isDropdown && (
        <DropDown
          handlePasswordChange={() => handleShowModal(MODAL_TYPES.TYPE2)}
          handleProfileImageChange={() => handleShowModal(MODAL_TYPES.TYPE1)}
          setIsDropdown={(val) =>
            setDropdowns((prev) => ({ ...prev, isDropdown: val }))
          }
        />
      )}
      {isShowModal && <ModalContainer />}
    </>
  );
};

export default Navbar;

const CustomLink = React.memo(({ path, icon, label }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${isActive ? "text-purple-600" : "text-gray-800"} flex gap-1 items-center text-sm`
      }
    >
      {icon} <span>{label}</span>
    </NavLink>
  );
});

const CustomLinkWithDropdown = ({ path, icon, label, dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
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
          `${isActive ? "text-purple-600" : "text-gray-800"} flex gap-1 items-center text-sm`
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
