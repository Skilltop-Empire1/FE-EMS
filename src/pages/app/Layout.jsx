import React from "react";
import Navbar from "../../components/Navbar";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
