const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check for existing user
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send('Username already exists');
  } catch (err) {
    return res.status(500).send('Server Error');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ username, password: hashedPassword });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).send('Invalid user data');
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send('Invalid username or password');
  } catch (err) {
    return res.status(500).send('Server Error');
  }

  // Compare password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid username or password');

  // Generate JWT token
  try {
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
