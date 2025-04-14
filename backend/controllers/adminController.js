const userModel = require('../models/userModel')
const response = require('../utils/response')

const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            return response(500, null, "Error retrieving users", res)
        }
        response(200, results, "Users retrieved successfully", res)
    })
}

module.exports = { getAllUsers }
