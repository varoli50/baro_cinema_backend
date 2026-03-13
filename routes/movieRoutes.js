const express = require('express')
const {auth} = require('../middleware/userMiddleware.js')
//const {upload} = require('../middleware/uploadMovieImage.js')
const {addMovie,delMovie} = require('../controllers/movieController.js')

const router = express.Router()

//router.post('/:moiveID', auth, upload.single('movieimg'), uploadMovieImg)
router.post('/addmovie', addMovie)
router.delete('/delete/:movieId',auth,delMovie)

module.exports = router