import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Create Order (authenticated)
router.post('/', auth, async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order must include at least one item' });
  }

  try {
    const newOrder = new Order({
      userId: req.user.userId,
      items
      // totalAmount is auto-calculated in model
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ error: 'Could not create order' });
  }
});

// ✅ Get current user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
