const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['USER', 'LEAD', 'ADMIN'], default: 'USER' },
  leadId: { type: Types.ObjectId, ref: 'User' },
  preferences: {
    learningStyle: { type: String, enum: ['Video', 'Text', 'Interactive'], default: 'Video' },
    availability: String
  },
  skillMatrix: [{
    skill: String,
    level: { type: Number, min: 0, max: 5 },
    points: { type: Number, default: 0 }
  }],
  badges: [{ type: Types.ObjectId, ref: 'Badge' }],
  certificates: [{ type: String }]
}, { timestamps: true });

module.exports = model('User', UserSchema);