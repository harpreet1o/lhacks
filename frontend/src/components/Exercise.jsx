// eslint-disable-next-line react/prop-types
const ExerciseCard = ({name, rep, series}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Reps: {rep}</p>
        <p className="card-text">Series: {series}</p>
      </div>
    </div>
  );
}

export default ExerciseCard;