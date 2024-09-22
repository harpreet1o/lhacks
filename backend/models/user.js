import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';

// Connect to MongoDB
async function connectToDatabase() {
    const uri = process.env.mongodbUrl;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
}
connectToDatabase();

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Function to find a user by email
const findUserByEmail = async (email, cb) => {
    try {
        const user = await User.findOne({ email });
        cb(null, user);
    } catch (err) {
        cb(err, null);
    }
};

// Function to create a new user
const createUser = async ({ name, email, password }, cb) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt); // Use the correct variable
    const newUser = new User({ name, email, password: hashedPassword }); // Store hashed password
    try {
        await newUser.save();
        cb(null, { name, email }); // Return relevant user data
    } catch (err) {
        cb(err, null);
    }
};

// Function to compare passwords
const matchPassword = (password, hash) => bcrypt.compareSync(password, hash);

export { createUser, findUserByEmail, matchPassword };
