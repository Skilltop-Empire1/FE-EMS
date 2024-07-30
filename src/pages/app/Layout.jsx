import React from "react";
import Navbar from "../../components/Navbar";
import Dashboard from "./Dashboard";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
