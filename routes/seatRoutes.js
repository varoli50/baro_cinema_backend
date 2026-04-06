const express = require('express')
const {seats,picked,reserved,cancel} = require('../controllers/seatController')
const { auth } = require('../middleware/userMiddleware')
const router = express.Router()

router.get('/getseats', seats)
router.post('/picked', picked)
router.post('/reserved',auth, reserved)
router.delete('/cancelseats/:seat_id',auth, cancel)

module.exports= router