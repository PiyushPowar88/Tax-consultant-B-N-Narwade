import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ================= ADMIN LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    db.query(
      "SELECT * FROM admins WHERE email=?",
      [email],
      async (err, result) => {

        if (err) {
          console.log("DB ERROR:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
          return res.status(401).json({ message: "User not found" });
        }

        const admin = result[0];
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
          return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
          { id: admin.id },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        return res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log("LOGIN CRASH:", error);
    return res.status(500).json({ message: "Server crash" });
  }
});

/* ================= ADMIN SIGNUP ================= */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query("SELECT * FROM admins WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    if (result.length > 0) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO admins (name,email,password) VALUES (?,?,?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ message: "Insert error" });

        return res.status(201).json({ message: "Admin Created Successfully" });
      }
    );
  });
});

export default router;
