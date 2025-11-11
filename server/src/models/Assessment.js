const { Schema, model, Types } = require('mongoose');

const QuestionSchema = new Schema({
  prompt: String,
  type: { type: String, enum: ['MCQ', 'TrueFalse', 'Short'] },
  options: [String],
  correctIndex: Number,
  weight: { type: Number, default: 1 }
});

const AssessmentSchema = new Schema({
  title: String,
  courseId: { type: Types.ObjectId, ref: 'Course' },
  moduleId: { type: Types.ObjectId, ref: 'Module' },
  type: { type: String, enum: ['Quiz', 'Assessment', 'Assignment'] },
  maxAttempts: { type: Number, default: 5 },
  points: { type: Number, default: 100 },
  showFeedback: { type: Boolean, default: false },
  questions: [QuestionSchema],
  dueDate: Date
}, { timestamps: true });

module.exports = model('Assessment', AssessmentSchema);