import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./components/loader/Loader";

const AppLayout = lazy(() => import("./pages/app/AppLayout"));
const Dashboard = lazy(() => import("./pages/app/Dashboard/Dashboard"));
const Settings = lazy(() => import("./pages/app/SettingsPage/Settings"));
const Organizations = lazy(() =>
  import("./pages/app/Organization/Organizations")
);
const Staff = lazy(() => import("./pages/app/Staff/Staff"));
const Patients = lazy(() => import("./pages/app/Patients/Patients"));
const Appointments = lazy(() =>
  import("./pages/app/Appointments/Appointments")
);
const Account = lazy(() => import("./pages/app/Account/Account"));
const Help = lazy(() => import("./pages/app/Help/Help"));
const Reports = lazy(() => import("./pages/app/Reports/Reports"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AppLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "organization",
        element: (
          <Suspense fallback={<Loader />}>
            <Organizations />
          </Suspense>
        ),
      },
      {
        path: "staff",
        element: (
          <Suspense fallback={<Loader />}>
            <Staff />
          </Suspense>
        ),
        children: [
          {
            path: "doctors",
            element: (
              <Suspense fallback={<Loader />}>
                <Staff />
              </Suspense>
            ),
          },
          {
            path: "nurses",
            element: (
              <Suspense fallback={<Loader />}>
                <Staff />
              </Suspense>
            ),
          },
          {
            path: "pharmacists",
            element: (
              <Suspense fallback={<Loader />}>
                <Staff />
              </Suspense>
            ),
          },
          {
            path: "lab-scientist",
            element: (
              <Suspense fallback={<Loader />}>
                <Staff />
              </Suspense>
            ),
          },
          {
            path: "radiographers",
            element: (
              <Suspense fallback={<Loader />}>
                <Staff />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "patients",
        element: (
          <Suspense fallback={<Loader />}>
            <Patients />
          </Suspense>
        ),
      },
      {
        path: "appointments",
        element: (
          <Suspense fallback={<Loader />}>
            <Appointments />
          </Suspense>
        ),
      },
      {
        path: "account",
        element: (
          <Suspense fallback={<Loader />}>
            <Account />
          </Suspense>
        ),
      },
      {
        path: "reports",
        element: (
          <Suspense fallback={<Loader />}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: "help",
        element: (
          <Suspense fallback={<Loader />}>
            <Help />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
