import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/slice/loginSlice";

function ProtectedRoute({ children }) {
  const [lastActive, setLastActive] = useState(Date.now());
  const dispatch = useDispatch();
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  const resetIdleTimeout = () => setLastActive(Date.now());

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimeout);
    });

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActive > sessionTimeout) {
        dispatch(logout());
      }
    }, 6000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimeout);
      });
      clearInterval(checkInactivity);
    };
  }, [lastActive, dispatch]);

  if (!token) {
    console.log("No token");
    return <Navigate to={"/login"} />;
  }

  return children; // Render the protected route children if valid
}

export default ProtectedRoute;
