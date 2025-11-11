const { Schema, model, Types } = require('mongoose');

const AttemptSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  assessmentId: { type: Types.ObjectId, ref: 'Assessment' },
  answers: [{ questionIndex: Number, answerIndex: Number, text: String }],
  score: Number,
  passed: Boolean,
  attemptNumber: Number
}, { timestamps: true });

module.exports = model('Attempt', AttemptSchema);