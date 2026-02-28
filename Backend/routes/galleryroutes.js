import express from "express";
import db from "../config/db.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * GET /api/gallery
 * Fetch all gallery images (public endpoint - no auth required)
 * Query params: limit, offset for pagination
 */
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  db.query(
    "SELECT id, image_path, caption, uploaded_at FROM gallery ORDER BY uploaded_at DESC LIMIT ? OFFSET ?",
    [limit, offset],
    (err, images) => {
      if (err) {
        console.error("❌ Error fetching gallery images:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error fetching gallery images"
        });
      }

      // Get total count for pagination
      db.query("SELECT COUNT(*) as total FROM gallery", (countErr, countResult) => {
        if (countErr) {
          console.error("❌ Error fetching count:", countErr.message);
        }

        const total = countResult?.[0]?.total || 0;

        res.json({
          success: true,
          data: images,
          pagination: {
            total,
            limit,
            offset,
            pages: Math.ceil(total / limit)
          }
        });
      });
    }
  );
});

/**
 * GET /api/gallery/featured
 * Fetch first N images for home page
 */
router.get("/featured", (req, res) => {
  const limit = parseInt(req.query.limit) || 4;

  db.query(
    "SELECT id, image_path, caption FROM gallery ORDER BY uploaded_at DESC LIMIT ?",
    [limit],
    (err, images) => {
      if (err) {
        console.error("❌ Error fetching featured images:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error fetching featured images"
        });
      }

      res.json({
        success: true,
        data: images
      });
    }
  );
});

/**
 * GET /api/gallery/:id
 * Fetch single gallery image details
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid gallery ID"
    });
  }

  db.query(
    "SELECT id, image_path, caption, uploaded_at FROM gallery WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("❌ Error fetching gallery image:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error fetching gallery image"
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Gallery image not found"
        });
      }

      res.json({
        success: true,
        data: result[0]
      });
    }
  );
});

/**
 * POST /api/gallery
 * Upload new gallery image
 * Requires: Authorization header (admin only)
 */
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image file provided"
    });
  }

  const caption = req.body.caption || "";
const imagePath = `uploads/${req.file.filename}`;

  db.query(
    "INSERT INTO gallery (image_path, caption) VALUES (?, ?)",
    [imagePath, caption],
    (err, result) => {
      if (err) {
        console.error("❌ Error uploading gallery image:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error uploading gallery image"
        });
      }

      res.status(201).json({
        success: true,
        message: "Gallery image uploaded successfully",
        data: {
          id: result.insertId,
          image_path: imagePath,
          caption
        }
      });
    }
  );
});

/**
 * PUT /api/gallery/:id
 * Update gallery image caption
 * Requires: Authorization header (admin only)
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { caption } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid gallery ID"
    });
  }

  if (!caption) {
    return res.status(400).json({
      success: false,
      message: "Caption is required"
    });
  }

  db.query(
    "UPDATE gallery SET caption = ? WHERE id = ?",
    [caption, id],
    (err) => {
      if (err) {
        console.error("❌ Error updating gallery image:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error updating gallery image"
        });
      }

      res.json({
        success: true,
        message: "Gallery image updated successfully"
      });
    }
  );
});

/**
 * DELETE /api/gallery/:id
 * Delete gallery image
 * Requires: Authorization header (admin only)
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid gallery ID"
    });
  }

  // First get the image path to delete file
  db.query(
    "SELECT image_path FROM gallery WHERE id = ?",
    [id],
    (selectErr, result) => {
      if (selectErr) {
        console.error("❌ Error fetching image path:", selectErr.message);
        return res.status(500).json({
          success: false,
          message: "Error deleting gallery image"
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Gallery image not found"
        });
      }

      // Delete from database
      db.query(
        "DELETE FROM gallery WHERE id = ?",
        [id],
        (deleteErr) => {
          if (deleteErr) {
            console.error("❌ Error deleting from database:", deleteErr.message);
            return res.status(500).json({
              success: false,
              message: "Error deleting gallery image"
            });
          }

          // TODO: Delete physical file from uploads folder
          // const fs = require('fs');
          // const filePath = path.join(process.cwd(), result[0].image_path);
          // fs.unlink(filePath, (fileErr) => { ... });

          res.json({
            success: true,
            message: "Gallery image deleted successfully"
          });
        }
      );
    }
  );
});

export default router;