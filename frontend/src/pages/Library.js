import { useEffect, useState, useMemo } from "react" 
import { useAuthContext } from "../hooks/useAuthContext"

// components
import LibraryExercise from '../components/LibraryExercise'
// import SearchBar from "../components/SearchBar"

const Library = () => {
    const {user} = useAuthContext()
    const [libraryExercises, setLibraryExercises] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')


      // fires function when component is rendered
    useEffect(() => {
        // function declaration
        const fetchLibrary = async () => {
            const response = await fetch('/api/library');
            const json = await response.json() // passes json in response into json variable

            if (response.ok) {
                setLibraryExercises(json)
            }
        }

        // we only display workouts to authenticated users
        if (user){
            fetchLibrary()
        }
    }, [user, currentPage, options])

    // useEffect(() => {
    //     if (searchQuery !== '') {
    //         const fetchSearchResults = async () => {
    //             const searchUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(searchQuery)}?limit=9`;
    //             const response = await fetch(searchUrl, options);
    //             if (response.ok) {
    //                 const json = await response.json();
    //                 setLibraryExercises(json);
    //             }
    //         };
    //         fetchSearchResults();
    //     }
    // }, [searchQuery, options]);

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