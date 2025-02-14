
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Search users
router.get('/search', auth, async (req, res) => {
  try {
    const { term } = req.query;
    const user = await User.findOne({
      $or: [
        { username: new RegExp(term, 'i') },
        { email: new RegExp(term, 'i') }
      ]
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
