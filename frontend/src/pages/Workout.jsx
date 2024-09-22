import Header from "../components/Header";

function Workout() {
  return (
    <div className="">
      <Header />

      <div class="container">
        <h1>Workout</h1>
        <p class="highlight">Great job! 🎉</p>
        <p class="date">Date: [Insert Date]</p>
        <p class="time">Total Time: [Total Time]</p>

        <p>Exercises Completed:</p>
        <div class="exercises">
            <p>Push-ups: 3x10</p>
            <p>Squats: 3x15</p>
            <p>Plank: 3x30s</p>
        </div>
    </div>
    </div>
  );
}

export default Workout;