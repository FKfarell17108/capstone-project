const eduModel = require('../models/eduModel')
const response = require('../utils/response')

const getEducontent = (req, res) => {
    eduModel.getAll((err, result) => {
        if (err) {
            console.error("Database Fetch Error:", err) 
            return response(500, null, "Error retrieving data", res)
        }
        response(200, result, "Data retrieved successfully", res)
    })
}

const createEducontent = (req, res) => {
    const { title, content, content_type } = req.body

    if (!title || !content || !content_type) {
        return response(400, null, "Missing required fields", res)
    }

    eduModel.create(title, content, content_type, (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err)
            return response(500, null, "Error adding data", res)
        }
        response(200, result, "Data added successfully", res)
    })
}


const updateEducontent = (req, res) => {
    const { id } = req.params 
    const { title, content, content_type } = req.body

    if (!id || !title || !content || !content_type) {
        return response(400, null, "Missing required fields", res)
    }

    eduModel.update(id, title, content, content_type, (err, result) => {
        if (err) {
            console.error("Database Update Error:", err)
            return response(500, null, "Error updating data", res)
        }

        if (result.affectedRows === 0) {
            return response(404, null, "Data not found", res)
        }

        response(200, result, "Data updated successfully", res)
    })
}

const deleteEducontent = (req, res) => {
    const { id } = req.params 

    if (!id) {
        return response(400, null, "Missing ID parameter", res)
    }

    eduModel.delete(id, (err, result) => {
        if (err) {
            return response(500, null, "Error deleting data", res)
        }

        if (result.affectedRows === 0) {
            return response(404, null, "Data not found", res)
        }

        response(200, null, "Data deleted successfully", res)
    })
}

module.exports = { getEducontent, createEducontent, updateEducontent, deleteEducontent }
