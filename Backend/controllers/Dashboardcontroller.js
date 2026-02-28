import db from "../config/db.js";
import fs from "fs";
import path from "path";


// =====================================================
// ✅ GET ALL INCOME TAX REGISTRATIONS
// =====================================================
export const getIncomeTaxList = (req, res) => {
  db.query("SELECT * FROM income_tax_registration ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


// =====================================================
// ✅ GET ALL GST REGISTRATIONS
// =====================================================
export const getGSTList = (req, res) => {
  db.query("SELECT * FROM gst_registration ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


// =====================================================
// ✅ GET ALL UDYAM REGISTRATIONS
// =====================================================
export const getUdyamList = (req, res) => {
  db.query("SELECT * FROM udyam_registration ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


// =====================================================
// ✅ DOWNLOAD ANY UPLOADED FILE (image or PDF)
// =====================================================
export const downloadFile = (req, res) => {
  // filePath comes as query param, e.g. ?file=uploads/1234567-photo.jpg
  const filePath = req.query.file;

  if (!filePath) {
    return res.status(400).json({ message: "File path is required" });
  }

  // Security: prevent path traversal attacks
  const resolvedPath = path.resolve(filePath);
  const uploadsDir   = path.resolve("./uploads");

  if (!resolvedPath.startsWith(uploadsDir)) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).json({ message: "File not found" });
  }

  // Send file as download (works for images, PDFs, anything)
  res.download(resolvedPath, path.basename(resolvedPath), (err) => {
    if (err) {
      console.log("Download Error:", err.message);
      res.status(500).json({ message: "Download failed" });
    }
  });
};


// =====================================================
// ✅ GET DASHBOARD SUMMARY COUNT
// =====================================================
export const getDashboardSummary = (req, res) => {
  const queries = {
    income_tax: "SELECT COUNT(*) AS count FROM income_tax_registration",
    gst:        "SELECT COUNT(*) AS count FROM gst_registration",
    udyam:      "SELECT COUNT(*) AS count FROM udyam_registration"
  };

  const results = {};
  let completed = 0;
  const keys = Object.keys(queries);

  keys.forEach((key) => {
    db.query(queries[key], (err, rows) => {
      if (err) return res.status(500).json(err);
      results[key] = rows[0].count;
      completed++;
      if (completed === keys.length) {
        res.json(results);
      }
    });
  });
};


// =====================================================
// ✅ DELETE REGISTRATION BY ID
// =====================================================
export const deleteRegistration = (req, res) => {
  const { type, id } = req.params;

  const tables = {
    "income-tax": "income_tax_registration",
    "gst":        "gst_registration",
    "udyam":      "udyam_registration"
  };

  const table = tables[type];
  if (!table) return res.status(400).json({ message: "Invalid type" });

  db.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
};