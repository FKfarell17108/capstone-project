const jwt = require('jsonwebtoken')
const { isBlacklisted } = require('../middleware/blacklist')

const authMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Akses ditolak, tidak ada token' })
        }

        if (isBlacklisted(token)) {
            return res.status(401).json({ message: 'Token sudah logout, silakan login lagi' })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded

            if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Akses ditolak, tidak punya izin' })
            }

            next()
        } catch (error) {
            return res.status(401).json({ message: 'Token tidak valid' })
        }
    }
}

module.exports = authMiddleware
