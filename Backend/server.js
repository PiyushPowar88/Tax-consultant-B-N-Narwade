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


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/services", serviceRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminServiceRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/tax-deadlines", taxDeadlineRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
