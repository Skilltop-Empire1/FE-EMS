import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard/Dashboard";
import Settings from "./pages/app/SettingsPage/Settings";
import AppLayout from "./pages/app/AppLayout";

const App = () => {
  return (
    <>
      {/* <LandingPageLayout /> */}
      <Routes>
        <Route path="/" element={<AppLayout />}>

          <Route index element={<Dashboard />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
