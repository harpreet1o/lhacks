import express from "express";
import cors from "cors";
import logger from "morgan";
import indexRouter from "./routes/workout.js"
import mongoose from "mongoose";
import 'dotenv/config';



const app=express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.get("/",(req,res)=>{
res.json("hello from the server side");
})
async function connectToDatabase() {
    const uri =process.env.mongodbUrl;
    await mongoose.connect(uri);
    console.log("mongodb connected")
  }
  connectToDatabase();
app.use("/",indexRouter);

app.listen(3000,()=>{
    console.log("server started");
})