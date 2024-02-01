const fetch = require('node-fetch');
const LibraryExercise = require('../models/libraryExerciseModel') 

async function fetchExercises() {
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=1400';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.EXERCISE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options)
        if (response.ok) {
            const exercises = await response.json()
            // Assuming each exercise has a unique identifier under `id`
            for (const exercise of exercises) {
                await LibraryExercise.updateOne(
                    { id: exercise.id }, // Query for identifying the document to update
                    exercise, // The data to update or insert
                    { upsert: true } // Option to insert a new doc if one doesn't exist
                );
            }
            console.log('Database updated from ExerciseDB')
        } else {
            console.error('Failed to fetch data from ExerciseDB:', response.statusText)
        }
    } catch (error) {
        console.error('Error updating database from ExerciseDB:', error)
    }
}

module.exports = fetchExercises