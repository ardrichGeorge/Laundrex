import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import apiRoutes from './routes/index.js'; // Consolidated router

dotenv.config();
console.log('🌱 Loaded MONGO_URI:', process.env.MONGO_URI);


const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// 🔗 Connect to MongoDB
mongoose.connect(mongoURI)

.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🔧 Middleware
app.use(express.json());

// 📦 API Routes
app.use('/api', apiRoutes);

// 🌐 Root route
app.get('/', (req, res) => {
  res.send('🌍 Welcome to the API server — alive and kicking!');
});

// ❓ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: '404: Route not found' });
});

// 🚨 Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 🚀 Start the server
app.listen(port, () => {
  console.log(`🔊 Server is running at http://localhost:${port}`);
});
