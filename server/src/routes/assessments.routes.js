const express = require('express');
const { requireAuth } = require('../middleware/auth');
const Attempt = require('../models/Attempt');
const Assessment = require('../models/Assessment');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Badge = require('../models/Badge');
const { computeAwardedPoints } = require('../services/points.service');
const { updateProgress } = require('../services/progress.service');
const { sendLeadNotification } = require('../services/notification.service');
const { generateCertificate } = require('../services/certificates.service');

const router = express.Router();

// Helper: auto-award badge based on course level (Bronze/Silver/Gold)
async function autoAwardBadge(userId, course) {
  const level = course.level || 'Beginner';
  const mapping = { Beginner: 'Bronze', Intermediate: 'Silver', Advanced: 'Gold' };
  const badgeName = mapping[level] || 'Bronze';
  let badge = await Badge.findOne({ name: badgeName });
  if (!badge) badge = await Badge.create({ name: badgeName, description: `${badgeName} badge` });
  const user = await User.findById(userId);
  if (!user) return null;
  const has = user.badges.some(b => String(b) === String(badge._id));
  if (!has) {
    user.badges.push(badge._id);
    await user.save();
    return { id: badge._id, name: badge.name };
  }
  return null;
}

router.get('/pending', requireAuth, async (req, res) => {
  const assessments = await Assessment.find();
  res.json({
    pending: assessments.map(a => ({ ...a.toObject(), attemptsRemaining: 5 })),
    completed: []
  });
});

router.get('/:assessmentId/attempts', requireAuth, async (req, res) => {
  const { assessmentId } = req.params;
  const attempts = await Attempt.find({ assessmentId, userId: req.user.id });
  res.json(attempts);
});

router.post('/:assessmentId/attempt', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { assessmentId, answers } = req.body;

  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) return res.status(404).json({ error: 'Assessment not found' });

  const priorAttempts = await Attempt.countDocuments({ userId, assessmentId });
  const maxAllowed = assessment.type === 'Assignment' ? 1 : (assessment.maxAttempts ?? 5);

  if (priorAttempts >= maxAllowed) {
    const user = await User.findById(userId);
    if (user?.leadId) await sendLeadNotification(String(user.leadId), assessment.title, user.name || 'User');
    return res.status(403).json({ error: 'Attempt limit reached', leadNotified: !!user?.leadId });
  }

  let correct = 0;
  assessment.questions.forEach((q, i) => {
    const ans = answers?.find(a => a.questionIndex === i);
    if ((q.type === 'MCQ' || q.type === 'TrueFalse') && ans?.answerIndex === q.correctIndex) {
      correct += q.weight || 1;
    }
  });

  const totalWeight = assessment.questions.reduce((s, q) => s + (q.weight || 1), 0);
  const scorePercent = totalWeight ? Math.round((correct / totalWeight) * 100) : 0;
  const attempt = await Attempt.create({
    userId, assessmentId, answers: answers || [], score: scorePercent, passed: scorePercent >= 60, attemptNumber: priorAttempts + 1
  });

  const points = await computeAwardedPoints(assessmentId, scorePercent);
  const enrollment = await Enrollment.findOne({ userId, courseId: assessment.courseId });
  let resBadge = null;
  let resCert = null;

  if (enrollment) {
    enrollment.pointsEarned += points;

    // If passed non-quiz and module exists, mark completion
    if (attempt.passed && assessment.type !== 'Quiz' && assessment.moduleId) {
      const has = enrollment.completedModules.some(m => String(m) === String(assessment.moduleId));
      if (!has) enrollment.completedModules.push(assessment.moduleId);
    }

    await enrollment.save();
    const progressUpdate = await updateProgress(String(enrollment._id));

    // Badge on assignment pass
    if (attempt.passed && assessment.type === 'Assignment') {
      const course = await Course.findById(assessment.courseId);
      resBadge = await autoAwardBadge(userId, course);
    }

    // Certificate on course completion
    if (progressUpdate.completed) {
      const user = await User.findById(userId);
      const course = await Course.findById(enrollment.courseId);
      resCert = await generateCertificate(user, course);
    }

    return res.json({
      attempt,
      pointsAwarded: points,
      badgeAwarded: resBadge,
      certificateUrl: resCert,
      courseCompleted: progressUpdate.completed
    });
  }

  res.json({ attempt, pointsAwarded: points });
});

module.exports = router;