import Header from "../components/Header";
import ExerciseCard from "../components/Exercise";

function Workout() {
  return (
    <div className="">
      <Header />
      <div className="container-fluid text-center mb-4">
        <h3>Workout</h3>
      <ExerciseCard name="Push-ups" rep="10" series="3" />
    </div>
    </div>
  );
}

export default Workout;