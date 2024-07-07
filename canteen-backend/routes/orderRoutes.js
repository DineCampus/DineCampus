// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Function to generate a unique ticket number
const generateTicketNumber = () => {
    return `ORD${Date.now()}`;
};

// Function to format datetime in MySQL acceptable format
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Checkout and place order
router.post('/checkout', (req, res) => {
    const { userId, items, paymentMethod, totalAmount } = req.body;
    const now = formatDate(new Date());
    const ticketNumber = generateTicketNumber();

    // Fetch idNumber from users table
    db.query('SELECT idNumber FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user ID:', err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const idNumber = results[0].idNumber;
        const storeId = items[0].store_id; // Assuming all items are from the same store
        const storeName = items[0].storeName; // Assuming all items are from the same store
        const paymentStatus = paymentMethod === 'online' ? 'PAID' : 'PENDING';

        const orderDetails = items.map(item => `(${userId}, ${storeId}, ${item.id}, '${item.name}', ${item.quantity}, '${now}', '${paymentMethod}', '${ticketNumber}', '${idNumber}', ${totalAmount}, '${paymentStatus}')`).join(',');
        const query = `INSERT INTO orders (user_id, store_id, item_id, item_name, quantity, created_at, payment_method, ticket_number, id_number, total_amount, payment_status) VALUES ${orderDetails}`;

        console.log('Checkout request received:', req.body); // Log request body

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error executing query:', err); // Detailed error log
                return res.status(500).send('Server error');
            }

            // Add notification
            const notificationQuery = 'INSERT INTO notifications (type, details, created_at) VALUES (?, ?, ?)';
            const itemDetails = items.map(item => `${item.name} x ${item.quantity}`).join(', ');
            const notificationDetails = `由用户： ${idNumber} 在商店: ${storeName}. 单号: ${ticketNumber}. Items: ${itemDetails}. Payment Method: ${paymentMethod}`;
            db.query(notificationQuery, ['order', notificationDetails, now], (notificationErr) => {
                if (notificationErr) {
                    console.error('Error adding notification:', notificationErr); // Detailed error log
                    return res.status(500).send('Server error');
                }

                res.json({ message: '下单成功', ticketNumber });
            });
        });
    });
});

// Fetch order history for a specific user
router.get('/history/:userId', (req, res) => {
    const userId = req.params.userId;

    const ordersQuery = `
        SELECT o.id, o.ticket_number, o.total_amount, o.payment_method, o.created_at, s.name as store_name, o.item_name, o.quantity
        FROM orders o
        JOIN stores s ON o.store_id = s.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    `;

    const preordersQuery = `
        SELECT p.id, p.ticket_number, NULL as total_amount, NULL as payment_method, p.created_at, s.name as store_name, i.name as item_name, p.quantity
        FROM preorders p
        JOIN stores s ON p.store_id = s.id
        JOIN items i ON p.item_id = i.id
        WHERE p.user_id = ?
        ORDER BY p.created_at DESC
    `;

    const bookingsQuery = `
        SELECT b.id, b.ticket_number, NULL as total_amount, NULL as payment_method, b.created_at, s.name as store_name, NULL as item_name, NULL as quantity
        FROM bookings b
        JOIN stores s ON b.store_id = s.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    `;

    db.query(ordersQuery, [userId], (ordersErr, ordersResults) => {
        if (ordersErr) {
            console.error(ordersErr);
            return res.status(500).send('Server error');
        }

        db.query(preordersQuery, [userId], (preordersErr, preordersResults) => {
            if (preordersErr) {
                console.error(preordersErr);
                return res.status(500).send('Server error');
            }

            db.query(bookingsQuery, [userId], (bookingsErr, bookingsResults) => {
                if (bookingsErr) {
                    console.error(bookingsErr);
                    return res.status(500).send('Server error');
                }

                const combinedResults = [
                    ...ordersResults.map(order => ({ ...order, type: 'order' })),
                    ...preordersResults.map(preorder => ({ ...preorder, type: 'preorder' })),
                    ...bookingsResults.map(booking => ({ ...booking, type: 'booking' })),
                ];

                combinedResults.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                res.json(combinedResults);
            });
        });
    });
});

module.exports = router;
