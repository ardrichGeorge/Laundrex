// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Services: [
    {
      Type: String,
    },
  ],
  Status: {
    Type: String,
    Default: 'pending',
  },
});

const Order = mongoose.model('Order', orderSchema);

Module.exports = Order;
