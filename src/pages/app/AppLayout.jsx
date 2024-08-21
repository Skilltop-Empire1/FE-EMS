import React, { useState } from "react";
import LandingPageLayout from "../landingPage/LandingPageLayout";
import Layout from "./Layout";

function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <>{isLoggedIn ? <Layout /> : <LandingPageLayout />}</>;
}

export default AppLayout;
