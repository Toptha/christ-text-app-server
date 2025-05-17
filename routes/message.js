const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get messages between two users (sender and receiver)
router.get('/', async (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.status(400).json({ message: 'Missing user emails' });

  try {
    const messages = await Message.find({
      $or: [
        { senderEmail: user1, receiverEmail: user2 },
        { senderEmail: user2, receiverEmail: user1 }
      ]
    }).sort({ timestamp: 1 });  // sort ascending by time

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Post a new message
router.post('/', async (req, res) => {
  const { senderEmail, receiverEmail, text } = req.body;
  if (!senderEmail || !receiverEmail || !text) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const message = new Message({ senderEmail, receiverEmail, text });
    await message.save();
    res.status(201).json({ message: 'Message sent', messageData: message });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
