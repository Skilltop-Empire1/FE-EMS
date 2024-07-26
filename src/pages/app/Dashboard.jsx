import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 style={{ textAlign: "left" }}>Dashboard</h1>
      <div className="boxes">
        <div className="box">
          <h2>Number of Organisations</h2>
          <p>5</p>
        </div>
        <div className="box">
          <h2>Number of Nurses</h2>
          <p></p>
        </div>
        <div className="box">
          <h2>Number of Doctors</h2>
          <p>2</p>
        </div>
        <div className="box">
          <h2>Number of Patients</h2>
          <p></p>
        </div>
      </div>
      <div className="content">
        <div className="table-container">
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
        <div className="recent-doctors">
          <div className="doc-list" style={{ backgroundColor: "white" }}>
            <h2>Recently Added Doctors</h2>
            <ul>
              <li>
                <div className="doc-icon">
                  <i className="fa-solid fa-person"></i>
                </div>
                <span>Dr. Pankaj</span>
                <span>Cardiologist</span>
              </li>
              <li>
                <div className="doc-icon">
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
  );
};

export default Dashboard;
