import express from "express";
import {
  getIncomeTaxList,
  getGSTList,
  getUdyamList,
  downloadFile,
  getDashboardSummary,
  deleteRegistration
} from "../controllers/dashboardController.js";

const router = express.Router();

// Summary count for all 3 modules
router.get("/summary", getDashboardSummary);

// List all registrations per type
router.get("/income-tax", getIncomeTaxList);
router.get("/gst",        getGSTList);
router.get("/udyam",      getUdyamList);
router.delete("/:type/:id", deleteRegistration);

// Universal file download
router.get("/download", downloadFile);

export default router;