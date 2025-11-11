const { Schema, model, Types } = require('mongoose');

const EnrollmentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  courseId: { type: Types.ObjectId, ref: 'Course' },
  progressPercent: { type: Number, default: 0 },
  completedModules: [{ type: Types.ObjectId, ref: 'Module' }],
  wishlist: { type: Boolean, default: false },
  approvedByLead: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = model('Enrollment', EnrollmentSchema);