const LibraryWorkout = require('../models/libraryExerciseModel')
const mongoose = require('mongoose')

const getLibraryWorkouts = async (req, res) => {
    const libraryWorkouts = await LibraryWorkout.find()

    res.status(200).json(libraryWorkouts)
}

module.exports = { getLibraryWorkouts }