const trashModel = require('../models/trashModel')
const response = require('../utils/response')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')

const getAllTrash = (req, res) => {
    trashModel.getAll((err, result) => {
        if (err) {
            console.error("Database Fetch Error:", err)
            return response(500, null, "Error retrieving data", res)
        }
        response(200, result, "Data retrieved successfully", res)
    })
}

const getTrashById = (req, res) => {
    const { id } = req.params
    trashModel.getById(id, (err, result) => {
        if (err) {
            return response(500, null, "Error retrieving data", res)
        }
        if (result.length === 0) {
            return response(404, null, "Data not found", res)
        }
        response(200, result[0], "Data retrieved successfully", res)
    })
}

const createTrash = async (req, res) => {
    try {
        const user_id = req.user.id
        const { name, weight, location, status } = req.body
        const image = req.file?.filename // ambil dari file upload via multer

        if (!name || !image || !weight || !location || !status) {
            return response(400, null, "Missing required fields", res)
        }

        // Kirim ke Flask untuk klasifikasi
        const formData = new FormData()
        formData.append('file', fs.createReadStream(path.join(__dirname, '../uploads/', image)))

        const flaskResponse = await axios.post('https://puunnnpun-ml-crashtocash.hf.space/predict', formData, {
            headers: formData.getHeaders()
        })

        const prediction = flaskResponse.data.prediction
        const category = prediction === 0 ? 'organic' : 'non-organic'

        trashModel.create(user_id, name, image, category, weight, location, status, (err, result) => {
            if (err) {
                console.error("Database Insert Error:", err)
                return response(500, null, "Error adding data", res)
            }
            response(201, result, "Data added successfully with category prediction", res)
        })

    } catch (error) {
        console.error("Error in createTrash:", error.message)
        response(500, null, "Internal server error", res)
    }
}


const updateTrash = (req, res) => {
    const { id } = req.params
    const user_id = req.user.id
    const { name, category, weight, location, status } = req.body

    if (!name || !category || !weight || !location || !status) {
        return response(400, null, "Missing required fields", res)
    }

    trashModel.getById(id, (err, results) => {
        if (err) {
            console.error("Database Query Error:", err)
            return response(500, null, "Error retrieving data", res)
        }

        if (results.length === 0) {
            return response(404, null, "Trash not found", res)
        }

        const trash = results[0]

        if (trash.user_id !== user_id) {
            return response(403, null, "Unauthorized to update this trash", res)
        }

        // Cek apakah ada gambar baru
        const newImage = req.file ? req.file.filename : trash.image

        trashModel.update(id, trash.user_id, name, newImage, category, weight, location, status, (err, result) => {
            if (err) {
                console.error("Database Update Error:", err)
                return response(500, null, "Error updating data", res)
            }
            if (result.affectedRows === 0) {
                return response(404, null, "Data not found", res)
            }
            response(200, result, "Data updated successfully", res)
        })
    })
}


const deleteTrash = (req, res) => {
    const { id } = req.params

    trashModel.delete(id, (err, result) => {
        if (err) {
            return response(500, null, "Error deleting data", res)
        }
        if (result.affectedRows === 0) {
            return response(404, null, "Data not found", res)
        }
        response(200, null, "Data deleted successfully", res)
    })
}

module.exports = { getAllTrash, getTrashById, createTrash, updateTrash, deleteTrash }