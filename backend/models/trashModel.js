const db = require('../config/connection')

const trashModel = {
    getAll: (callback) => {
        const sql = "SELECT * FROM trash"
        db.query(sql, callback)
    },
    getById: (id, callback) => {
        const sql = "SELECT * FROM trash WHERE id = ?"
        db.query(sql, [id], callback)
    },
    create: (user_id, name, image, category, weight, location, status, callback) => {
        const sql = "INSERT INTO trash (user_id, name, image, category, weight, location, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())"
        db.query(sql, [user_id, name, image, category, weight, location, status], callback)
    },
    update: (id, user_id, name, image, category, weight, location, status, callback) => {
        const sql = "UPDATE trash SET user_id = ?, name = ?, image = ?, category = ?, weight = ?, location = ?, status = ?, updated_at = NOW() WHERE id = ?"
        db.query(sql, [user_id, name, image, category, weight, location, status, id], callback)
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM trash WHERE id = ?"
        db.query(sql, [id], callback)
    }
}

module.exports = trashModel
