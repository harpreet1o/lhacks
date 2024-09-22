import Header from "../components/Header";
import Footer from '../components/Footer';
import ExerciseCard from "../components/Exercise";
import { UserContext } from "../context/UserContext";
import { useEffect, useState,useContext } from "react";

function Workout() {
  const [workoutV,setWorkout]=useState(null);
  const { workout } = useContext(UserContext);
  setWorkout(workout);
  console.log(workoutV);
  return (
    <div className="">
      <Header />
      <div className="container-fluid text-center mb-4">
        <h3>Workout</h3>

        <p className="date">Date: [Insert Date]</p>
        <p className="time">Total Time: [Total Time]</p>

        <p>Exercises Completed:</p>
        <div className="exercises">
        <ExerciseCard name="Push-ups" rep="10" series="3" />

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Workout;