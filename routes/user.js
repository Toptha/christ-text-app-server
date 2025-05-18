const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/update', async (req, res) => {
  console.log('POST /update called with body:', req.body);
  const { email, deanery, department } = req.body;
  console.log({ email, deanery, department });
  console.log('Received update request:', { email, deanery, department });

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
      console.log('User not found for update:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', updatedUser);
    res.status(200).json({ message: 'User info updated', user: updatedUser });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});


// Search users by name (case-insensitive)
router.get('/search', async (req, res) => {
  const query = req.query.q || '';
  try {
    const users = await User.find({
      name: { $regex: query, $options: 'i' },
    }).limit(20); // limit results to 20 for performance
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optionally get all users (if needed)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().limit(50);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
