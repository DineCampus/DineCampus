// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const preApprovedStaffIDs = ['12345', '67890']; // Example pre-approved staff IDs
const JWT_SECRET = '12345'; // Replace with a secure secret

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { id, password, role } = req.body;

    // Check if the ID is pre-approved for staff
    if (role === 'staff' && !preApprovedStaffIDs.includes(id)) {
        return res.status(400).send('ID not pre-approved for staff');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (id, password, role, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())', [id, hashedPassword, role], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send(`Registration failed for ${role}. Please try again.`);
            }
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Registration failed for ${role}. Please try again.`);
    }
});

// log in a user
router.post('/login', async (req, res) => {
    const { idNumber, password } = req.body;
  
    db.query('SELECT * FROM users WHERE idNumber = ?', [idNumber], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).send('Server error');
      } else if (results.length === 0) {
        res.status(401).send('Invalid ID or password');
      } else {
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          res.status(401).send('Invalid ID or password');
        } else {
          const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
          res.json({ token, user: { id: user.id, idNumber: user.idNumber, role: user.role } });
        }
      }
    });
  });

module.exports = router;
