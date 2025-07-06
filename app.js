const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const env = require('./config/env'); // Optional if you're using dotenv directly
const errorHandler = require('./middleware/errorHandler');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);    // Auth endpoints
app.use('/api/orders', orderRoutes);  // Order endpoints

// Health check route
app.get('/', (req, res) => {
  res.send('Laundrex API is running 🚀');
});

// Catch unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server after connecting to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

module.exports = app;
