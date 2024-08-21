import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import LandingPage from "./LandingPage";
import Navbar from "../../components/Navbar";

function LandingPageLayout() {
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}

export default LandingPageLayout;
