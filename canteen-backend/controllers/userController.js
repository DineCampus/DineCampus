const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, AllowedID } = require('../models');

const registerUser = async (req, res) => {
  const { id, username, password, role } = req.body;
  try {
    const allowedID = await AllowedID.findOne({ where: { id, role } });
    if (!allowedID) {
      return res.status(400).json({ message: 'ID not allowed to register' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'your_jwt_secret', {
      expiresIn: '1h'
    });

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
