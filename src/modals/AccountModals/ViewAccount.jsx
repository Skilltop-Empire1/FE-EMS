import React, { useState } from 'react'
import style from './addAccountStyle.module.css'
import { createPatient } from '../../hooks/Api';

const ViewAccount = ({ toggleForm }) => {
    const [keepOpen, setKeepOpen] = useState(false);

    const handleCheckboxChange = (e) => {
      setKeepOpen(e.target.checked);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const patientData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        address: e.target.address.value,
        email: e.target.email.value,
        educationQualification: e.target.educationQualification.value,
        phone: e.target.phone.value,
        gender: e.target.gender.value,
        dateOfBirth: e.target.dateOfBirth.value, 
        role: e.target.organization.value,
      };

      console.log('Form Data:', patientData); // Correct logging here

      try {
        const result = await createPatient(patientData);
        console.log('Patient created successfully:', result);
        alert('Patient created successfully')
        e.target.reset();

        // Clear form if `keepOpen` is unchecked
        if (!keepOpen) {
          toggleForm(); // Close form if not keeping open
        }

      } catch (error) {
        console.error('Error creating patient:', error.message);
        alert(`Error creating patient: ${error.message}`);
      }
    };

    // Handle close confirmation only when "X" button is clicked
    const handleClose = (e) => {
      e.preventDefault();  // Prevent any default behavior from the button
      
        toggleForm(); // Close form if confirmed

    };

  return (
    <div className={` fixed inset-0 flex justify-center items-center  bg-gray-800 bg-opacity-50 z-40`}>
        <div className={`${style.addInfo} fixed  bg-gray-800 bg-opacity-50 z-50`}>
        <div className={style.addInfoTop}>
          <h3>Edit Account</h3>
          {/* Update the close button to call handleClose */}
          <button onClick={handleClose} className={style.close}>X</button>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formChild}>
            <label htmlFor="firstName">Firstname</label>
            <input type="text" id="name" name="firstName" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="lastName">Lastname</label>
            <input type="text" id="name" name="lastName" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" className={style.input} />
          </div>
          <div className={style.formChild}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="educationQualification">Last Visit</label>
            <input type="date" id="qualification" name="educationQualification" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="phone">Mobile Number</label>
            <input type="number" id="number" name="phone" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="educationQualification">Medical Condition</label>
            <input type="text" id="qualification" name="educationQualification" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" name="gender" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="gender">Doctor Assigned</label>
            <input type="text" id="gender" name="gender" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="dateOfBirth" >Date Of Birth</label>
            <input type="date" id="date" name="dateOfBirth" className={style.input}/>
          </div>
          <div className={style.formChild}>
            <label htmlFor="organization">Department</label>
            <input type="text" id="role" name="organization" className={style.input}/>
          </div>
          <br />
          <div className={`${style.addAnother} text-blue-500`}>
            <input type="checkbox" checked={keepOpen} onChange={handleCheckboxChange}    className={`accent-blue-500 hover:accent-blue-700 focus:ring-2 focus:ring-blue-500 ${style.tick}`}/>
            <label htmlFor="checkbox" className={` text-emsBlue`}> Add another patient</label>
          </div>
          <div className='flex gap-3'>
            <button type="submit" className={`text-white bg-emsBlue  ${style.submit}`}>Edit account</button>
            <button  className={`text-white bg-emsRed ${style.submit}`} onClick={handleClose}>Cancel</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ViewAccount;