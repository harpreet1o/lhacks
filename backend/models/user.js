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
const userSelectionSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true },
    goal: { type: String, required: true },
    availability: { type: [String], required: true }, // Array of available days
    createdAt: { type: Date, default: Date.now },
    userId:{type:String,required:true}
  });
  
  const UserSelection = mongoose.model('UserSelection', userSelectionSchema);
  const userselectio=(async(userId)=>{await UserSelection.findOne({ userId })})
  
  const createOrUpdateUserSelection = async ({ age, height, weight, gender, goal, availability, userId }) => {
        // Check if a user selection already exists for the given userId
        const existingSelection = await UserSelection.findOne({ userId });

        if (existingSelection) {
            // Update existing user selection
            const updatedSelection = await UserSelection.findByIdAndUpdate(
                existingSelection._id,
                { age, height, weight, gender, goal, availability },
                { new: true, runValidators: true } // Return the updated document
            );

            return "success";
        } else {
            // Create new user selection
            const newUserSelection = new UserSelection({
                age,
                height,
                weight,
                gender,
                goal,
                availability,
                userId // Associate with user ID
            });

            const savedSelection = await newUserSelection.save();
            return "success";

        }
};



// Function to find a user by email
const findUserByEmail = async (email) => {
     
        const user = await User.findOne({ email });
        if(user)
        return user;
        else
        return null;
};

const findById = async (id) => {    
    const user = await User.findById(id); 
    if(user)
    return user;
    else
    return null;
};
// Function to create a new user
const createUser = async ({ name, email, password }) => {
    try {
        const salt = await  bcrypt.genSalt(10); 
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword }); 

        await newUser.save(); 
        return newUser;
    } catch (err) {
        // You can add more specific error logging here if needed
        throw new Error(`Error creating user: ${err.message}`);
    }
};

// Function to compare passwords
const matchPassword = (password, hash) => bcrypt.compareSync(password, hash);

export { createUser, findUserByEmail, matchPassword,findById,createOrUpdateUserSelection,userselectio };
