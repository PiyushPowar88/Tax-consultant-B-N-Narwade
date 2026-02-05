import express from "express";
import db from "../config/db.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const promiseDb = db.promise();


/* ================= GET ================= */

router.get("/", async (req, res) => {

  try {

    const [rows] = await promiseDb.query(
      "SELECT * FROM tax_deadlines ORDER BY due_date ASC"
    );

    res.json(rows);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ================= ADD ================= */

router.post("/", verifyAdmin, async (req, res) => {

  const { category, name, form_type, due_date } = req.body;

  try {

    await promiseDb.query(
      "INSERT INTO tax_deadlines (category,name,form_type,due_date) VALUES (?,?,?,?)",
      [category, name, form_type, due_date]
    );

    res.json({ message: "Inserted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ================= UPDATE ================= */

router.put("/:id", verifyAdmin, async (req, res) => {

  const { category, name, form_type, due_date } = req.body;

  try {

    await promiseDb.query(
      "UPDATE tax_deadlines SET category=?, name=?, form_type=?, due_date=? WHERE id=?",
      [category, name, form_type, due_date, req.params.id]
    );

    res.json({ message: "Updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ================= DELETE ================= */

router.delete("/:id", verifyAdmin, async (req, res) => {

  try {

    await promiseDb.query(
      "DELETE FROM tax_deadlines WHERE id=?",
      [req.params.id]
    );

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
