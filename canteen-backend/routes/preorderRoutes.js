const express = require('express');
const router = express.Router();
const db = require('../db');

// Function to generate a unique ticket number
const generateTicketNumber = () => {
    return `TKT${Date.now()}`;
};

// Pre-order from a store
router.post('/stores/:storeId/preorder', (req, res) => {
    const { storeId } = req.params;
    const { idNumber, items, pickupTime } = req.body;
    const now = new Date();
    const ticketNumber = generateTicketNumber();

    // Convert pickupTime to the correct format
    const formattedPickupTime = new Date(`${now.toISOString().split('T')[0]}T${pickupTime}:00`).toISOString().replace('T', ' ').split('.')[0];

    // Query the store name based on storeId
    db.query('SELECT name FROM stores WHERE id = ?', [storeId], (storeErr, storeResults) => {
        if (storeErr || storeResults.length === 0) {
            console.error('Error fetching store name:', storeErr);
            return res.status(500).send('Server error');
        }

        const storeName = storeResults[0].name;

        const orderDetails = items.map(item => `(${storeId}, '${idNumber}', ${item.id}, ${item.quantity}, '${formattedPickupTime}', '${now.toISOString().split('.')[0].replace('T', ' ')}', '${ticketNumber}')`).join(',');

        const query = `INSERT INTO preorders (store_id, id_number, item_id, quantity, pickup_time, created_at, ticket_number) VALUES ${orderDetails}`;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
            } else {
                // Add notification
                const notificationDetails = items.map(item => `${item.quantity} x ${item.name}`).join(', ');
                const notificationMessage = `由 ${idNumber} 从 ${storeName} ，单号： ${ticketNumber}: ${notificationDetails}. 取餐时间: ${pickupTime}`;
                const notificationQuery = 'INSERT INTO notifications (type, details, created_at) VALUES (?, ?, ?)';

                db.query(notificationQuery, ['食堂预订', notificationMessage, now], (notificationErr) => {
                    if (notificationErr) {
                        console.error('Error executing notification query:', notificationErr);
                        res.status(500).send('Server error');
                    } else {
                        res.json({ message: '食堂预订成功。', ticketNumber });
                    }
                });
            }
        });
    });
});

module.exports = router;
