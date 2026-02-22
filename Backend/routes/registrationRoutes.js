import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  saveIncomeTaxRegistration,
  saveGSTRegistration,
  saveUdyamRegistration
} from "../controllers/registrationController.js";

const router = express.Router();

router.post(
  "/income-tax",
  upload.fields([
    { name: "aadhaar_photo" },
    { name: "pan_photo" }
  ]),
  saveIncomeTaxRegistration
);

router.post(
  "/gst",
  upload.fields([
    { name: "pan_photo" },
    { name: "aadhaar_photo" },
    { name: "proprietor_photo" },
    { name: "business_address_proof" },
    { name: "shop_act_license" },
    { name: "udyam_certificate" },
    { name: "shop_photo" },
    { name: "bank_proof" }
  ]),
  saveGSTRegistration
);

router.post(
  "/udyam",
  upload.fields([
    { name: "pan_photo" },
    { name: "aadhaar_photo" },
    { name: "proprietor_photo" },
    { name: "business_address_proof" },
    { name: "shop_act_license" },
    { name: "bank_proof" }
  ]),
  saveUdyamRegistration
);

export default router;