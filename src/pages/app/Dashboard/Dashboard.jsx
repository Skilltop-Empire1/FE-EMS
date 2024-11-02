import React from "react";
import html2pdf from 'html2pdf.js';
import styles from './dashboardStyle.module.css'
import { PersonStanding, HouseIcon, Notebook,  } from "lucide-react";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";
import logo from '@src/components/profile.png'
import { NavLink } from "react-router-dom";

const Dashboard = () => {

  const {data: patientList, error: patientError, isLoading: patientLoading} = useFetchResourceQuery('/patient/list')
  const {data: doctorList, error: doctorError, isLoading: doctorLoading} = useFetchResourceQuery('/staff/doctor/all')
  const {data: nurseList, error: nurseError, isLoading: nurseLoading} = useFetchResourceQuery('/staff/nurses/all')
  const {data: appointmentList, error: appointmentError, isLoading: appointmentLoading} = useFetchResourceQuery('/appointment')
  const {data: departmentList, error: departmentError, isLoading: departmentLoading} = useFetchResourceQuery('/department/list')
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
          <p>{departmentList?.length}</p>
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
          <h2>No of Appointment Booked</h2>
          <p>{appointmentList?.appointments?.length}</p>
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
              
              
               {appointmentLoading ? (<div>Loading</div>)
               : 
               appointmentError? (<div>Error</div>)
               :
               appointmentList?.appointments?.map((appointment, idx)=> {
                return (
                  <tr key={idx}>
                     
                      <td className={styles.td}>{appointment.patName}</td>
                      <td className={styles.td}>{appointment?.staff?.firstName}</td>
                      <td className={styles.td}>{appointment.createdAt?.slice(0,10)}</td>
                      <td className={styles.td}>{appointment?.staff?.specialization}</td>
                      <td className={styles.td}>{appointment?.department?.name}</td>
                  </tr>
                )
               }).slice(appointmentList?.appointments.length - 5, appointmentList?.appointments.length)
               }
            </tbody>
          </table>
        </div>
        <div className={styles.recentDoctor}>
          <div className={styles.docList}>
            <div className="flex justify-between ">
            <h2 className="text-md">Recently Added Doctors</h2>
            <NavLink to="/app/doctors"><p className="font-light underline">See full list</p></NavLink>
            </div>
            <ul className={styles.ul}>
              {doctorLoading ? (
              <div>Loading</div>
              ) :
              doctorError ? (
              <div> Error loading doctors</div>
              ) :
              doctorList.doctors.map((doctor, idx)=> {
                return (
                <li key={idx} className='my-2 flex items-center justify-between'>
                  <div className="flex gap-2 items-center">
                    <img src={logo} alt="" className="w-10 h-10 "/>
                    <div>
                      <p className="flex justify-between"> <span>Name: </span></p>
                      <p className="flex justify-between"> <span>Contact Details: </span></p>
                      <p className="flex justify-between"> <span>Speciality: </span></p>
                      </div>   
                  </div>
                  <div>
                    <p className="flex justify-between"><span>{doctor.firstName} {doctor.lastName}</span></p>
                    <p className="flex justify-between"><span>{doctor.phone}</span></p>
                    <p className="flex justify-between"><span>{doctor.departmentName}</span></p>                   
                  </div>
                </li>)
              }).slice(doctorList?.doctors.length - 3, doctorList?.doctors.length)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Dashboard;
