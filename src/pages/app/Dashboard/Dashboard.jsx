import React from "react";
import html2pdf from 'html2pdf.js';
import styles from './dashboardStyle.module.css'

const Dashboard = () => {

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
          <h2>Number of Organisations</h2>
          <p>5</p>
        </div>
        <div className={styles.box}>
          <h2>Number of Nurses</h2>
          <p></p>
        </div>
        <div className={styles.box}>
          <h2>Number of Doctors</h2>
          <p>2</p>
        </div>
        <div className={styles.box}>
          <h2>Number of Patients</h2>
          <p></p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tableContainer}>
          <h2>Recent Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Patients</th>
                <th>Consulting Doctor</th>
                <th>Date of Appointment</th>
                <th>Practice</th>
                <th>Organisation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Doctor A</td>
                <td>11/15/2023</td>
                <td>Practice A</td>
                <td>Organization A</td>
              </tr>
              <tr>
                <td></td>
                <td>Doctor A</td>
                <td>11/01/2023</td>
                <td>Practice A</td>
                <td>Organization A</td>
              </tr>
              <tr>
                <td>Sam Johnson</td>
                <td></td>
                <td>11/16/2023</td>
                <td>Practice A</td>
                <td>Organization A.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.recentDoctor}>
          <div className={styles.docList}>
            <h2>Recently Added Doctors</h2>
            <ul className={styles.ul}>
              <li>
                <div className={styles.docIcon}>
                  <i className="fa-solid fa-person"></i>
                </div>
                <span>Dr. Pankaj</span>
                <span>Cardiologist</span>
              </li>
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
