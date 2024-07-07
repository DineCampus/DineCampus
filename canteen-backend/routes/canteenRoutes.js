const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const JWT_SECRET = '12345'; // Replace with your secure secret

// Pre-approved staff IDs
const preApprovedStaffIDs = [12345, 67890, 11223];

// Registration endpoint
router.post('/register', async (req, res) => {
    const { idNumber, password, role } = req.body;

    if (role === 'staff' && !preApprovedStaffIDs.includes(parseInt(idNumber))) {
        return res.status(400).send('Registration failed for staff. Invalid ID.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (idNumber, password, role, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())', [idNumber, hashedPassword, role], (err, result) => {
            if (err) {
                console.error('Error during registration:', err);
                return res.status(500).send('Registration failed. Please try again.');
            }
            res.status(201).send('Registration successful');
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Registration failed. Please try again.');
    }
});

// Login endpoint
router.post('/login', (req, res) => {
    const { idNumber, password } = req.body;

    db.query('SELECT * FROM users WHERE idNumber = ?', [idNumber], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Login failed. Please try again.');
        }

        if (results.length === 0) {
            return res.status(400).send('Login failed. User not found.');
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Login failed. Incorrect password.');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Get all stores
router.get('/stores', (req, res) => {
    db.query('SELECT * FROM stores', (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Server error' });
        } else {
            res.json(results);
        }
    });
});

// Get a specific store by ID
router.get('/stores/:id', (req, res) => {
    const storeId = req.params.id;
    db.query('SELECT * FROM stores WHERE id = ?', [storeId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (results.length === 0) {
            res.status(404).send('Store not found');
        } else {
            res.json(results[0]);
        }
    });
});

// Get items for a specific store
router.get('/stores/:id/items', (req, res) => {
    const storeId = req.params.id;
    db.query('SELECT * FROM items WHERE store_id = ?', [storeId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});

// Get item details for a specific store and item
router.get('/stores/:storeId/items/:itemId', (req, res) => {
    const { storeId, itemId } = req.params;
    db.query('SELECT * FROM items WHERE store_id = ? AND id = ?', [storeId, itemId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else if (results.length === 0) {
        res.status(404).send('Item not found');
      } else {
        res.json(results[0]);
      }
    });
});

// Add a new store (staff only)
router.post('/stores', authenticate, authorize('staff'), (req, res) => {
    const { name, icon } = req.body;
    const now = new Date();
    db.query('INSERT INTO stores (name, icon, createdAt, updatedAt) VALUES (?, ?, ?, ?)', [name, icon, now, now], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json({ id: result.insertId, name, icon });
        }
    });
});

// Add a new item to a store (staff only)
router.post('/stores/:storeId/items', authenticate, authorize('staff'), (req, res) => {
    const { storeId } = req.params;
    const { name, description, price, image } = req.body;
    const query = 'INSERT INTO items (store_id, name, description, price, image) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [storeId, name, description, price, image], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(201).send('Item added successfully');
        }
    });
});

// Remove a store (staff only)
router.delete('/stores/:id', authenticate, authorize('staff'), (req, res) => {
    const storeId = req.params.id;
    
    // First, delete the related items
    db.query('DELETE FROM items WHERE store_id = ?', [storeId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error while deleting related items');
        }

        // Then, delete the store
        db.query('DELETE FROM stores WHERE id = ?', [storeId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error while deleting store');
            }
            res.send('Store deleted successfully');
        });
    });
});


// Remove an item from a store (staff only)
router.delete('/stores/:storeId/items/:itemId', authenticate, authorize('staff'), (req, res) => {
    const { storeId, itemId } = req.params;
    db.query('DELETE FROM items WHERE store_id = ? AND id = ?', [storeId, itemId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.send('Item deleted successfully');
        }
    });
});

// Update item price in a store (staff only)
router.put('/stores/:storeId/items/:itemId', authenticate, authorize('staff'), (req, res) => {
    const { storeId, itemId } = req.params;
    const { price } = req.body;
    db.query('UPDATE items SET price = ? WHERE store_id = ? AND id = ?', [price, storeId, itemId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.send('Item price updated successfully');
        }
    });
});

module.exports = router;
