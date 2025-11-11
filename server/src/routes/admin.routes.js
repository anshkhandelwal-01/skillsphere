const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

router.patch('/courses/:courseId/weightage', requireAuth, requireRole('LEAD', 'ADMIN'), async (req, res) => {
  const { courseId } = req.params;
  const { weightage, isLegacyProcess } = req.body;
  const updated = await Course.findByIdAndUpdate(courseId, { weightage, isLegacyProcess }, { new: true });
  res.json(updated);
});

router.get('/analytics/popular-courses', requireAuth, requireRole('LEAD', 'ADMIN'), async (req, res) => {
  const popular = await Course.find().sort({ featured: -1 }).limit(10);
  res.json(popular);
});

router.patch('/users/:userId', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { userId } = req.params;
  const { role, leadId } = req.body;
  const updated = await User.findByIdAndUpdate(userId, { role, leadId }, { new: true });
  res.json(updated);
});

module.exports = router;