const ExerciseCard = ({name, rep, }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Reps: {rep}</p>
      </div>
    </div>
  );
}

export default ExerciseCard;