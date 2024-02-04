const LibraryWorkout = require('../models/libraryExerciseModel')

const getLibraryWorkouts = async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 9;
    const offset = parseInt(req.query.offset, 10) || 0;
    const query = req.query.query; // Extract the search query parameter, if present

    try {
        let queryConditions = {};
        if (query) {
            // Adjust this to target the specific fields you want to search through
            queryConditions = {
                $or: [
                    { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on name
                    // Add other fields as needed
                ],
            };
        }

        const libraryWorkouts = await LibraryWorkout.find(queryConditions)
            .limit(limit)
            .skip(offset);

        res.status(200).json(libraryWorkouts);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the workouts." });
    }
};

module.exports = { getLibraryWorkouts };