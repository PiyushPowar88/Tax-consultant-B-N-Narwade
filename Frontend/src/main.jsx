import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";


// ================================
// Load Favicon from API
// ================================
axios
  .get("http://localhost:5000/api/images/type/logo")
  .then((res) => {

    const logoId = res.data.id;

    const faviconUrl = `http://localhost:5000/api/images/${logoId}`;

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
