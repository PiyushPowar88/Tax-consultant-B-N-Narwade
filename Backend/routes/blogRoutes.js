import express from "express";
import db from "../config/db.js";
import upload from "../middleware/uploadMiddleware.js";
import fs from "fs";
import path from "path";
 
const router = express.Router();
 
/* ================= GET ALL BLOGS (Public) ================= */
router.get("/", (req, res) => {
  db.query(
    "SELECT id, title, summary, author, category, created_at, image_path FROM blogs ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });
      res.json(results);
    }
  );
});
 
/* ================= GET SINGLE BLOG (Public) ================= */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM blogs WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      if (results.length === 0) return res.status(404).json({ message: "Blog not found" });
      res.json(results[0]);
    }
  );
});
 
/* ================= GET BLOG IMAGE ================= */
router.get("/:id/image", (req, res) => {
  db.query(
    "SELECT image_path FROM blogs WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err || results.length === 0) return res.status(404).json({ message: "Not found" });
      const imagePath = results[0].image_path;
      if (!imagePath || !fs.existsSync(imagePath)) {
        return res.status(404).json({ message: "Image file not found" });
      }
      res.sendFile(path.resolve(imagePath));
    }
  );
});
 
/* ================= CREATE BLOG (Admin) ================= */
router.post("/", upload.single("image"), (req, res) => {
  const { title, summary, content, author, category } = req.body;
 
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Title, summary, and content are required" });
  }
 
  const imagePath = req.file ? `./uploads/${req.file.filename}` : null;
 
  db.query(
    "INSERT INTO blogs (title, summary, content, author, category, image_path) VALUES (?, ?, ?, ?, ?, ?)",
    [title, summary, content, author || "Admin", category || "General", imagePath],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Insert error", error: err });
      res.status(201).json({ message: "Blog created", id: result.insertId });
    }
  );
});
 
/* ================= UPDATE BLOG (Admin) ================= */
router.put("/:id", upload.single("image"), (req, res) => {
  const { title, summary, content, author, category } = req.body;
  const { id } = req.params;
 
  db.query("SELECT image_path FROM blogs WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: "Blog not found" });
 
    const oldImagePath = results[0].image_path;
    const newImagePath = req.file ? `./uploads/${req.file.filename}` : oldImagePath;
 
    if (req.file && oldImagePath && fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
 
    db.query(
      "UPDATE blogs SET title=?, summary=?, content=?, author=?, category=?, image_path=? WHERE id=?",
      [title, summary, content, author, category, newImagePath, id],
      (err) => {
        if (err) return res.status(500).json({ message: "Update error" });
        res.json({ message: "Blog updated successfully" });
      }
    );
  });
});
 
/* ================= DELETE BLOG (Admin) ================= */
router.delete("/:id", (req, res) => {
  db.query("SELECT image_path FROM blogs WHERE id = ?", [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: "Blog not found" });
 
    const imagePath = results[0].image_path;
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
 
    db.query("DELETE FROM blogs WHERE id = ?", [req.params.id], (err) => {
      if (err) return res.status(500).json({ message: "Delete error" });
      res.json({ message: "Blog deleted successfully" });
    });
  });
});
 
export default router;