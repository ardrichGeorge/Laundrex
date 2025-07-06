// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  Name: {
    Type: String,
    Required: true,
  },
  Price: {
    Type: Number,
    Required: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
