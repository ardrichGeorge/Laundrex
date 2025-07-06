const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [ItemSchema],
    required: true,
    validate: [arr => arr.length > 0, 'Order must contain at least one item']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be non-negative']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: Date
});

// Auto-calculate totalAmount before saving
OrderSchema.pre('validate', function(next) {
  this.totalAmount = this.items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  next();
});

OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
