const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/update', async (req, res) => {
  const { email, deanery, department } = req.body;

  if (!email || !deanery || !department) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { deanery, department },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User info updated', user: updatedUser });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
