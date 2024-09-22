import express from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, matchPassword } from '../models/user.js';

const router = express.Router();
const secretKeyJWT = process.env.secretKeyJWT;
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, secretKeyJWT, { expiresIn: '24h' });
};

// User login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if token already exists (you might want to check cookies here)
    const token = req.cookies.token;
    if (token) {
        return res.status(400).json({ message: 'User is already logged in.' });
    }

    try {
        const user = await findUserByEmail(email); // Assuming this returns a Promise
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Check if the password matches
        if (!matchPassword(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate a new token
        const newToken = generateToken(user._id); // Use user._id for the token
        res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: "none" }); // Send token as cookie
        res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Auto-login route (to check if user is logged in based on the token)
router.post("/autoLogin", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token found, please log in.' });
    }

    jwt.verify(token, secretKeyJWT, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        // Token is valid, return user info
        res.json({ id: decoded.id, message: 'User is logged in.' });
    });
});

export default router;
