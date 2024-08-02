import React from "react";
import Navbar from "../../components/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
