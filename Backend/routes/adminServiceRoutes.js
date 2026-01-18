import express from "express";
import db from "../config/db.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

/* ===== Multer Memory Storage ===== */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."));
  }
});

/* ================= SERVICES CRUD ================= */

router.post("/services", verifyAdmin, (req, res) => {
  const { title, short_description, full_description } = req.body;

  db.query(
    "INSERT INTO services (title, short_description, full_description) VALUES (?,?,?)",
    [title, short_description, full_description],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Service Added", id: result.insertId });
    }
  );
});

router.get("/services", verifyAdmin, (req, res) => {
  db.query("SELECT * FROM services", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.put("/services/:id", verifyAdmin, (req, res) => {
  const { title, short_description, full_description } = req.body;

  db.query(
    "UPDATE services SET title=?, short_description=?, full_description=? WHERE id=?",
    [title, short_description, full_description, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Service Updated" });
    }
  );
});

router.delete("/services/:id", verifyAdmin, (req, res) => {
  db.query("DELETE FROM services WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Service Deleted" });
  });
});

/* ================= IMAGE UPLOAD ================= */

router.post(
  "/services/upload-image",
  verifyAdmin,
  upload.single("image"),
  (req, res) => {
    const { service_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageBuffer = req.file.buffer;

    db.query(
      "UPDATE services SET image=? WHERE id=?",
      [imageBuffer, service_id],
      (err) => {
        if (err) {
          console.log("DB Image Save Error:", err);
          return res.status(500).json({ message: "Image save failed" });
        }
        res.json({ message: "Image uploaded successfully" });
      }
    );
  }
);

/* ================= IMAGE FETCH ================= */

router.get("/services/:id/image", (req, res) => {
  db.query(
    "SELECT image FROM services WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).end();

      if (result.length === 0 || !result[0].image) {
        return res.status(404).end();
      }

      res.set("Content-Type", "image/png");
      res.send(result[0].image);
    }
  );
});

export default router;
