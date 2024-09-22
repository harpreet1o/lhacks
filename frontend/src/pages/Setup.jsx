import { useState } from "react";
import Header from "../components/Header";

function Setup() {
  // State for form inputs
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState("general_fitness");
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

  return (
    <>
      <Header />
      <div className="container-fluid text-center mb-4">
        <h3>Profile Set-up</h3>
      </div>

      <div className="container-fluid">
        <form className="d-flex flex-column">
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
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

          {/* Availability Checkboxes in 2x4 Grid */}
          <div className="mb-3">
            <label className="form-label">Availability:</label>
            <div className="row">
              <div className="col-6">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Monday"
                    checked={days.Monday}
                    onChange={() => handleDayChange("Monday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Monday">
                    Monday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex  align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Tuesday"
                    checked={days.Tuesday}
                    onChange={() => handleDayChange("Tuesday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Tuesday">
                    Tuesday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex justify-content-start align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Wednesday"
                    checked={days.Wednesday}
                    onChange={() => handleDayChange("Wednesday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Wednesday">
                    Wednesday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex justify-content-start align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Thursday"
                    checked={days.Thursday}
                    onChange={() => handleDayChange("Thursday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Thursday">
                    Thursday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex justify-content-start align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Friday"
                    checked={days.Friday}
                    onChange={() => handleDayChange("Friday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Friday">
                    Friday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex justify-content-start align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Saturday"
                    checked={days.Saturday}
                    onChange={() => handleDayChange("Saturday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Saturday">
                    Saturday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex justify-content-start align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Sunday"
                    checked={days.Sunday}
                    onChange={() => handleDayChange("Sunday")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Sunday">
                    Sunday
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-check d-flex justify-content-start align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Weekdays"
                    checked={days.Weekdays}
                    onChange={() => handleDayChange("Weekdays")}
                  />
                  <label className="form-check-label ms-2" htmlFor="Weekdays">
                    Weekdays
                  </label>
                </div>
              </div>
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
              <a href="#" className="text-decoration-underline">
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
    </>
  );
}

export default Setup;
