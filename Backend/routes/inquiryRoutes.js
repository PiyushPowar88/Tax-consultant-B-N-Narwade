import express from "express";
import db from "../config/db.js";
import transporter from "../config/email.js";
import { getAdminEmailTemplate, getUserEmailTemplate } from "../utils/emailTemplates.js";

const router = express.Router();

/* Submit New Inquiry */
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate inputs
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields (name, email, phone, message) are required" 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid email format" 
    });
  }

  try {
    // Check if inquiry from this email/phone already exists
    db.query(
      "SELECT id, visit_count FROM inquiries WHERE email = ? OR phone = ? ORDER BY id DESC LIMIT 1",
      [email, phone],
      async (selectErr, existing) => {
        if (selectErr) {
          console.error("❌ Error checking existing inquiry:", selectErr.message);
        }

        const visitCount = (existing && existing.length > 0) ? existing[0].visit_count + 1 : 1;

        // Insert into database with visit_count
        db.query(
          "INSERT INTO inquiries (name, email, phone, message, visit_count, is_read) VALUES (?, ?, ?, ?, ?, 0)",
          [name, email, phone, message, visitCount],
          async (insertErr, result) => {
            if (insertErr) {
              console.error("❌ Database insert error:", insertErr.message);
              return res.status(500).json({ 
                success: false, 
                message: "Error submitting inquiry" 
              });
            }

            // Fetch all admin emails from database
            db.query("SELECT email FROM admins WHERE status = 'active'", async (adminErr, admins) => {
              if (adminErr) {
                console.log("❌ Failed to fetch admin emails:", adminErr.message);
              }

              const adminEmails = (admins && admins.length > 0) 
                ? admins.map(admin => admin.email) 
                : [];

              // Send emails to all admins
              if (adminEmails.length > 0) {
                const adminTemplate = getAdminEmailTemplate(name, email, phone, message);
                try {
                  await transporter.sendMail({
                    from: process.env.EMAIL_USER || "noreply@example.com",
                    to: adminEmails.join(", "),
                    subject: adminTemplate.subject,
                    html: adminTemplate.html,
                  });
                  console.log("✅ Admin emails sent to:", adminEmails.join(", "));
                } catch (emailErr) {
                  console.error("❌ Failed to send admin emails:", emailErr.message);
                }
              } else {
                console.log("⚠️ No admin emails found in database");
              }

              // Send confirmation email to user
              const userTemplate = getUserEmailTemplate(name);
              try {
                await transporter.sendMail({
                  from: process.env.EMAIL_USER || "noreply@example.com",
                  to: email,
                  subject: userTemplate.subject,
                  html: userTemplate.html,
                });
                console.log("✅ User confirmation email sent to:", email);
              } catch (emailErr) {
                console.error("❌ Failed to send user email:", emailErr.message);
              }

              res.status(201).json({ 
                success: true, 
                message: "Inquiry submitted successfully. Confirmation email sent.",
                inquiryId: result.insertId
              });
            });
          }
        );
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error submitting inquiry" 
    });
  }
});

/* Get All Inquiries (Admin) */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM inquiries ORDER BY created_at DESC, id DESC",
    (err, result) => {
      if (err) {
        console.error("❌ Error fetching inquiries:", err.message);
        return res.status(500).json({ 
          success: false, 
          message: "Error fetching inquiries" 
        });
      }
      res.json({ 
        success: true, 
        data: result,
        count: result.length 
      });
    }
  );
});

/* Get Single Inquiry */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid inquiry ID" 
    });
  }

  db.query(
    "SELECT * FROM inquiries WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("❌ Error fetching inquiry:", err.message);
        return res.status(500).json({ 
          success: false, 
          message: "Error fetching inquiry" 
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "Inquiry not found" 
        });
      }

      res.json({ 
        success: true, 
        data: result[0] 
      });
    }
  );
});

/* Mark As Read */
router.put("/:id/read", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid inquiry ID" 
    });
  }

  db.query(
    "UPDATE inquiries SET is_read = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("❌ Error updating inquiry:", err.message);
        return res.status(500).json({ 
          success: false, 
          message: "Error updating inquiry" 
        });
      }
      res.json({ 
        success: true, 
        message: "Inquiry marked as read" 
      });
    }
  );
});

/* Delete Inquiry */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid inquiry ID" 
    });
  }

  db.query(
    "DELETE FROM inquiries WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("❌ Error deleting inquiry:", err.message);
        return res.status(500).json({ 
          success: false, 
          message: "Error deleting inquiry" 
        });
      }
      res.json({ 
        success: true, 
        message: "Inquiry deleted successfully" 
      });
    }
  );
});

export default router;