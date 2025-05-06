const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const {email, regNo, password}= req.body;
  try {
    const existingUser= await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword= await bcrypt.hash(password, 10);
    const newUser= new User({ email, regNo, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during signup' });
  }
});

router.post('/login', async (req, res) => {
  const {username, password}= req.body;
  try {
    const user= await User.findOne({ email: username });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    const isMatch= await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports= router;
