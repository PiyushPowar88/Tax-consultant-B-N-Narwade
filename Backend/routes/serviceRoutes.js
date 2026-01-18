import express from "express";
import db from "../config/db.js";

const router = express.Router();

// get services
router.get("/", (req,res)=>{
 db.query("SELECT * FROM services", (err,result)=>{
   if(err) return res.status(500).send(err);
   res.send(result);
 });
});

export default router;
