const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // forces email to be unique (can't create account with same email)
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)