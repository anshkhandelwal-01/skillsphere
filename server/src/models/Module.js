const { Schema, model, Types } = require("mongoose");

const TrainingMaterialSchema = new Schema({
  title: String,
  url: String,
  readingUrl: {
    publicId: { type: String },
    pageCount: { type: Number },
    pdfUrl: { type: String },
  },
  assignmentId: { type: Types.ObjectId, ref: "Assessment" },
});

const ModuleSchema = new Schema(
  {
    courseId: { type: Types.ObjectId, ref: "Course" },
    materials: [TrainingMaterialSchema],
  },
  { timestamps: true }
);

module.exports = model("Module", ModuleSchema);
