const express = require('express')
const { getAllOrders, getOrderById, createOrder, completeOrder } = require('../controllers/ordersController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/orders', authMiddleware(['collector']), getAllOrders)
router.get('/orders/:id', authMiddleware(['collector']), getOrderById)
router.post('/orders', authMiddleware(['collector']), createOrder)
router.put('/orders/:id/complete', authMiddleware(['collector']), completeOrder)

module.exports = router
