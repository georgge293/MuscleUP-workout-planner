const express = require('express')

const {
    getLibraryWorkouts
} = require('../controllers/libraryController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getLibraryWorkouts)

module.exports = router