import express from "express";
import db from "../config/db.js";

const router = express.Router();


// ============================
// Get All Services
// ============================
router.get("/", (req, res) => {

  db.query("SELECT * FROM services", (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }

    res.json(result);

  });

});


// ============================
// Get Single Service By ID
// ============================
router.get("/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM services WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Service Not Found" });
      }

      res.json(result[0]);

    }
  );

});


export default router;
