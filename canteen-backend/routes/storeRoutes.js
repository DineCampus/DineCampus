// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch all stores
router.get('/', (req, res) => {
    db.query('SELECT id, name, icon FROM stores', (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

// Fetch details of a specific store by ID
router.get('/:id', (req, res) => {
    const storeId = req.params.id;
    db.query('SELECT * FROM stores WHERE id = ?', [storeId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('Store not found');
        }
        res.json(results[0]);
    });
});

// Fetch items of a specific store by store ID
router.get('/:id/items', (req, res) => {
    const storeId = req.params.id;
    db.query('SELECT * FROM items WHERE store_id = ?', [storeId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

module.exports = router;
