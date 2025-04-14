const express = require('express')
const { getUserNotifications, createNotification, markAsRead, updateNotification } = require('../controllers/notificationController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()


router.get('/notifications', authMiddleware(['user']), getUserNotifications)
router.post('/notifications', authMiddleware(['admin']), createNotification)
router.put('/notifications/:id/read', authMiddleware(['user']), markAsRead)
router.put('/notifications/:user_id', authMiddleware(['admin']), updateNotification)


module.exports = router
