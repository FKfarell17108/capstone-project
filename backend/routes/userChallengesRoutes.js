const express = require('express')
const { joinChallenge, updateProgress, getChallengeParticipants, getUserChallenges } = require('../controllers/userChallengesController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/user_challenges/join', authMiddleware(['user']), joinChallenge) 
router.put('/user_challenges/progress', authMiddleware(['user']), updateProgress) 
router.get('/user_challenges/participants/:challenge_id', authMiddleware(['admin']), getChallengeParticipants)
router.get('/user_challenges', authMiddleware(['user']), getUserChallenges)

module.exports = router
