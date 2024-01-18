const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // helps us hash passwords
const validator = require('validator') // helps with validating email fields

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

// custom static signup method
userSchema.statics.signup = async function (email, password) { // must use regular function not => function in order to use 'this' keyword

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
    
    if (exists) {
        throw Error('Email already in use')
    }
    
    const salt = await bcrypt.genSalt(10) // higher the number the more secure but it'll take longer to signup users
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)