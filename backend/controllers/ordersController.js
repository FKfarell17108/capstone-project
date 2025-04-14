const ordersModel = require('../models/ordersModel')
const response = require('../utils/response')

// Mendapatkan semua orders (hanya untuk collector)
const getAllOrders = (req, res) => {
    ordersModel.getAllOrders((err, result) => {
        if (err) {
            console.log("Database error:", err)
            return response(500, null, "Database error", res)
        }
        response(200, result, "Orders retrieved", res)
    })
}

const getOrderById = (req, res) => {
    const { id } = req.params

    ordersModel.getOrderById(id, (err, result) => {
        if (err) {
            return response(500, null, "Database error", res)
        }

        if (result.length === 0) {
            return response(404, null, "Order not found", res)
        }

        response(200, result[0], "Order retrieved", res)
    })
}


const createOrder = (req, res) => {
    const { trash_id, payment_method, total_price, total_coins } = req.body
    const collector_id = req.user.id  

    if (!trash_id || !payment_method || !total_price || !total_coins) {
        return response(400, null, "Missing required fields", res)
    }

    ordersModel.createOrder(collector_id, trash_id, payment_method, total_price, total_coins, (err, result) => {
        if (err) {
            console.log("Error creating order:", err)
            return response(500, null, "Error creating order", res)
        }
        response(201, result, "Order created successfully", res)
    })
}

// Menyelesaikan pesanan dan memberikan koin ke penjual
const completeOrder = (req, res) => {
    console.log("Endpoint /orders/:id/complete dipanggil dengan id:", req.params.id)
    ordersModel.completeOrder(req.params.id, (err, result) => {
        if (err) return response(500, null, "Error completing order", res)
        response(200, result, "Order completed successfully", res)
    })
}

module.exports = { getAllOrders, getOrderById, createOrder, completeOrder }
