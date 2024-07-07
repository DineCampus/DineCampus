// routes/notificationsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch notifications
router.get('/notifications', (req, res) => {
    db.query('SELECT * FROM notifications ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});

// Delete a notification
router.delete('/notifications/:id', (req, res) => {
    const notificationId = req.params.id;
    db.query('DELETE FROM notifications WHERE id = ?', [notificationId], (err, result) => {
        if (err) {
            console.error('Error deleting notification:', err);
            return res.status(500).send('Server error');
        }
        res.json({ message: 'Notification deleted successfully' });
    });
});

module.exports = router;
