import React, { useState } from 'react';
import style from './addPatientStyle.module.css';

const PatientInfo = ({ toggleInfo, infoData }) => {
  const [information?, setinformation?] = useState(infoData);

  const handleClose = (e) => {
    e.preventDefault();
    setinformation?(null);
    toggleInfo(); 
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-content');
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Patient information?</title>
          <style>
            ${document.querySelector('style').innerHTML} 
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-40" id="printable-content">
      <div className={`${style.addInfo} fixed bg-gray-800 bg-opacity-50 z-50`}>
        <div className={style.addInfoTop}>
          <h3>Patients information</h3>
          <button onClick={handleClose} className={`${style.close} noPrint`}>X</button>
        </div>
        <form className={style.form}>
          <div className={style.formChild}>
            <label htmlFor="firstName">Firstname</label>
            <p>{information?.firstName}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="lastName">Lastname</label>
            <p>{information?.lastName}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="address">Address</label>
            <p>{information?.address}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="email">Email</label>
            <p>{information?.email}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="lastVisit">Last Visit</label>
            <p>{information?.lastVisit?.slice(0, 10)}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="phone">Mobile Number</label>
            <p>{information?.phone}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="medCondition">Medical Condition</label>
            <p>{information?.medCondition}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="gender">Gender</label>
            <p>{information?.gender}</p>
          </div>
          <div className={style.formChild}>
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <p>{information?.dateOfBirth}</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handlePrint} className={`text-white bg-emsBlue ${style.submit} noPrint`}>
              Print
            </button>
            <button onClick={handleClose} className={`text-white bg-emsRed ${style.submit}`}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientInfo;
