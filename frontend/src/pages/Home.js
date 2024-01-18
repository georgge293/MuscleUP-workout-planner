import { useEffect } from "react" // import hooks
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    // fires function when component is rendered
    useEffect(() => {
        // function declaration
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') // stores data into response
            const json = await response.json() // passes json in response into json variable

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        // we call the function we just defined
        fetchWorkouts()
    }, [dispatch])// 2nd parameter is dependency array we keep it empty to signify we only want useEffect to run once (when page is rendered)
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} /> // key must be unique so we can reference each specific workout
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home