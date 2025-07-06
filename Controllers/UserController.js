// controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false, // Start unverified
    });

    await newUser.save();

    // TODO: Send verification email here

    return res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  // Placeholder for email verification logic (e.g., using a token)
  return res.status(200).json({ message: 'Email verification coming soon.' });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  // Placeholder for generating and emailing a reset token
  return res.status(200).json({ message: 'Password reset link will be sent to your email.' });
};

exports.resetPassword = async (req, res) => {
  // Placeholder for verifying reset token and updating password
  return res.status(200).json({ message: 'Your password has been reset successfully.' });
};
