import express from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, matchPassword,findById,createOrUpdateUserSelection } from '../models/user.js';

const router = express.Router();
const secretKeyJWT = process.env.secretKeyJWT;
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, secretKeyJWT, { expiresIn: '24h' });
};
router.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(`${name} ${email} ${password}`)
    const finduser=await findUserByEmail();
    if(!finduser){
   const user= await createUser({name,email,password});
   res.send("Successfully Done");
    }
    else
    res.send("User Already Exist");
}
)
// User login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await findUserByEmail(email); // Assuming this returns a Promise
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        if (!matchPassword(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const newToken = generateToken(user._id);
        res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: "none" }); // Send token as cookie
        res.status(200).json({ message: 'Login successful!', user: { name: user.name } });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Auto-login route (to check if user is logged in based on the token)
router.get("/tokenLogin",async (req, res) => {
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
   
        const user=await findById(id);
        console.log(user);
        res.status(200).json({message: 'Login successful!',   username: user.name  })
       
    });
    router.post('/api/logout', (req, res) => {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
        res.status(200).json({ message: 'Logged out successfully' });
    });
    router.post('/userSelection', async (req, res) => {
        const token = req.cookies.token;
   
        let userId="";
        if (!token) {
            return res.status(200).json({ message: 'please log in.' });
        }
        jwt.verify(token, secretKeyJWT, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid' });
            }
            else
             userId=decoded.id;
           
        })
       
        const { age, height, weight, gender, goal, availability } = req.body;
         let resp= await createOrUpdateUserSelection({ age, height, weight, gender, goal, availability, userId });
       if(resp=="success"){
        return res.send("success");
       }
    });
    

export default router;
