import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://bnnarwadeandco.com";

// ================================
// Load Favicon from API
// ================================
axios
  .get(`${API_URL}/api/images/type/logo`)
  .then((res) => {
    const logoId = res.data.id;
    const faviconUrl = `${API_URL}/api/images/${logoId}`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  })
  .catch((err) => {
    console.log("Failed to load favicon:", err.message);
  });

// ================================
// Render App
// ================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);