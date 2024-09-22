import express from "express";
import 'dotenv/config';
import axios from "axios";
import jwt from 'jsonwebtoken';
import { userselectio } from '../models/user.js';


const router=express.Router();
const secretKeyJWT = process.env.secretKeyJWT;
  router.post("/gettingWorkout",async (req,res)=>{
    const token = req.cookies.token;
   
    let id="";
    if (!token) {
        return res.status(200).json({ message: 'No token found, please log in.' });
    }
    jwt.verify(token, secretKeyJWT, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        else
         id=decoded.id;
       
    })
   
    const existingSelection = await userselectio(id);
    const response=await quizRequest(existingSelection);
    res.json({"response":response});
    })


function generateQuiz(template,data) {
    return `generate a exercise routine for the person with these goal and attributes ${data} a weekly routine as per selected by them like this ${template}`
}



//function to call chatgpt to generate quiz
 const quizRequest = async (existingSelection) => {
  const OPENAI_API_KEY = process.env.VITE_OPENAI_KEY;
  const jsonTemplate =
  "{workout: [{day1: [{'exercise': {name:'name',rep:'rep','estimatedTime','estimatedTime'},{'exercise': {name:'name',rep:'rep','estimatedTime','estimatedTime'},]},day2:{workout: [{day1: [{'exercise': {name:'name',rep:'rep','estimatedTime','estimatedTime'},{'exercise': {name:'name',rep:'rep','estimatedTime','estimatedTime'},]}";
  const prompt = generateQuiz(jsonTemplate,existingSelection);

  const data = {
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error: ", error);
  }
};
export default router;