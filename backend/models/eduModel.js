const db = require('../config/connection')

const eduModel = {
    getAll: (callback) => {
        const sql = "SELECT * FROM educational_content"
        db.query(sql, callback)
    },
    create: (title, content, content_type, callback) => {
        const sql = "INSERT INTO educational_content (title, content, content_type, created_at) VALUES (?, ?, ?, NOW())"
        db.query(sql, [title, content, content_type], callback)
    },
    
    update: (id, title, content, content_type, callback) => {
        const sql = "UPDATE educational_content SET title = ?, content = ?, content_type = ? WHERE id = ?"
        db.query(sql, [title, content, content_type, id], callback)
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM educational_content WHERE id = ?";
        db.query(sql, [id], callback)
}
}

module.exports = eduModel
