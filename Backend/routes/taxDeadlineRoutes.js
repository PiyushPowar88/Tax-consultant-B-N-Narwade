import express from "express";
import db from "../config/db.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { calculateDueDate } from "../utils/dueDateEngine.js";


const router = express.Router();
const promiseDb = db.promise();


/* ================= GET ================= */

router.get("/", async (req, res) => {

  try {

    const [rows] = await promiseDb.query(
      "SELECT * FROM tax_deadlines"
    );

    const processed = rows.map(item => {
      const dueDate = calculateDueDate(item);

      return {
        ...item,
        due_date: dueDate
      };
    });

    res.json(processed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/* ================= ADD ================= */

router.post("/", verifyAdmin, async (req, res) => {

  const {
    category,
    name,
    form_type,
    frequency,
    rule_day,
    rule_month,
    is_auto,
    manual_due_date
  } = req.body;

  try {

    await promiseDb.query(
      `INSERT INTO tax_deadlines 
      (category, name, form_type, frequency, rule_day, rule_month, is_auto, manual_due_date)
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        category,
        name,
        form_type,
        frequency,
        rule_day,
        rule_month,
        is_auto,
        manual_due_date
      ]
    );

    res.json({ message: "Inserted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/* ================= UPDATE ================= */

router.put("/:id", verifyAdmin, async (req, res) => {

  const {
    category,
    name,
    form_type,
    frequency,
    rule_day,
    rule_month,
    is_auto,
    manual_due_date
  } = req.body;

  try {

    await promiseDb.query(
      `UPDATE tax_deadlines SET
      category=?,
      name=?,
      form_type=?,
      frequency=?,
      rule_day=?,
      rule_month=?,
      is_auto=?,
      manual_due_date=?
      WHERE id=?`,
      [
        category,
        name,
        form_type,
        frequency,
        rule_day,
        rule_month,
        is_auto,
        manual_due_date,
        req.params.id
      ]
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
