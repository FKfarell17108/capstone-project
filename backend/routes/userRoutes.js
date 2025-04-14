const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const { register } = require('../controllers/registerController')
const { login, logout } = require('../controllers/loginController')
const { getAllUsers } = require('../controllers/adminController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/users', authMiddleware(['admin']), getAllUsers)
router.post('/logout',authMiddleware([]), logout)

module.exports = router
