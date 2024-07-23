import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard";
import Settings from "./pages/app/Settings";
import AppLayout from "./pages/app/AppLayout";

const App = () => {
  return (
    <>
      {/* <LandingPageLayout /> */}
      <Routes>
        <Route path="/" element={<AppLayout />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </>
  );
};

export default App;
