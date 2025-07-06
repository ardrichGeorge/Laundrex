import mongoose from 'mongoose';

// Define schema for individual items in an order
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
}, { _id: false });

// Define the full Order schema
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
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Auto-calculate totalAmount before validation
OrderSchema.pre('validate', function (next) {
  this.totalAmount = this.items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  next();
});

// Virtual field for total number of items
OrderSchema.virtual('itemCount').get(function () {
  return this.items.reduce((acc, item) => acc + item.quantity, 0);
});

// Ensure virtuals are included in JSON output
OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
