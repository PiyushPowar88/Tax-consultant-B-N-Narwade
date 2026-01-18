import express from "express";
import db from "../config/db.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."));
    }
  }
});

/* UPLOAD IMAGE (ADMIN ONLY) */
router.post("/upload", verifyAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { image_type, image_name, service_id } = req.body;
  const imageData = req.file.buffer;

  if (!image_type) {
    return res.status(400).json({ message: "Image type is required" });
  }

  db.query(
    "INSERT INTO images (image_type, image_name, image_data, service_id) VALUES (?, ?, ?, ?)",
    [image_type, image_name || req.file.originalname, imageData, service_id ? parseInt(service_id) : null],
    (err, result) => {
      if (err) {
        console.log("Image upload error:", err);
        return res.status(500).json({ message: "Failed to upload image", error: err.message });
      }
      res.status(201).json({
        message: "Image uploaded successfully",
        id: result.insertId
      });
    }
  );
});

/* GET IMAGE BY ID */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT image_data, image_type FROM images WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch image" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Image not found" });
      }

      const { image_data, image_type } = result[0];
      res.set("Content-Type", image_type || "image/jpeg");
      res.send(image_data);
    }
  );
});

/* GET IMAGE BY TYPE (e.g., owner, hero, etc.) */
router.get("/type/:image_type", (req, res) => {
  db.query(
    "SELECT id, image_type, image_name FROM images WHERE image_type = ? ORDER BY id DESC LIMIT 1",
    [req.params.image_type],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch image" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.json(result[0]);
    }
  );
});

/* GET ALL IMAGES (ADMIN ONLY) */
router.get("/admin/all", verifyAdmin, (req, res) => {
  db.query(
    "SELECT id, image_type, image_name, service_id, created_at FROM images ORDER BY created_at DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch images" });
      }
      res.json(result);
    }
  );
});

/* DELETE IMAGE (ADMIN ONLY) */
router.delete("/:id", verifyAdmin, (req, res) => {
  db.query(
    "DELETE FROM images WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete image" });
      }
      res.json({ message: "Image deleted successfully" });
    }
  );
});

export default router;
