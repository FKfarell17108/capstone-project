const db = require('../config/connection')
const notificationModel = require('../models/notificationModel')
const response = require('../utils/response')

const getUserNotifications = (req, res) => {
    const user_id = req.user.id 

    notificationModel.getUserNotifications(user_id, (err, result) => {
        if (err) return response(500, null, "Database error", res)
        response(200, result, "Notifications retrieved successfully", res)
    })
}

const createNotification = (req, res) => {
    const { user_id, message } = req.body

    if (!user_id || !message) {
        return response(400, null, "Missing required fields", res)
    }

    
    const checkUserQuery = `SELECT id FROM users WHERE id = ?`
    db.query(checkUserQuery, [user_id], (err, results) => {
        if (err) return response(500, null, "Database error", res)
        if (results.length === 0) return response(400, null, "User ID not found", res)

        notificationModel.createNotification(user_id, message, (err, result) => {
            if (err) return response(500, null, "Error creating notification", res)
            response(201, result, "Notification sent successfully", res)
        })
    })
}

const markAsRead = (req, res) => {
    const { id } = req.params

    notificationModel.markAsRead(id, (err, result) => {
        if (err) return response(500, null, "Error updating notification", res)
        response(200, result, "Notification marked as read", res)
    })
}

const updateNotification = (req, res) => {
    const { user_id } = req.params
    const { message, status } = req.body

    console.log("Update Request Received for user_id:", user_id)
    console.log("New Message:", message)
    console.log("New Status:", status)

    const checkUserQuery = `SELECT id FROM users WHERE id = ?`
    db.query(checkUserQuery, [user_id], (err, results) => {
        if (err) {
            console.error("Database error:", err)
            return response(500, null, "Database error", res)
        }
        if (results.length === 0) {
            console.log("User ID not found:", user_id)
            return response(400, null, "User ID not found", res)
        }

        console.log("User found, proceeding with update...")

        const query = `
            UPDATE notifications 
            SET message = ?, status = ?, created_at = NOW()
            WHERE user_id = ?
        `

        db.query(query, [message, status, user_id], (err, result) => {
            if (err) {
                console.error("Error updating notification:", err)
                return response(500, null, "Error updating notification", res)
            }
            if (result.affectedRows === 0) {
                console.log("No notifications updated for user_id:", user_id)
                return response(404, null, "Notification not found", res)
            }
            console.log("Notification updated successfully for user_id:", user_id)
            response(200, null, "Notification updated successfully", res)
        })
    })
}


module.exports = { getUserNotifications, createNotification, markAsRead, updateNotification }
