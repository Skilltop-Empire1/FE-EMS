import React, { useState } from "react";
import style from "./addStaffStyle.module.css";

const AddStaff = ({ toggleForm }) => {
  const [keepOpen, setKeepOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    setKeepOpen(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //form submission logic here

    // If the checkbox is not checked, close the form
    if (!keepOpen) {
      toggleForm();
    }
  };

  return (
    <div className={style.addInfo}>
      <div className={style.addInfoTop}>
        <h3>Add Staff</h3>
        <button onClick={toggleForm} className={style.close}>
          X
        </button>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.formChild}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" className={style.input} />
        </div>
        <div className={style.formChild}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className={style.input}
          />
        </div>
        <div className={style.formChild}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className={style.input} />
        </div>
        <div className={style.formChild}>
          <label htmlFor="qualification">Educational Qualification</label>
          <select
            id="qualification"
            name="qualification"
            className={style.input}
          >
            <option>ND</option>
            <option>MBBS</option>
          </select>
        </div>
        <div className={style.formChild}>
          <label htmlFor="number">Mobile Number</label>
          <input
            type="number"
            id="number"
            name="number"
            className={style.input}
          />
        </div>
        <div className={style.formChild}>
          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            className={style.input}
          />
        </div>
        <div className={style.formChild}>
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            className={style.input}
          />
        </div>
        <div className={style.formChild}>
          <label htmlFor="practice">Practice</label>
          <input
            type="text"
            id="practice"
            name="practice"
            className={style.input}
          />
        </div>
        <div className={style.formChild}>
          <label htmlFor="date">Date Of Birth</label>
          <input type="date" id="date" name="date" className={style.input} />
        </div>
        <div className={style.formChild}>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            id="organization"
            name="organization"
            className={style.input}
          />
        </div>
        <button type="submit" className={style.submit}>
          Save Staff
        </button>
        <div className={style.addAnother}>
          <input
            type="checkbox"
            checked={keepOpen}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox"> Add another staff</label>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
