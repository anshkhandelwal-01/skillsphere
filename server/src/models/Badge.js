const { Schema, model } = require('mongoose');

const BadgeSchema = new Schema({
  name: { type: String, enum: ['Bronze', 'Silver', 'Gold'] },
  description: String,
  criteria: String,
  iconUrl: String
}, { timestamps: true });

module.exports = model('Badge', BadgeSchema);