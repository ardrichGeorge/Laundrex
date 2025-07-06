import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    enum: ['laundry', 'dry cleaning', 'ironing', 'custom'],
    default: 'laundry'
  },
  duration: {
    type: String,
    default: '1 day' // Example: "24 hours", "2 days"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', ServiceSchema);
export default Service;
