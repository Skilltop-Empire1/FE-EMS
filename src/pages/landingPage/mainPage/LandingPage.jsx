import React from "react";
import LandingPageNavBar from "../nav/LandingPageNavBar";
import LandingPageLayout from "../layout/LandingPageLayout";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <>
      <LandingPageNavBar />
      <LandingPageLayout />
    </>
  );
};

export default LandingPage;
