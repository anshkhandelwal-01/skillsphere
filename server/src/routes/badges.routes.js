const express = require('express');
const { requireAuth } = require('../middleware/auth');
const Badge = require('../models/Badge');
const User = require('../models/User');

const router = express.Router();

router.post('/award', requireAuth, async (req, res) => {
  const { userId, badgeName } = req.body;
  let badge = await Badge.findOne({ name: badgeName });
  if (!badge) badge = await Badge.create({ name: badgeName, description: `${badgeName} badge` });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const has = user.badges.some(b => String(b) === String(badge._id));
  if (!has) {
    user.badges.push(badge._id);
    await user.save();
  }

  res.json({ success: true, badge: { id: badge._id, name: badge.name } });
});

module.exports = router;