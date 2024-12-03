import React, { useState } from 'react'
import style from './addPatientStyle.module.css'
import { useEditResourceMutation } from 'src/redux/api/departmentApi';

const ViewPatients = ({ toggleForm, patient }) => {
    const [keepOpen, setKeepOpen] = useState(false);
    const [formData, setFormData] = useState(patient);
    const [formError, setFormError] = useState()
    const [editResource, { isSuccess, isLoading, error }] = useEditResourceMutation()

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
          phone: e.target.phone.value,
          lastVisit: e.target.lastVisit.value,
          gender: e.target.gender.value,
          dateOfBirth: e.target.dateOfBirth.value,
          medCondition: e.target.medCondition.value,
      };
  
      try {
          let result;
          if (patient?.patId) {
              // Update existing account
              result = await editResource({
                  url: `/patient/edit/${formData.patId}`,
                  method: 'PUT',
                  data: patientData,
              }).unwrap();
              setFormData(null)
              alert('Account updated successfully');
          } else {
              // Create new account
              result = await postResource({
                  url: '/patient/create',
                  data: patientData,
              }).unwrap();
              alert('Account created successfully');
          }
  
          e.target.reset();
          window.location.reload();
          if (!keepOpen) {
              toggleForm();
          }
      } catch (error) {
        console.error('Error creating patient:', error.data);
        if (error.data) {
          // If the error message is in the response
          const errorMessage = error.data;
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
      
        toggleForm(); // Close form if confirmed

    };

    //handles the inut change
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,
          [name]: value,
      }));
  };

  return (
    <div className={` fixed inset-0 flex justify-center items-center  bg-gray-800 bg-opacity-50 z-40`}>
        <div className={`${style.addInfo} fixed  bg-gray-800 bg-opacity-50 z-50`}>
        <div className={style.addInfoTop}>
          <h3>Edit Patients</h3>
          {/* Update the close button to call handleClose */}
          <button onClick={handleClose} className={style.close}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.form}>
              <div className={style.formChild}>
                <label htmlFor="firstName">Firstname</label>
                <input type="text" id="firstName" name="firstName" className={style.input} value={formData?.firstName} onChange={handleInputChange} required />
              </div>
              <div className={style.formChild}>
                <label htmlFor="lastName">Lastname</label>
                <input type="text" id="lastName" name="lastName" className={style.input} value={formData?.lastName} onChange={handleInputChange} required />
              </div>
              <div className={style.formChild}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" className={style.input} value={formData?.address} onChange={handleInputChange} required />
              </div>
              <div className={style.formChild}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className={style.input} value={formData?.email} onChange={handleInputChange} required />
              </div>
              <div className={style.formChild}>
                <label htmlFor="lastVisit">Last Visit</label>
                <input type="date" id="lastVisit" name="lastVisit" className={style.input} value={formData?.lastVisit?.slice(0,10)} onChange={handleInputChange} required />
              </div>
              <div className={style.formChild}>
                <label htmlFor="phone">Mobile Number</label>
                <input type="number" id="phone" name="phone" className={style.input}  value={formData?.phone} onChange={handleInputChange} required />
              </div>
              <div className={style.formChild}>
                <label htmlFor="medCondition">Medical Condition</label>
                <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required />

              </div>
              <div className={style.formChild}>
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender"className={`${style.input}`} value={formData?.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              </div>
              <div className={style.formChild}>
                <label htmlFor="dateOfBirth" >Date Of Birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" className={style.input} value={formData?.dateOfBirth?.slice(0,10)} onChange={handleInputChange} required />
              </div>
          </div>

          <div className='flex justify-center gap-3'>
            <button type="submit" className={`text-white bg-emsBlue ${style.submit}`}>{isLoading ? 'Updating' :'Update Details'}</button>
            <button  className={`text-white bg-emsRed ${style.submit}`} onClick={handleClose}>Cancel</button>
            </div>
            <span className='text-red-500'>{formError}</span>
        </form>
      </div>
    </div>
  );
};

export default ViewPatients;