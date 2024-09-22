import express from "express";
import 'dotenv/config';
import axios from "axios";
import jwt from 'jsonwebtoken';
import { userselectio } from '../models/user.js';
import Workout from '../models/workout.js';

const router = express.Router();
const secretKeyJWT = process.env.secretKeyJWT;

// POST: Generate a workout routine
router.post("/gettingWorkout", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token found, please log in.' });
  }

  try {
    const decoded = jwt.verify(token, secretKeyJWT);
    const userId = decoded.id;

    const existingSelection = await userselectio(userId);
    const response = await quizRequest(existingSelection, userId);

    res.json({ response });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
});

// Generate the prompt for the GPT request
function generateQuiz(template, data) {
  return `Generate an exercise routine for a person with the following goals and attributes: ${data}. Provide a weekly routine in the following format only no extra strings: ${template}`;
}

// Function to request GPT to generate the workout
const quizRequest = async (existingSelection, userId) => {
  const OPENAI_API_KEY = process.env.VITE_OPENAI_KEY;
  const jsonTemplate = `{
    "workout": [
      { "day1": [
        { "exercise": { "name": "name", "rep": "rep", "estimatedTime": "estimatedTime" }},
        { "exercise": { "name": "name", "rep": "rep", "estimatedTime": "estimatedTime" }}
      ]},
      { "day2": [
        { "exercise": { "name": "name", "rep": "rep", "estimatedTime": "estimatedTime" }}
      ]}
    ]
  }`;

  const prompt = generateQuiz(jsonTemplate, existingSelection);

  const data = {
    model: "gpt-4",
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

    const workoutContent = response.data.choices[0].message.content;

    // Save the generated workout to the database
    const newWorkout = new Workout({
      userId: userId, // Associate workout with the user's ID
      workoutData: workoutContent, // Save the workout data
    });

    const savedWorkout = await newWorkout.save();
    return savedWorkout; // Return saved workout as response
  } catch (error) {
    console.error("Error generating workout:", error);
    throw new Error("Failed to generate workout.");
  }
};

// GET: Retrieve a workout
router.get("/getWorkout", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token found, please log in.' });
  }

  try {
    const decoded = jwt.verify(token, secretKeyJWT);
    const userId = decoded.id;

    const workout = await Workout.findOne({ userId });

    if (!workout) {
      return res.status(404).json({ message: 'No workout found for the user.' });
    }

    res.status(200).json({ workout });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
