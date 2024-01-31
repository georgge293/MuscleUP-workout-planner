const LibraryExercise = ({ workout }) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="library-exercise">
            <h4>{capitalizeFirstLetter(workout.name)}</h4>
            <img src={workout.gifUrl} alt={`${capitalizeFirstLetter(workout.name)} exercise`} />
            <p><strong>Body part: </strong>{capitalizeFirstLetter(workout.bodyPart)}</p>
            <p><strong>Equipment: </strong>{capitalizeFirstLetter(workout.equipment)}</p>
            <p><strong>Target: </strong>{capitalizeFirstLetter(workout.target)}</p>
        </div>
    )
}

export default LibraryExercise