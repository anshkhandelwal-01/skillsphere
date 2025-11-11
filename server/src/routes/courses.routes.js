const express = require('express');
const { requireAuth } = require('../middleware/auth');
const Course = require('../models/Course');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const courses = await Course.find().populate('modules');
  res.json(courses);
});

module.exports = router;