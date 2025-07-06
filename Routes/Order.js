const express = require('express');
const { body } = require('express-validator');
const OrderController = require('../controllers/OrderController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// POST - Create a new order
router.post(
  '/',
  authenticate,
  body('services').isArray({ min: 1 }).withMessage('Services must be a non-empty array'),
  OrderController.createOrder
);

// GET - All orders for authenticated user
router.get('/', authenticate, OrderController.getOrders);

// GET - Single order by ID
router.get('/:id', authenticate, OrderController.getOrder);

// PUT - Update order
router.put('/:id', authenticate, OrderController.updateOrder);

// DELETE - Delete order
router.delete('/:id', authenticate, OrderController.deleteOrder);

module.exports = router;
