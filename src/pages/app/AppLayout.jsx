import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import MainContainer from "../../components/mainContainer/MainContainer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}

export default AppLayout;
