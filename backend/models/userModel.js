const db = require('../config/connection')

const createUser = (username, password, email, phone, role, callback) => {
    const sql = `INSERT INTO users (username, password, email, phone, role, coins, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())`
    db.query(sql, [username, password, email, phone, role], callback)
}

const getUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`
    db.query(sql, [email], callback)
}

const getAllUsers = (callback) => {
    const sql = `SELECT id, username, email, phone, role, coins, created_at FROM users`
    db.query(sql, callback)
}


module.exports = { createUser, getUserByEmail, getAllUsers }