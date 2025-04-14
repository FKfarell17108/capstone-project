const db = require('../config/connection')

const userChallengesModel = {
    checkIfJoined: (user_id, challenge_id, callback) => {
        const query = "SELECT * FROM user_challenges WHERE user_id = ? AND challenge_id = ?"
        db.query(query, [user_id, challenge_id], callback)
    },

    joinChallenge: (user_id, challenge_id, callback) => {
        // Cek apakah user sudah join
        const checkQuery = "SELECT * FROM user_challenges WHERE user_id = ? AND challenge_id = ?"
        db.query(checkQuery, [user_id, challenge_id], (err, result) => {
            if (err) return callback(err, null)

            if (result.length > 0) {
                return callback(null, { message: "Already joined this challenge" }) // Cegah duplicate join
            }

            const insertQuery = "INSERT INTO user_challenges (user_id, challenge_id, progress, status, created_at) VALUES (?, ?, 0, 'in_progress', NOW())"
            db.query(insertQuery, [user_id, challenge_id], callback)
        })
    },

    updateProgress: (user_id, challenge_id, progress, callback) => {
        if (progress > 100) {
            return callback({ message: "Progress cannot exceed 100%" }, null)
        }
    
        const checkQuery = "SELECT * FROM user_challenges WHERE user_id = ? AND challenge_id = ?"
        db.query(checkQuery, [user_id, challenge_id], (err, result) => {
            if (err) return callback(err, null)
            if (result.length === 0) return callback(null, { message: "Challenge not found" })
    
            const challenge = result[0]
    
            if (challenge.status === "completed") {
                if (progress !== 100) {
                    return callback({ message: "Challenge already completed. Cannot update progress." }, null)
                }
                return callback(null, { message: "Challenge already completed. No changes made." })
            }
    
            let status = progress === 100 ? "completed" : "in_progress"
            const updateQuery = "UPDATE user_challenges SET progress = ?, status = ? WHERE user_id = ? AND challenge_id = ?"
            db.query(updateQuery, [progress, status, user_id, challenge_id], (err, result) => {
                if (err) return callback(err, null);
                if (progress === 100) {
                    userChallengesModel.completeChallenge(user_id, challenge_id, callback)
                } else {
                    callback(null, { message: "Progress updated successfully" })
                }
            })
        })
    },
    
    completeChallenge: (user_id, challenge_id, callback) => {
        const checkQuery = "SELECT reward_coins FROM challenges WHERE id = ?"
        db.query(checkQuery, [challenge_id], (err, result) => {
            if (err) return callback(err, null)
            if (result.length === 0) return callback(null, { message: "Challenge not found" })
    
            const rewardCoins = result[0].reward_coins || 0
    
            const updateStatusQuery = "UPDATE user_challenges SET status = 'completed' WHERE user_id = ? AND challenge_id = ?"
            db.query(updateStatusQuery, [user_id, challenge_id], (err, result) => {
                if (err) return callback(err, null);
                if (result.affectedRows === 0) return callback(null, { message: "Failed to complete challenge" })
    
                if (rewardCoins > 0) {
                    const updateCoinsQuery = "UPDATE users SET coins = COALESCE(coins, 0) + ? WHERE id = ?"
                    db.query(updateCoinsQuery, [rewardCoins, user_id], (err, coinResult) => {
                        if (err) return callback(err, null)
                        callback(null, { message: "Challenge completed and reward given" })
                    })
                } else {
                    callback(null, { message: "Challenge completed but no coins rewarded" })
                }
            })
        })
    },

    getUserChallenges: (user_id, callback) => {
        const query = `
            SELECT uc.*, c.name, c.goal, c.reward_coins
            FROM user_challenges uc
            JOIN challenges c ON uc.challenge_id = c.id
            WHERE uc.user_id = ?`
        db.query(query, [user_id], callback)
    },

    getChallengeParticipants: (challenge_id, callback) => {
        const query = `
            SELECT uc.*, u.username, u.email
            FROM user_challenges uc
            JOIN users u ON uc.user_id = u.id
            WHERE uc.challenge_id = ?`
        db.query(query, [challenge_id], callback)
    }
}

module.exports = userChallengesModel
