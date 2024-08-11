import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard/Dashboard";
import Settings from "./pages/app/SettingsPage/Settings";
import AppLayout from "./pages/app/AppLayout";
import Organizations from "./pages/app/Organization/Organizations";
import Staff from "./pages/app/Staff/Staff";
import Patients from "./pages/app/Patients/Patients";
import Appointments from "./pages/app/Appointments/Appointments";
import Account from "./pages/app/Account/Account";
import Help from "./pages/app/Help/Help";
import Reports from "./pages/app/Reports/Reports";

const App = () => {
  return (
    <>
      {/* <LandingPageLayout /> */}

      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/organization" element={<Organizations />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
