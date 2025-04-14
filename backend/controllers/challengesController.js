const challengesModel = require('../models/challengesModel')
const response = require('../utils/response')

const getChallenges = (req, res) => {
    challengesModel.getAll((err, result) => {
        if (err) {
            console.error("Database Fetch Error:", err)
            return response(500, null, "Error retrieving data", res)
        }
        response(200, result, "Data retrieved successfully", res)
    })
}

const createChallenges = (req, res) => {
    const { name, description, goal, reward_coins, start_date, end_date } = req.body

    if (!name || !description || !goal || !reward_coins || !start_date || !end_date) {
        return response(400, null, "Missing required fields", res)
    }

    const created_at = new Date()

    challengesModel.create(name, description, goal, reward_coins, start_date, end_date, (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err)
            return response(500, null, "Error adding data", res)
        }
        response(201, result, "Challenge added successfully", res)
    })
}

const updateChallenges = (req, res) => {
    const { id } = req.params
    const { name, description, goal, reward_coins, start_date, end_date } = req.body

    if (!id || !name || !description || !goal || !reward_coins || !start_date || !end_date) {
        return response(400, null, "Missing required fields", res)
    }

    challengesModel.update(id, name, description, goal, reward_coins, start_date, end_date, (err, result) => {
        if (err) {
            console.error("Database Update Error:", err)
            return response(500, null, "Error updating data", res)
        }

        if (result.affectedRows === 0) {
            return response(404, null, "Challenge not found", res)
        }

        response(200, result, "Challenge updated successfully", res)
    })
}

// Delete challenge
const deleteChallenges = (req, res) => {
    const { id } = req.params

    if (!id) {
        return response(400, null, "Missing ID parameter", res)
    }

    challengesModel.delete(id, (err, result) => {
        if (err) {
            return response(500, null, "Error deleting challenge", res)
        }

        if (result.affectedRows === 0) {
            return response(404, null, "Challenge not found", res)
        }

        response(200, null, "Challenge deleted successfully", res)
    })
}

module.exports = { getChallenges, createChallenges, updateChallenges, deleteChallenges }
