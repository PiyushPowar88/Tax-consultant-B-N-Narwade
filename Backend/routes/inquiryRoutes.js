import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", (req,res)=>{
 const {name,email,phone,message} = req.body;
 db.query(
   "INSERT INTO inquiries (name,email,phone,message) VALUES (?,?,?,?)",
   [name,email,phone,message],
   (err)=>{
     if(err) return res.status(500).send(err);
     res.send({message:"Inquiry Submitted"});
   }
 );
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
