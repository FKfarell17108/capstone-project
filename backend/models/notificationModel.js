const db = require('../config/connection')

const getUserNotifications = (user_id, callback) => {
    const query = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`
    db.query(query, [user_id], callback)
}

const createNotification = (user_id, message, callback) => {
    const query = `INSERT INTO notifications (user_id, message, status, created_at) VALUES (?, ?, 'unread', NOW())`
    db.query(query, [user_id, message], callback)
}

const markAsRead = (notification_id, callback) => {
    const query = `UPDATE notifications SET status = 'read' WHERE id = ?`
    db.query(query, [notification_id], callback)
}

module.exports = { getUserNotifications, createNotification, markAsRead }
