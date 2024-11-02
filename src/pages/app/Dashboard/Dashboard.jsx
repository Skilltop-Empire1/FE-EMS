import React from "react";
import html2pdf from 'html2pdf.js';
import styles from './dashboardStyle.module.css'
import { PersonStanding, HouseIcon, Notebook,  } from "lucide-react";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import { NavLink } from "react-router-dom";

const Dashboard = () => {

  const {data: patientList, error: patientError, isLoading: patientLoading} = useFetchResourceQuery('/api/v1/patient/list')
  const {data: doctorList, error: doctorError, isLoading: doctorLoading} = useFetchResourceQuery('/api/v1/staff/doctor/all')
  const {data: nurseList, error: nurseError, isLoading: nurseLoading} = useFetchResourceQuery('/api/v1/staff/nurses/all')
  const {data: appointmentList, error: appointmentError, isLoading: appointmentLoading} = useFetchResourceQuery('/api/v1/appointments')
  const {data: departmentList, error: departmentError, isLoading: departmentLoading} = useFetchResourceQuery('api/v1/departments/list')
  console.log(patientList)
  const handleDownloadPdf = () => {
    const element = document.getElementById('content-to-print');
    const options = {
      margin: 0.5,
      filename: 'my-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };




  return (
    <div className={styles.body}>

    <div className={styles.dashboard} id="content-to-print">
      <div className={styles.top}>
        <h2 className={styles.title}>Dashboard</h2>
        <button onClick={handleDownloadPdf}>Download PDF</button>
      </div>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <p><HouseIcon/></p>
          <h2>Number of Department</h2>
          {/* <p>{departmentList.length}</p> */}
        </div>
        <div className={styles.box}>
          <p><PersonStanding/></p>
          <h2>Number of Nurses</h2>
          <p>{nurseList?.nurse?.length}</p>
          <p></p>
        </div>
        <div className={styles.box}>
          <p><PersonStanding/></p>
          <h2>Number of Doctors</h2>
          <p>{doctorList?.totalDoctors}</p>
        </div>
        <div className={styles.box}>
          <p><Notebook/></p>
          <h2>Number of Appointment Booked</h2>
          {/* <p>{appointmentList.length}</p> */}
        </div>
        <div className={styles.box}>
          <p><PersonStanding/></p>
          <h2>Number of Patients</h2>
          <p>{patientList?.length}</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tableContainer}>
          <h2>Recent Appointments</h2>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Patients</th>
                <th className={styles.th}>Consulting Doctor</th>
                <th className={styles.th}>Date of Appointment</th>
                <th className={styles.th}>Practice</th>
                <th className={styles.th}>Organisation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.td}></td>
                <td className={styles.td}>Doctor A</td>
                <td className={styles.td}>Doctor A</td>
                <td className={styles.td}>11/15/2023</td>
                <td className={styles.td}>Practice A</td>
              </tr>
              <tr>
                <td className={styles.td}></td>
                <td className={styles.td}>Doctor A</td>
                <td className={styles.td}>11/01/2023</td>
                <td className={styles.td}>Practice A</td>
                <td className={styles.td}>Organization A</td>
              </tr>
              <tr>
                <td className={styles.td}>Sam Johnson</td>
                <td className={styles.td}></td>
                <td className={styles.td}>11/16/2023</td>
                <td className={styles.td}>Practice A</td>
                <td className={styles.td}>Organization A.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.recentDoctor}>
          <div className={styles.docList}>
            <div className="flex justify-between ">
            <h2 className="text-md">Recently Added Doctors</h2>
            <NavLink to="doctors"><p className="font-light underline">See full list</p></NavLink>
            </div>
            <ul className={styles.ul}>
              {doctorLoading ? (
              <div>Loading</div>
              ) :
              doctorError ? (
              <div> Error loading doctors</div>
              ) :
              doctorList.doctors.map((doctor, idx)=> {
                return (<li key={idx} className='my-2'>
                  <div className={styles.docIcon}>
                    <i className="fa-solid fa-person"></i>
                  </div>
                  <p>Name: {doctor.firstName} {doctor.lastName}</p>
                  <p>Contact: {doctor.phone}</p>
                  <p>Speciality: {doctor.departmentName}</p>
                </li>)
              })
              }
              <li>
                <div className={styles.docIcon}>
                  <i className="fa-solid fa-person"></i>
                </div>
                <span>Doctor A</span>
                <span>Anesthesiologist</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
