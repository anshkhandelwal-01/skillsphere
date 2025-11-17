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

//Admin route to add a course 
router.post('/add-courses', requireAuth, requireRole('ADMIN', 'LEAD'), async (req, res) => {
  const { title, description, category, roleTarget, level, durationMinutes, format, instructor, featured, isLegacyProcess, weightage} = req.body;
  const existingcourse  = await Course.findOne({ title });
  if(existingcourse) return res.status(409).json({ error: 'Course with this title already exists' });
  const newCourse = await Course.create({
    title, description, category, roleTarget, level, durationMinutes, format, instructor, featured, isLegacyProcess, weightage
  });
  if(!newCourse) return res.status(500).json({ error: 'Error creating course' });
  res.json(newCourse);
});

//Admin route to delete a course
router.post('/delete-course', requireAuth, requireRole('ADMIN', 'LEAD'), async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  console.log(`Attempting to delete course with title: ${title}`);
  const deletedCourse = await Course.findOneAndDelete({title});
  if(!deletedCourse) return res.status(404).json({ message:title, error: 'Course not found' });
  res.json({ message: 'Course deleted successfully' });
});

module.exports = router;