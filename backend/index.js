import express from "express";
import cors from "cors";
import logger from "morgan";
import indexRouter from "./routes/workout.js";
import authRoutes from './routes/auth1.js';
import 'dotenv/config';


const app=express();
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies, etc.)
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));
// app.use('/', authRoutes);
app.get("/",(req,res)=>{
    console.log(process.env.GOOGLE_CLIENT_SECRET);
res.json("hello from the server side");
})

app.use("/",indexRouter);
app.use("/",authRoutes);
app.listen(3000,()=>{
    console.log("server started");
})