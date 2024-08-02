// ToggleIcons.js
import React from "react";

export const CheckedIcon = () => (
  <svg
    width="50"
    height="24"
    viewBox="0 0 50 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="50" height="24" rx="12" fill="#3F51B5" />
    <circle cx="38" cy="12" r="10" fill="#fff" stroke="#000" strokeWidth="0" />
  </svg>
);

export const UncheckedIcon = () => (
  <svg
    width="50"
    height="24"
    viewBox="0 0 50 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="50" height="24" rx="12" fill="#ddd" />
    <circle cx="12" cy="12" r="10" fill="#fff" stroke="#000" strokeWidth="0" />
  </svg>
);
