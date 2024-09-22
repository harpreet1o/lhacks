import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  workoutData: { type: String, required: true }, // Store the workout JSON data
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
