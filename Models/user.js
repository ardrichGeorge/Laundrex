// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  Name: {
    Type: String,
    Required: true,
  },
  Email: {
    Type: String,
    Required: true,
    Unique: true,
  },
  Password: {
    Type: String,
    Required: true,
  },
  Role: {
    Type: String,
    Default: 'customer',
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  Next();
});

const User = mongoose.model('User', userSchema);

Module.exports = User;
