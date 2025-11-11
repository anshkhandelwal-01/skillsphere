const { Schema, model, Types } = require('mongoose');

const CourseSchema = new Schema({
  title: String,
  description: String,
  category: String,
  roleTarget: [String],
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  durationMinutes: Number,
  format: { type: String, enum: ['Video', 'Interactive', 'Text'] },
  instructor: String,
  featured: { type: Boolean, default: false },
  modules: [{ type: Types.ObjectId, ref: 'Module' }],
  isLegacyProcess: { type: Boolean, default: false },
  weightage: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = model('Course', CourseSchema);