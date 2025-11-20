const { Schema, model, Types } = require('mongoose');

const TrainingMaterialSchema = new Schema({
  type: { type: String, enum: ['Document', 'Video', 'PDF', 'Link'] },
  title: String,
  url: String,
  assignmentId: { type: Types.ObjectId, ref: 'Assessment' }
});

const ModuleSchema = new Schema({
  courseId: { type: Types.ObjectId, ref: 'Course' },
  materials: [TrainingMaterialSchema]
}, { timestamps: true });

module.exports = model('Module', ModuleSchema);