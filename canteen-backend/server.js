// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const canteenRoutes = require('./routes/canteenRoutes');
const preorderRoutes = require('./routes/preorderRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const healthRoutes = require('./routes/healthRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const storeRoutes = require('./routes/storeRoutes');


app.use(cors());
app.use(bodyParser.json());

app.use('/api', canteenRoutes);
app.use('/api', preorderRoutes);
app.use('/api', bookingRoutes);
app.use('/api', healthRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);
app.use('/api', notificationsRoutes);
app.use('/api', storeRoutes);


app.get('/', (req, res) => {
  res.send('Canteen Backend API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
