const mongoose = require('mongoose')

// schema defines structure of a table
const Schema = mongoose.Schema

// defines what our workout schema will look like
const workoutSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    bodyPart: {
        type: String,
        required: false
    },
    equipment: {
        type: String,
        required: false
    },
    target: {
        type: String,
        required: false
    },
    id: {
        type: Number,
        required: true
    },
    gifUrl: {
        type: String,
        required: false
    }
})

// we apply schema to a model then we use the model to interact with the Workout collection
module.exports = mongoose.model('LibraryExercise', workoutSchema)
