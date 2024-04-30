import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { Router } from "@infra/routes/Router";
import { AuthContextProvider } from "@contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>
);
