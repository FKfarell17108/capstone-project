const userChallengesModel = require('../models/userChallengesModel')
const response = require('../utils/response')

const joinChallenge = (req, res) => {
    const { challenge_id } = req.body
    const user_id = req.user.id

    if (!challenge_id) {
        return response(400, null, "Challenge ID is required", res)
    }

    userChallengesModel.checkIfJoined(user_id, challenge_id, (err, result) => {
        if (err) return response(500, null, "Database error", res)
        if (result.length > 0) return response(400, null, "You already joined this challenge", res)

        userChallengesModel.joinChallenge(user_id, challenge_id, (err) => {
            if (err) return response(500, null, "Failed to join challenge", res)
            response(201, null, "Challenge joined successfully", res)
        })
    })
}

const updateProgress = (req, res) => {
    const { challenge_id, progress } = req.body
    const user_id = req.user.id

    if (!challenge_id || progress === undefined) {
        return response(400, null, "All fields are required", res)
    }

    if (isNaN(progress) || progress < 0 || progress > 100) {
        return response(400, null, "Invalid progress value. Must be between 0 and 100", res)
    }

    userChallengesModel.updateProgress(user_id, challenge_id, progress, (err, result) => {
        if (err) return response(400, null, err.message, res)
        return response(200, null, result.message, res)
    })
}

const getUserChallenges = (req, res) => {
    const user_id = req.user.id  

    userChallengesModel.getUserChallenges(user_id, (err, result) => {
        if (err) return response(500, null, "Database error", res)
        response(200, result, "User challenges retrieved", res)
    })
}

const getChallengeParticipants = (req, res) => {
    const { challenge_id } = req.params

    if (!challenge_id || isNaN(challenge_id)) {
        return response(400, null, "Valid Challenge ID is required", res)
    }

    userChallengesModel.getChallengeParticipants(challenge_id, (err, result) => {
        if (err) return response(500, null, "Database error", res)
        response(200, result, "Challenge participants retrieved", res)
    })
}

module.exports = { joinChallenge, updateProgress, getUserChallenges, getChallengeParticipants }
