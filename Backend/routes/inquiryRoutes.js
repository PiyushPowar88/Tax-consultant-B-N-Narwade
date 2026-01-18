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

export default router;
