// routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get nutritional content for an item
router.get('/health/nutritional/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    db.query('SELECT nutritional_info FROM items WHERE id = ?', [itemId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(result[0]);
        }
    });
});

// Get health tips
router.get('/health/tips', (req, res) => {
    db.query('SELECT * FROM health_tips', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
