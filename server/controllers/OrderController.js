// orderController.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // For unique order IDs

let orders = []; // In-memory data store

// CREATE order
router.post('/', (req, res) => {
    const { userId, items, totalAmount } = req.body;
    if (!userId || !items || !Array.isArray(items)) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    const newOrder = {
        id: uuidv4(),
        userId,
        items,
        totalAmount,
        status: 'pending',
        createdAt: new Date(),
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// READ: Get single order
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

// UPDATE: Modify an existing order
router.put('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    if (order.status !== 'pending') {
        return res.status(403).json({ message: 'Only pending orders can be updated' });
    }

    const { items, totalAmount } = req.body;
    if (items && Array.isArray(items)) order.items = items;
    if (totalAmount) order.totalAmount = totalAmount;

    order.updatedAt = new Date();
    res.json(order);
});

// DELETE: Cancel order
router.delete('/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const deletedOrder = orders.splice(index, 1)[0];
    res.json({ message: 'Order deleted', order: deletedOrder });
});

module.exports = router;
