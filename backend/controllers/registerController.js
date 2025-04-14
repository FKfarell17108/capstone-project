const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const response = require('../utils/response')

const register = (req, res) => {
    const { username, password, email, phone, role } = req.body

    if (!username || !password || !email || !phone || !role) {
        return response(400, null, "Missing required fields", res)
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return response(500, null, "Error hashing password", res)
        }

        userModel.createUser(username, hashedPassword, email, phone, role, (err, result) => {
            if (err) {
                console.error("Database Insert Error:", err)
                return response(500, null, "Error registering user", res)
            }
            response(200, null, "User registered successfully", res)
        })
    })
}

module.exports = { register }
