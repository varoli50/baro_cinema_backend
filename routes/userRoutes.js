const express = require('express')
const {register,login,whoAmI,logout} = require('../controllers/userController')
const {auth} = require('../middleware/userMiddleware.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami',auth, whoAmI)
router.post('/logout', auth, logout)

module.exports = router