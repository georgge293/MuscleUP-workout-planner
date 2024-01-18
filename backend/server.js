require('dotenv').config()

const express = require('express') // require express package
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


// express app
const app = express() // start off the express app

// middleware
app.use(express.json()) // any request that comes in will pass the body to the req object so we can access req.body

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next() // must be invoked so we can run the next piece of middleware
})

// route handler (reacts to requests)
app.use('/api/workouts', workoutRoutes) // attaches all routes in workout.js to app

app.use('/api/user', userRoutes) // attaches all routes in workout.js to app



// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests on port number 4000
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT) // we print "listening on port 4000" after
        }) 
    })
    .catch((error) => {
        console.log(error)
    })

