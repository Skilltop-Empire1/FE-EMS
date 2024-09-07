import React, { useState } from 'react'
import style from './addPatientStyle.module.css'
import { createPatient } from '../../hooks/Api';


const AddPatients = ({ toggleForm}) => {

    const [keepOpen, setKeepOpen] = useState(false);

    const handleCheckboxChange = (e) => {
      setKeepOpen(e.target.checked);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = {
        firstName: e.target.firstname.value,
        lastName: e.target.surname.value,
        address: e.target.address.value,
        email: e.target.email.value,
        education_qualification: e.target.education_qualification.value,
        phone: e.target.mobile_no.value,
        gender: e.target.gender.value,
        dateOfBirh: e.target.dob.value,
        role: e.target.role.value,
      };
      console.log('Form Data:', formData); // Log the payload to verify
    
      try {
        const response = await createPatient(formData);
        if (response) {
          // Optionally reset the form if needed
          e.target.reset();
    
          // Show a success message or handle the success
          alert('Staff created successfully')
          console.log('Staff created successfully:', response);
    
          // Close the form if the checkbox is not checked
          if (!keepOpen) {
            toggleForm();
          }
        }
      } catch (error) {
        alert('Failed to create staff')
        console.error('Failed to create staff:', error);
        // Optionally display an error message to the user
      }
    };

    

  return (
    <div className={style.addInfo}>
            <div className={style.addInfoTop}>
              <h3>Add Patients</h3>
              <button onClick={toggleForm} className={style.close}>X</button>
            </div>
            <form className={style.form} onSubmit={handleSubmit}> 
              <div className={style.formChild}>
                <label htmlFor="firstname">Firstname</label>
                <input type="text" id="name" name="firstname"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="surname">Lastname</label>
                <input type="text" id="name" name="surname"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address"  className={style.input} />
              </div>
              <div className={style.formChild}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="education_qualification">Educational Qualification</label>
                <input type="text" id="qualification" name="education_qualification"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="mobile_no">Mobile Number</label>
                <input type="number" id="number" name="mobile_no"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" name="gender"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="dob">Date Of Birth</label>
                <input type="date" id="date" name="dob"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="role">Role</label>
                <input type="text" id="role" name="role"  className={style.input}/>
              </div>
              <br />
              <button type="submit" className={style.submit}>Save Staff</button>
              <div className={style.addAnother}>
                <input  type="checkbox"
                checked={keepOpen}
                onChange={handleCheckboxChange}/>
                <label htmlFor="checkbox"> Add another patient</label>
              </div>
            </form>
        </div>
  )
}

export default AddPatients
