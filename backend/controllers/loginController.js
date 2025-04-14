const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const { addToBlacklist } = require('../middleware/blacklist')
const response = require('../utils/response')

const login = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return response(400, null, "Missing required fields", res)
    }

    userModel.getUserByEmail(email, (err, results) => {
        if (err || results.length === 0) {
            return response(404, null, "User not found", res)
        }

        const user = results[0]
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return response(401, null, "Invalid password", res)
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
            response(200, { token, user }, "Login successful", res)
        })
    })
}

const logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1] // Ambil token dari header

    if (!token) {
        return res.status(400).json({ message: "Token tidak ditemukan" })
    }

    addToBlacklist(token)

    res.status(200).json({
        status: "success",
        message: "Logout successful"
    })
}

module.exports = { login, logout }
