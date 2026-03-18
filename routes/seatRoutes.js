const express = require('express')
const {seats,picked,reserved} = require('../controllers/seatController')
const router = express.Router()

router.get('/getseats', seats)
router.post('/picked', picked)
router.post('/reserved', reserved)

module.exports= router