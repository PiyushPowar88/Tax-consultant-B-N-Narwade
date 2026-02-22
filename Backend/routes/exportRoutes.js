import express from "express";
import {
  exportIncomeTax,
  exportGST,
  exportUdyam
} from "../controllers/exportController.js";

const router = express.Router();

router.get("/income-tax", exportIncomeTax);
router.get("/gst", exportGST);
router.get("/udyam", exportUdyam);

export default router;