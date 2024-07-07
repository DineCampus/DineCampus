// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = '12345'; // Replace with a secure secret

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send('Access denied');
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
};

module.exports = { authenticate, authorize };
