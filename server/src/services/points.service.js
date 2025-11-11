const Assessment = require('../models/Assessment');
const Course = require('../models/Course');

async function computeAwardedPoints(assessmentId, rawScorePercent) {
  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) return 0;
  const course = await Course.findById(assessment.courseId);
  const weightage = course?.weightage ?? 1;
  const basePoints = assessment.points;
  const awarded = Math.round(basePoints * (rawScorePercent / 100) * weightage);
  return awarded;
}

module.exports = { computeAwardedPoints };