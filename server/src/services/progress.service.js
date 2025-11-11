const Enrollment = require('../models/Enrollment');
const Module = require('../models/Module');

async function updateProgress(enrollmentId) {
  const enrollment = await Enrollment.findById(enrollmentId).populate('courseId');
  if (!enrollment) return { percent: 0, completed: false };
  const modulesCount = await Module.countDocuments({ courseId: enrollment.courseId });
  const completedModules = enrollment.completedModules.length;
  enrollment.progressPercent = modulesCount ? Math.round((completedModules / modulesCount) * 100) : 0;
  await enrollment.save();
  const isCompleted = enrollment.progressPercent === 100;
  return { percent: enrollment.progressPercent, completed: isCompleted };
}

module.exports = { updateProgress };