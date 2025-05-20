const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.get('/', async (req, res) => {
  const searchQuery = req.query.search?.trim(); 
  const currentUserEmail = req.query.currentUser;

  try {
    let users;
    if (!searchQuery) {
      users = await User.find({ email: { $ne: currentUserEmail } }).select('name email');
    } else {
      users = await User.find({
        $and: [
          { email: { $ne: currentUserEmail } },
          {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { email: { $regex: searchQuery, $options: 'i' } }
            ]
          }
        ]
      }).select('name email');
    }

    res.json({ users });
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;