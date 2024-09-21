import express from "express";
const router=express.Router();


router.get("/workout",(req,res)=>{
    res.send("The workout api");
})
export default router;
