const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Update user password
router.put('/api/users/:id/password', async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    // Fetch the user from the database
    const userQuery = 'SELECT * FROM users WHERE id = ?';
    const [user] = await db.query(userQuery, [id]);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Incorrect current password');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
    await db.query(updateQuery, [hashedPassword, id]);

    res.send('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('Server error');
  }
});
// Get order history
router.get('/:id/orders', authenticate, authorize('user'), async (req, res) => {
  const { id } = req.params;

  try {
    const preorders = await db.query('SELECT * FROM preorders WHERE user_id = ?', [id]);
    const bookings = await db.query('SELECT * FROM bookings WHERE user_id = ?', [id]);
    const checkoutOrders = await db.query('SELECT * FROM orders WHERE user_id = ?', [id]);

    const orderHistory = [...preorders, ...bookings, ...checkoutOrders];
    res.json(orderHistory);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).send('Server error');
  }
});

// Fetch user details
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
          console.error('Error fetching user details:', err);
          res.status(500).send('Server error');
      } else if (results.length === 0) {
          res.status(404).send('User not found');
      } else {
          res.json(results[0]);
      }
  });
});


module.exports = router;


module.exports = router;
