import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { Router } from "@infra/routes/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
