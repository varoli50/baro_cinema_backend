const express = require('express')
const {addMovie} = require('../controllers/movieController.js')

const router = express.Router()

router.post('/addmovie', addMovie)

module.exports = router