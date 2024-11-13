import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";

import ModalProvider from "./context/ModalContext";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
