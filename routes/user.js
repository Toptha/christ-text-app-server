const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/update', async (req, res) => {
  const { email, deanery, department } = req.body;
  try {
    await User.findOneAndUpdate({ email }, { deanery, department });
    res.status(200).json({ message: 'User info updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
