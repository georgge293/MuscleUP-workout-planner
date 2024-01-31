import { useEffect, useState } from "react" // import hooks
import { useAuthContext } from "../hooks/useAuthContext"

// components
import LibraryExercise from '../components/LibraryExercise'
import SearchBar from "../components/SearchBar"

const Library = () => {
    const {user} = useAuthContext()
    const [libraryExercises, setLibraryExercises] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')


    const url = `https://exercisedb.p.rapidapi.com/exercises?limit=9&offset=${(currentPage-1)*10}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f641cf64b8msh630328807b4f583p1fe8c6jsn2078d3cfcd56',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    // fires function when component is rendered
    useEffect(() => {
        // function declaration
        const fetchLibrary = async () => {
            const response = await fetch(url, options);
            const json = await response.json() // passes json in response into json variable

            if (response.ok) {
                setLibraryExercises(json)
            }
        }

        // we only display workouts to authenticated users
        if (user){
            fetchLibrary()
        }
    }, [user, currentPage])

    useEffect(() => {
        if (searchQuery !== '') {
            const fetchSearchResults = async () => {
                const searchUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(searchQuery)}?limit=9`;
                const response = await fetch(searchUrl, options);
                if (response.ok) {
                    const json = await response.json();
                    setLibraryExercises(json);
                }
            };
            fetchSearchResults();
        }
    }, [searchQuery]);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="library">
            <SearchBar onSearchChange={setSearchQuery}/>
            <div className="libraryWorkouts">
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