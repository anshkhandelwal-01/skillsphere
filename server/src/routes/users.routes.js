const express = require('express');
const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('badges');
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({
    id: user._id,
    email: user.email,
    role: user.role,
    badges: user.badges,
    certificates: user.certificates,
    name: user.name
  });
});

module.exports = router;