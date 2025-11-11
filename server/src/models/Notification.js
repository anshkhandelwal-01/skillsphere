const { Schema, model, Types } = require('mongoose');

const NotificationSchema = new Schema({
  toUserId: { type: Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['AssessmentReminder', 'Overdue', 'AttemptLimit', 'LeadNotified', 'NewContent'] },
  title: String,
  message: String,
  read: { type: Boolean, default: false },
  meta: {}
}, { timestamps: true });

module.exports = model('Notification', NotificationSchema);