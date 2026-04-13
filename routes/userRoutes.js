const express = require('express')
const {register,login,whoAmI,logout,allUsers,deleteUser,resetPassword} = require('../controllers/userController')
const {auth} = require('../middleware/userMiddleware.js')
const {isAdmin} = require('../middleware/adminMiddleware.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami',auth, whoAmI)
router.post('/logout', auth, logout)
router.get('/admin/allUser', auth, isAdmin, allUsers)
router.delete('/admin/deleteUser/:userId', auth, isAdmin, deleteUser)
router.put('/resetpsw',resetPassword)


module.exports = router