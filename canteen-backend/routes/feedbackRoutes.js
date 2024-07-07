// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Submit feedback
router.post('/feedback', (req, res) => {
    const { userId, orderId, rating, comments } = req.body;
    const query = `
        INSERT INTO feedback (user_id, order_id, rating, comments, created_at)
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(query, [userId, orderId, rating, comments], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json({ message: 'Feedback submitted successfully' });
        }
    });
});

module.exports = router;
