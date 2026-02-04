import express from "express";
import db from "../config/db.js";
import transporter from "../config/email.js";
import { getAdminEmailTemplate, getUserEmailTemplate } from "../utils/emailTemplates.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate inputs
  if (!name || !email || !phone || !message) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    // Insert into database
    db.query(
      "INSERT INTO inquiries (name,email,phone,message) VALUES (?,?,?,?)",
      [name, email, phone, message],
      async (err) => {
        if (err) return res.status(500).send(err);

        // Fetch all admin emails from database
        db.query("SELECT email FROM admins", async (dbErr, admins) => {
          if (dbErr) {
            console.log("❌ Failed to fetch admin emails:", dbErr.message);
          }

          // Get admin emails list
          const adminEmails = admins && admins.length > 0 
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
              console.log("❌ Failed to send admin emails:", emailErr.message);
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
            console.log("❌ Failed to send user email:", emailErr.message);
          }

          res.send({ message: "Inquiry Submitted and emails sent successfully" });
        });
      }
    );
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send({ message: "Error submitting inquiry" });
  }
});

/* Get All Inquiries (Admin) */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM inquiries ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).send(err);

      res.send(result);
    }
  );
});


/* Mark As Read */
router.put("/read/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "UPDATE inquiries SET is_read = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).send(err);

      res.send({ message: "Marked as Read" });
    }
  );

});


export default router;
