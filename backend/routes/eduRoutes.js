const express = require('express')
const { getEducontent, createEducontent, updateEducontent, deleteEducontent } = require('../controllers/eduController')
const authMiddleware = require('../middleware/authMiddleware') 

const router = express.Router()

router.get('/edu_contents', authMiddleware(['admin', 'user', 'collector']), getEducontent)
router.post('/edu_contents', authMiddleware(['admin']), createEducontent)
router.put('/edu_contents/:id', authMiddleware(['admin']), updateEducontent)
router.delete('/edu_contents/:id', authMiddleware(['admin']), deleteEducontent)

module.exports = router