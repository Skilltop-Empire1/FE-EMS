import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/slice/loginSlice";

function ProtectedRoute({ children }) {
  const [lastActive, setLastActive] = useState(Date.now());
  const dispatch = useDispatch();
  const sessionTimeout = 30 * 60 * 1000;
  const token = localStorage.getItem("token");

  const resetIdleTimeout = () => setLastActive(Date.now());

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimeout);
    });

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActive > sessionTimeout) {
        dispatchEvent(logout());
      }
    }, 6000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimeout);
      });
      clearInterval(checkInactivity);
    };
  }, [lastActive, dispatch]);

  const isValidToken = (token) => {
    if (!token) return false;

    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  if (!token || isValidToken) {
    <Navigate to={"/login"} />;
  }
  return children;
}

export default ProtectedRoute;
