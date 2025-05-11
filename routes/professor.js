const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');

router.get('/', async (req, res) => {
  const { deanery, department } = req.query;
  try {
    const profs = await Professor.find({ deanery, department });
    res.status(200).json(profs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching professors' });
  }
});

module.exports = router;
