// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import "./config/db.js";

// import adminRoutes from "./routes/adminRoutes.js";
// import adminServiceRoutes from "./routes/adminServiceRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
// import inquiryRoutes from "./routes/inquiryRoutes.js";
// import imageRoutes from "./routes/imageRoutes.js";
// import taxDeadlineRoutes from "./routes/taxDeadlineRoutes.js";
// import registrationRoutes from "./routes/registrationRoutes.js";
// import exportRoutes from "./routes/exportRoutes.js";
// import upload from "./middleware/uploadMiddleware.js";
// import dashboardRoutes     from "./routes/dashboardRoutes.js"; // 🆕 NEW (removed exportRoutes)



// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 

// app.use("/api/services", serviceRoutes);
// app.use("/api/inquiry", inquiryRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin", adminServiceRoutes);
// app.use("/api/images", imageRoutes);
// app.use("/api/tax-deadlines", taxDeadlineRoutes);
// app.use("/api/registration", registrationRoutes);
// app.use("/api/export", exportRoutes);
// // app.use("/uploads", express.static("uploads"));
// app.use("/api/dashboard",    dashboardRoutes);   // 🆕 NEW
// app.use("/uploads",          express.static("uploads"));

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminServiceRoutes from "./routes/adminServiceRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import taxDeadlineRoutes from "./routes/taxDeadlineRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import galleryRoutes from "./routes/galleryroutes.js"; // 🆕 NEW

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/services", serviceRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminServiceRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/tax-deadlines", taxDeadlineRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/gallery", galleryRoutes); // 🆕 NEW - Gallery management routes

// Static files
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});