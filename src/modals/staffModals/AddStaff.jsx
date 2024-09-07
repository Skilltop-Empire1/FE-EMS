import React, {useState} from 'react'
import style from './addStaffStyle.module.css'
import { createStaff } from '../../hooks/Api';

const AddStaff = ({ toggleForm}) => {

  const [keepOpen, setKeepOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    setKeepOpen(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      address: e.target.address.value,
      email: e.target.email.value,
      educationalQualification: e.target.educationalQualification.value,
      mobile: e.target.mobileNumber.value,
      specialization: e.target.specialization.value,
      gender: e.target.gender.value,
      // practice: e.target.practice.value,
      dateOfBirth: e.target.dateOfBirth.value,
      // organization: e.target.organization.value,
      // profession: e.target.profession.value,
    };
    console.log('Form Data:', formData); // Log the payload to verify
  
    try {
      const response = await createStaff(formData);
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
              <h3>Add Staff</h3>
              <button onClick={toggleForm} className={style.close}>X</button>
            </div>
            <form className={style.form} onSubmit={handleSubmit}> 
              <div className={style.formChild}>
                <label htmlFor="firstName">Firstame</label>
                <input type="text" id="firstName" name="firstName"  className={style.input} required/>
              </div>
               <div className={style.formChild}>
                <label htmlFor="lastName">lastname</label>
                <input type="text" id="LastName" name="lastName"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="educationalQualification">Educational Qualification</label>
                <input type="text" id="qualification" name="educationalQualification"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="number" id="number" name="mobileNumber"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="specialization">Specialization</label>
                <input type="text" id="specialization" name="specialization"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" name="gender"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="practice">Practice</label>
                <input type="text" id="practice" name="practice"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input type="date" id="date" name="dateOfBirth"  className={style.input} required/>
              </div>
              {/* <div className={style.formChild}>
                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" name="organization"  className={style.input} required/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="profession">Profession</label>
                <input type="text" id="profession" name="profession"  className={style.input} required/>
              </div> */}
              <br />
              <button type="submit" className={style.submit}>Save Staff</button>
              <div className={style.addAnother}>
                <input  type="checkbox"
                checked={keepOpen}
                onChange={handleCheckboxChange}/>
                <label htmlFor="checkbox"> Add another staff</label>
              </div>
            </form>
        </div>
  )
}

export default AddStaff
