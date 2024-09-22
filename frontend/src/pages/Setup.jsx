import { useState, useContext } from "react";
import axios from "axios"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
import decor from '../assets/nathan-dumlao-NXMZxygMw8o-unsplash.jpg';


function Setup() {
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState("general_fitness");
  const [gender, setGender] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { user } = useContext(UserContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      age,
      height,
      weight,
      gender,
      goal,
      workoutFrequency,
    };

    try {
      const response = await axios.post("http://localhost:3000/userSelection", formData, {
        withCredentials: true,
      });
      console.log("Workout Plan:", response.data);
    } catch (error) {
      console.error("Error fetching workout plan:", error);
    }
  };

  // Modal Handlers
  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />

      {!user && (
      <div className="alert alert-danger text-center py-1 mt-2" role="alert">
        You are not logged in. Your workout will not be saved.
      </div>
    )}

      <div className="container-fluid">
        <div className="row">
            {/* Image for larger screens */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="image-container">
                <img
                  src={decor}
                  alt="Decorative image of a personal trainer helping a man at gym."
                  className="img-fluid"
                />
              </div>
            </div>

        {/* Form Section */}
        <div className="col-lg-8">
          <div className="container text-center mb-4">
            <h3>Profile Set-up</h3>
          </div>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          {/* Gender Field */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)} 
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age: {age}
            </label>
            <input
              type="range"
              className="form-range"
              id="age"
              value={age}
              min="18"
              max="100"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="height" className="form-label">
              Height: {height} cm
            </label>
            <input
              type="range"
              className="form-range"
              id="height"
              value={height}
              min="100"
              max="220"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="weight" className="form-label">
              Weight: {weight} kg
            </label>
            <input
              type="range"
              className="form-range"
              id="weight"
              value={weight}
              min="40"
              max="150"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="goal" className="form-label">Goal</label>
            <select
              className="form-select"
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="general_fitness">General Fitness</option>
              <option value="lose_weight">Lose Weight</option>
              <option value="gain_muscle">Gain Muscle</option>
              <option value="increase_endurance">Increase Endurance</option>
              <option value="increase_flexibility">Increase Flexibility</option>
              <option value="strength_training">Strength Training</option>
            </select>
          </div>

{/* Workout Frequency Dropdown */}
<div className="mb-3">
            <label htmlFor="workoutFrequency" className="form-label">How often do you want to work out?</label>
            <select
              className="form-select"
              id="workoutFrequency"
              value={workoutFrequency}
              onChange={(e) => setWorkoutFrequency(e.target.value)}
            >
              <option value="" disabled>Select frequency</option>
              <option value="once">Once a week</option>
              <option value="twice">Twice a week</option>
              <option value="three_times">3x a week</option>
              <option value="four_times">4x a week</option>
              <option value="five_times">5x a week</option>
              <option value="six_times">6x a week</option>
            </select>
          </div>

          {/* Terms and Conditions */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheck"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I accept the terms and conditions {" "}
              <a href="#" className="text-info text-decoration-underline" onClick={openModal}>
                [ Read our T&Cs ]
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg"
              disabled={!termsAccepted}
            >
              Generate Plan
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
        <Footer />

      {/* Modal for Terms & Conditions */}
      {isModalOpen && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <h2>Terms & Conditions</h2>
            <p>
              By using EasyFit, you agree that you are responsible for your own health.
              Consult a healthcare provider before starting any workouts. EasyFit is not liable 
              for any injuries or health issues arising from the use of its services.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple styles for the modal
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "500px",
  textAlign: "center",
};

export default Setup;