import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";

import ModalProvider from "./context/ModalContext";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
