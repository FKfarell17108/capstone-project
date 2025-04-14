const db = require('../config/connection')

const challengesModel = {
    getAll: (callback) => {
        const sql = "SELECT * FROM challenges"
        db.query(sql, callback)
    },

    create: (name, description, goal, reward_coins, start_date, end_date, callback) => {
        const sql = "INSERT INTO challenges (name, description, goal, reward_coins, start_date, end_date, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())"
        db.query(sql, [name, description, goal, reward_coins, start_date, end_date], callback)
    },

    update: (id, name, description, goal, reward_coins, start_date, end_date, callback) => {
        const sql = "UPDATE challenges SET name = ?, description = ?, goal = ?, reward_coins = ?, start_date = ?, end_date = ? WHERE id = ?"
        db.query(sql, [name, description, goal, reward_coins, start_date, end_date, id], callback)
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM challenges WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = challengesModel
