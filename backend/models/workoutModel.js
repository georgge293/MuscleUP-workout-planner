const mongoose = require('mongoose')

// schema defines structure of a table
const Schema = mongoose.Schema

// defines what our workout schema will look like
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true }) //automatically adds a timestamp property when the workout object is created

// we apply schema to a model then we use the model to interact with the Workout collection
module.exports = mongoose.model('Workout', workoutSchema)
