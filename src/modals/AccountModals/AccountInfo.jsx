import React, { useState } from 'react'
import style from './addAccountStyle.module.css'

const AccountInfo = ({toggleInfo, infoData}) => {

  // const [keepOpen, setKeepOpen] = useState(toggleInfo)
  const [information, setinformation] = useState(infoData)

  const handleClose = (e) => {
    e.preventDefault();  // Prevent any default behavior from the button
        setinformation(null)
      toggleInfo(); // Close form if confirmed

  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-content');
    const newWindow = window.open('', '_blank');
    newWindow.document.write(printContent.outerHTML);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className={` fixed inset-0 flex justify-center items-center  bg-gray-800 bg-opacity-50 z-40`}>
        <div className={`${style.addInfo} fixed  bg-gray-800 bg-opacity-50 z-50`} id='printable-content'>
        <div className={style.addInfoTop}>
          <h3 className={`${style.noPrint}`}>Account information</h3>
          {/* Update the close button to call handleClose */}
          <button onClick={handleClose} className={`${style.close} ${style.noPrint}`}>X</button>
        </div>
        <form className={style.form}>
          <div className={style.formChild}>
            <label htmlFor="firstName">Patient name</label>
            <p>{information?.patName}</p>
            {/* <input type="text" id="firstName" name="firstName" className={style.input} value={formData?.firstName} onChange={handleInputChange} required /> */}
          </div>
          <div className={style.formChild}>
            <label htmlFor="lastName">Payment Method</label>
            <p>{information?.paymentMethod}</p>
            {/* <input type="text" id="lastName" name="lastName" className={style.input} value={formData?.lastName} onChange={handleInputChange} required /> */}
          </div>
          <div className={style.formChild}>
            <label htmlFor="address">Paymennt Provider</label>
            <p>{information?.paymentProvider}</p>
            {/* <input type="text" id="address" name="address" className={style.input} value={formData?.address} onChange={handleInputChange} required /> */}
          </div>
          <div className={style.formChild}>
            <label htmlFor="email">Outstanding Balance</label>
            <p>{information?.outstandBal}</p>
            {/* <input type="email" id="email" name="email" className={style.input} value={formData?.email} onChange={handleInputChange} required /> */}
          </div>
          <div className={style.formChild}>
            <label htmlFor="lastVisit">Amount</label>
            <p>{information?.amount}</p>
            {/* <input type="date" id="lastVisit" name="lastVisit" className={style.input} value={formData?.lastVisit?.slice(0,10)} onChange={handleInputChange} required /> */}
          </div>
          <div className={style.formChild}>
            <label htmlFor="phone">Total</label>
            <p>{information?.total}</p>
            {/* <input type="number" id="phone" name="phone" className={style.input}  value={formData?.phone} onChange={handleInputChange} required /> */}
          </div>
          <div className={style.formChild}>
            <label htmlFor="medCondition">Service Treatment Type</label>
            <p>{information?.treatmentType}</p>
            {/* <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required /> */}

          </div>
          <div className={style.formChild}>
            <label htmlFor="medCondition">Payment Status</label>
            <p>{information?.paymentStatus}</p>
            {/* <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required /> */}

          </div>
          <div className={style.formChild}>
            <label htmlFor="medCondition">Next Payment Due Date</label>
            <p>{information?.nextPayDueDate}</p>
            {/* <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required /> */}

          </div><div className={style.formChild}>
            <label htmlFor="medCondition">Payment Reference No</label>
            <p>{information?.paymentRefNo}</p>
            {/* <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required /> */}

          </div><div className={style.formChild}>
            <label htmlFor="medCondition">Address</label>
            <p>{information?.address}</p>
            {/* <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required /> */}

          </div><div className={style.formChild}>
            <label htmlFor="medCondition">Description</label>
            <p>{information?.desc}</p>
            {/* <input type="text" id="medCondition" name="medCondition" className={style.input}  value={formData?.medCondition} onChange={handleInputChange} required /> */}

          </div>
          {/* <br /> */}
          <div className={`${style.addAnother} ${style.noPrint} text-blue-500`}>
            
          </div>
          <div className={`flex gap-3 ${style.noPrint}`}>
            <button type="submit" className={`text-white bg-emsBlue ${style.submit}`} onClick={handlePrint}>Print </button>
            <button  className={`text-white bg-emsRed ${style.submit}`} onClick={handleClose}>Cancel</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AccountInfo
