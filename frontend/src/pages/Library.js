import { useEffect, useState } from "react" 
import { useAuthContext } from "../hooks/useAuthContext"

// components
import LibraryExercise from '../components/LibraryExercise'
import SearchBar from "../components/SearchBar"

const Library = () => {
    const {user} = useAuthContext()
    const [libraryExercises, setLibraryExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');


      // fires function when component is rendered
    useEffect(() => {
        // function declaration
        const fetchLibrary = async () => {
            const offset = (currentPage - 1) * 9;
            let url = `/api/library?limit=9&offset=${offset}`;

            if(searchQuery) {
                url += `&query=${encodeURIComponent(searchQuery)}`;
            }
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }) // stores data into response
            const json = await response.json() // passes json in response into json variable

            if (response.ok) {
                setLibraryExercises(json)
            }
        };

        // we only display workouts to authenticated users
        if (user){
            fetchLibrary()
        }
    }, [user, currentPage, searchQuery])

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="library">
            <div className="libraryWorkouts">
                <SearchBar onSearchChange={setSearchQuery}/>
                {libraryExercises && libraryExercises.map((exercise) => (
                    <LibraryExercise key={exercise.id} workout={exercise} /> // Use the state variable here
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <button className="pagination-button"onClick={goToPreviousPage}>Previous</button>
                )}
                <button className="pagination-button" onClick={goToNextPage}>Next</button>
            </div>
        </div>
    )
}

export default Library