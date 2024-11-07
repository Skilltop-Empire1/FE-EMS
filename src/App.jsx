import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./components/loader/Loader";
import LandingPage from "./pages/landingPage/mainPage/LandingPage";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";

// Lazy-loaded pages for optimized initial load
const AppLayout = lazy(() => import("./pages/app/AppLayout"));
const Dashboard = lazy(() => import("./pages/app/Dashboard/Dashboard"));
const Settings = lazy(() => import("./pages/app/SettingsPage/Settings"));
const UserSettings = lazy(() =>
  import("./pages/app/SettingsPage/UserSettings")
);
const Staff = lazy(() => import("./pages/app/Staff/Staff"));
const StaffNurse = lazy(() => import("./pages/app/Staff/StaffNurse"));
const Organizations = lazy(() =>
  import("./pages/app/Organization/Organizations")
);
const Patients = lazy(() => import("./pages/app/Patients/Patients"));
const Appointments = lazy(() =>
  import("./pages/app/Appointments/Appointments")
);
const Account = lazy(() => import("./pages/app/Account/Account"));
const Help = lazy(() => import("./pages/app/Help/Help"));
const Reports = lazy(() => import("./pages/app/Reports/Reports"));

// Simplified suspense wrapper for fallback loading
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/app",
    element: (
      // <ProtectedRoute>
      <SuspenseWrapper>
        <AppLayout />
        <Toaster />
      </SuspenseWrapper>
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "settings",
        element: (
          <SuspenseWrapper>
            <Settings />
          </SuspenseWrapper>
        ),
      },
      {
        path: "settings/user",
        element: (
          <SuspenseWrapper>
            <UserSettings />
          </SuspenseWrapper>
        ),
      },
      {
        path: "organization",
        element: (
          <SuspenseWrapper>
            <Organizations />
          </SuspenseWrapper>
        ),
      },
      {
        path: "staff",
        element: (
          <SuspenseWrapper>
            <Staff />
          </SuspenseWrapper>
        ),
        children: [
          {
            path: "doctors",
            element: (
              <SuspenseWrapper>
                <Staff type="doctors" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "nurses",
            element: (
              <SuspenseWrapper>
                <StaffNurse />
              </SuspenseWrapper>
            ),
          },
          {
            path: "pharmacists",
            element: (
              <SuspenseWrapper>
                <Staff type="pharmacists" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "lab-scientist",
            element: (
              <SuspenseWrapper>
                <Staff type="lab-scientist" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "radiographers",
            element: (
              <SuspenseWrapper>
                <Staff type="radiographers" />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: "patients",
        element: (
          <SuspenseWrapper>
            <Patients />
          </SuspenseWrapper>
        ),
      },
      {
        path: "appointments",
        element: (
          <SuspenseWrapper>
            <Appointments />
          </SuspenseWrapper>
        ),
      },
      {
        path: "account",
        element: (
          <SuspenseWrapper>
            <Account />
          </SuspenseWrapper>
        ),
      },
      {
        path: "reports",
        element: (
          <SuspenseWrapper>
            <Reports />
          </SuspenseWrapper>
        ),
        children: [
          {
            path: "admin",
            element: (
              <SuspenseWrapper>
                <Reports type="admin" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "doctors",
            element: (
              <SuspenseWrapper>
                <Reports type="doctor" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "nurses",
            element: (
              <SuspenseWrapper>
                <Reports type="nurses" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "pharmacy",
            element: (
              <SuspenseWrapper>
                <Reports type="pharmacists" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "laboratory",
            element: (
              <SuspenseWrapper>
                <Reports type="laboratory" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "radiology",
            element: (
              <SuspenseWrapper>
                <Reports type="radiology" />
              </SuspenseWrapper>
            ),
          },
          {
            path: "account",
            element: (
              <SuspenseWrapper>
                <Reports type="account" />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: "help",
        element: (
          <SuspenseWrapper>
            <Help />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
