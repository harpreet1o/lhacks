import React, { useState } from "react";
import axios from "axios"; // Import axios
import Header from "../components/Header";

function Setup() {
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState("general_fitness");
  const [gender, setGender] = useState("");
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
    Weekdays: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Handle availability checkboxes
  const handleDayChange = (day) => {
    if (day === "Weekdays") {
      setDays((prev) => ({
        Monday: !prev.Weekdays,
        Tuesday: !prev.Weekdays,
        Wednesday: !prev.Weekdays,
        Thursday: !prev.Weekdays,
        Friday: !prev.Weekdays,
        Saturday: false,
        Sunday: false,
        Weekdays: !prev.Weekdays,
      }));
    } else {
      setDays((prev) => ({
        ...prev,
        [day]: !prev[day],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      age,
      height,
      weight,
      gender,
      goal,
      availability: Object.keys(days).filter(day => days[day]), // Get available days
    };

    try {
      const response = await axios.post("http://localhost:3000/userSelection", formData, {
        withCredentials: true,
      });
      console.log("Workout Plan:", response.data); // Handle response as needed
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
      <div className="container-fluid text-center mb-4">
        <h3>Profile Set-up</h3>
      </div>

      <div className="container-fluid">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          {/* Gender Field */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)} // Update gender state
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          {/* Age Range Slider */}
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

          {/* Height Range Slider */}
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

          {/* Weight Range Slider */}
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

          {/* Goal Section */}
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

          {/* Availability Checkboxes */}
          <div className="mb-3">
            <label className="form-label">Availability:</label>
            <div className="row">
              {Object.keys(days).map((day) => (
                <div className="col-6" key={day}>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={day}
                      checked={days[day]}
                      onChange={() => handleDayChange(day)}
                    />
                    <label className="form-check-label ms-2" htmlFor={day}>
                      {day}
                    </label>
                  </div>
                </div>
              ))}
            </div>
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
              I accept the terms{" "}
              <a href="#" className="text-decoration-underline" onClick={openModal}>
                Read our T&Cs
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
              Review and Generate Plan
            </button>
          </div>
        </form>
      </div>

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