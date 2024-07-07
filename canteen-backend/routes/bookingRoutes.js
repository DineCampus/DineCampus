const express = require('express');
const router = express.Router();
const db = require('../db');

// Function to generate a unique ticket number
const generateTicketNumber = () => {
    return `TKT${Date.now()}`;
};

// Booking services
router.post('/booking', (req, res) => {
    const { name, userId, eventDetails, peopleCount, bookingType, room, bookingTime } = req.body;
    const now = new Date();
    const ticketNumber = generateTicketNumber();

    // Insert booking details into the bookings table
    db.query(
        'INSERT INTO bookings (name, user_id, event_details, people_count, booking_type, room, booking_time, created_at, ticket_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [name, userId, eventDetails, peopleCount, bookingType, room, bookingTime, now, ticketNumber], 
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server error');
            } else {
                // Add notification
                const notificationQuery = 'INSERT INTO notifications (type, details, created_at) VALUES (?, ?, ?)';
                const notificationDetails = `由 ${name} (ID: ${userId}) 预订 ${peopleCount} 人. 类型: ${bookingType}${room ? `, 包厢: ${room}` : ''}. 单号: ${ticketNumber}`;
                db.query(notificationQuery, ['包厢预订', notificationDetails, now], (notificationErr) => {
                    if (notificationErr) {
                        console.error(notificationErr);
                        res.status(500).send('Server error');
                    } else {
                        res.json({ message: '包厢预订成功。', ticketNumber });
                    }
                });
            }
        }
    );
});

module.exports = router;
