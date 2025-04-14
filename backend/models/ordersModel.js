const db = require('../config/connection')

// Ambil semua pesanan
const getAllOrders = (callback) => {
    const query = `
        SELECT o.*, s.username AS seller, c.username AS collector, t.name AS trash_name, t.category, t.weight
        FROM orders o
        JOIN users s ON o.seller_id = s.id  -- Penjual sampah
        JOIN users c ON o.collector_id = c.id  -- Pembeli sampah
        JOIN trash t ON o.trash_id = t.id
    `
    db.query(query, callback)
}

const getOrderById = (id, callback) => {
    const sql = "SELECT * FROM orders WHERE id = ?"
    db.query(sql, [id], callback)
}

// Buat pesanan baru
const createOrder = (collector_id, trash_id, payment_method, total_price, total_coins, callback) => {
    const query = `
        INSERT INTO orders (seller_id, collector_id, trash_id, payment_method, total_price, total_coins, status, created_at, updated_at)
        SELECT t.user_id, ?, t.id, ?, ?, ?, 'pending', NOW(), NOW()
        FROM trash t WHERE t.id = ?
    `
    db.query(query, [collector_id, payment_method, total_price, total_coins, trash_id], callback)
}



// Selesaikan pesanan dan tambahkan koin ke pengepul
const completeOrder = (order_id, callback) => {
    const query = `
        UPDATE users u
        JOIN orders o ON u.id = o.seller_id
        SET u.coins = u.coins + o.total_coins,
            o.status = 'completed',
            o.updated_at = NOW()
        WHERE o.id = ?
    `
    db.query(query, [order_id], callback)
}


module.exports = { getAllOrders, getOrderById, createOrder, completeOrder }
