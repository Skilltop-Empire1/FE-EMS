import React, { useState, useEffect } from 'react'
import style from './addPatientStyle.module.css'
import { createPatient } from '../../hooks/Api';
import { useFetchResourceQuery, usePostResourceMutation } from 'src/redux/api/departmentApi';

const AddPatients = ({ toggleForm }) => {
    const{data: departmentData = [], isLoading: departmentLoading, error: departmentError} = useFetchResourceQuery('/department/list')
    const{data: staffData = [], isLoading: staffLoading, error: staffError} = useFetchResourceQuery('/staff/doctor/all')
    const [postResource, {error, isLoading}] = usePostResourceMutation()
    const [formError, setFormError] = useState()
    
    
    const [keepOpen, setKeepOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [filteredOptions2, setFilteredOptions2] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

    // Filter department options
    useEffect(() => {
        if (departmentData) setFilteredOptions(departmentData);
    }, [departmentData]);

    // Filter doctor options
    useEffect(() => {
        if (staffData) setFilteredOptions2(staffData.doctors || []);
    }, [staffData]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredOptions(
            departmentData.filter((option) =>
                option.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleOptionSelect = (option) => {
        setSearchTerm(option.name);
        setIsDropdownOpen(false);
    };

    const handleSearchChange2 = (e) => {
        const value = e.target.value;
        setSearchTerm2(value);
        setFilteredOptions2(
            staffData.doctors.filter((option) =>
                option.firstName.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleOptionSelect2 = (option) => {
        setSearchTerm2(`${option.firstName} ${option.lastName}`);
        setIsDropdownOpen2(false);
    };
  

    const handleCheckboxChange = (e) => {
      setKeepOpen(e.target.checked);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Convert the date to ISO 8601 format
      const lastVisitDate = e.target.educationQualification.value;
      const lastVisitISO = new Date(lastVisitDate).toISOString();
    
      const patientData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        address: e.target.address.value,
        email: e.target.email.value,
        lastVisit: lastVisitISO, // Set ISO 8601 formatted date here
        phone: e.target.phone.value,
        gender: e.target.gender.value,
        dateOfBirth: e.target.dateOfBirth.value,
        medCondition: e.target.medCondition.value,
      };
    
      // console.log('Form Data:', patientData); // Check formatted data
    
      try {
        const result = await postResource({
          url: '/patient/create',
          data: patientData,
        }).unwrap();
        
        // console.log('Patient created successfully:', result);
        alert('Patient created successfully');
        window.location.reload()
        e.target.reset();
    
        // Clear form if `keepOpen` is unchecked
        if (!keepOpen) {
          toggleForm(); // Close form if not keeping open
        }
    
      } catch (error) {
        console.error('Error creating patient:', error.data.message);
        if (error.data) {
          // If the error message is in the response
          const errorMessage = error.data.message;
          setFormError(errorMessage);
      } else {
          // Generic fallback for other errors
          setFormError("An unexpected error occurred");
      }
      }
    };
    

    // Handle close confirmation only when "X" button is clicked
    const handleClose = (e) => {
      e.preventDefault();  // Prevent any default behavior from the button
      const confirmation = window.confirm('Are you sure you want to close the form?');
      if (confirmation) {
        toggleForm(); // Close form if confirmed
      }
    };

  return (
    <div className={` fixed inset-0 flex justify-center items-center  bg-gray-800 bg-opacity-50 z-40`}>
        <div className={`${style.addInfo} fixed  bg-gray-800 bg-opacity-50 z-50`}>
        <div className={style.addInfoTop}>
          <h3>Add Patients</h3>
          {/* Update the close button to call handleClose */}
          <button onClick={handleClose} className={style.close}>X</button>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formChild}>
            <label htmlFor="firstName">Firstname</label>
            <input type="text" id="name" name="firstName" className={style.input} required/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="lastName">Lastname</label>
            <input type="text" id="name" name="lastName" className={style.input} required/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" className={style.input} required />
          </div>
          <div className={style.formChild}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className={style.input} required/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="educationQualification">Last Visit</label>
            <input type="date" id="qualification" name="educationQualification" className={style.input} required/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="phone">Mobile Number</label>
            <input type="number" id="number" name="phone" className={style.input} required/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="medCondition">Medical Condition</label>
            <input type="text" id="medCondition" name="medCondition" className={style.input} required/>
          </div>
          <div className={`mt-2 ${style.formChild}`}>
          <label htmlFor="gender">Gender</label>
           <select name="gender" id="gender"className={`${style.input}`}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
           </select>
          </div>
          {/* <div className={style.formChild}> */}
            {/* <label htmlFor="gender">Doctor Assigned</label> */}
            {/* <div className="relative"> */}
              {/* Search input field */}
              {/* <input
                type="text"
                value={searchTerm2}
                onChange={handleSearchChange2}
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                placeholder='select a doctor'
                className={`${style.input}`}
              /> */}

              {/* Dropdown options */}
              {/* {isDropdownOpen2 && (
                <ul className="absolute w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg mt-1">
                  {filteredOptions2?.length > 0 ? (
                    filteredOptions2.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionSelect2(option)}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {option.firstName} {option.lastName}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">No doctor yet</li>
                  )}
                </ul>
              )} */}
            {/* </div> */}
          {/* </div> */}
          <div className={style.formChild}>
            <label htmlFor="dateOfBirth" >Date Of Birth</label>
            <input type="date" id="date" name="dateOfBirth" className={style.input} required/>
          </div>
          {/* <div className={style.formChild}> */}
            {/* <label htmlFor="organization">Department</label> */}
            {/* <input type="text" id="role" name="organization" className={style.input} required/>*/}
            {/* <div className="relative"> */}
              {/* Search input field */}
              {/* <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                placeholder='select a department'
                className={`${style.input}`}
                name="organization"
              /> */}

              {/* Dropdown options */}
              {/* {isDropdownOpen && (
                <ul className="absolute w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg mt-1">
                  {filteredOptions?.length > 0 ? (
                    filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {option.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">No department yet</li>
                  )}
                </ul>
              )}
            </div>
  */}
          {/* </div> */}
          <br />
          <div className={`${style.addAnother} text-blue-500`}>
            <input type="checkbox" checked={keepOpen} onChange={handleCheckboxChange}    className={`accent-blue-500 hover:accent-blue-700 focus:ring-2 focus:ring-blue-500 ${style.tick}`}/>
            <label htmlFor="checkbox" className={` text-emsBlue`}> Add another patient</label>
          </div>
          <div className='flex gap-3'>
            <button type="submit" className={`text-white bg-emsBlue ${style.submit}`}>{isLoading ? 'Saving' : 'Save'}</button>
            <button  className={`text-white bg-emsRed ${style.submit}`} onClick={handleClose}>Cancel</button>
            </div>
            <span className='text-red-500'>{formError}</span>
        </form>
      </div>
    </div>
  );
};

export default AddPatients;