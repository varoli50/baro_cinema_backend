const express = require('express')
const {auth} = require('../middleware/userMiddleware.js')
//const {upload} = require('../middleware/uploadMovieImage.js')
const {addMovie,delMovie, getAllMovie} = require('../controllers/movieController.js')

const router = express.Router()

//router.post('/:moiveID', auth, upload.single('movieimg'), uploadMovieImg)
router.post('/addmovie', addMovie)
router.delete('/delete/:movieId',auth,delMovie)
router.get('/all', getAllMovie)

module.exports = router