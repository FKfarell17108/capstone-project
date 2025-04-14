const express = require('express')
const { getChallenges, createChallenges, updateChallenges, deleteChallenges } = require('../controllers/challengesController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/challenges', authMiddleware(['admin', 'user']), getChallenges)  
router.post('/challenges', authMiddleware(['admin']), createChallenges) 
router.put('/challenges/:id', authMiddleware(['admin']), updateChallenges)
router.delete('/challenges/:id', authMiddleware(['admin']), deleteChallenges)

module.exports = router
