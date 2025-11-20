require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../src/models/User");
const Course = require("../src/models/Course");
const Module = require("../src/models/Module");
const Assessment = require("../src/models/Assessment");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Module.deleteMany({}),
    Assessment.deleteMany({}),
  ]);

  const admin = await User.create({
    email: "admin@skillsphere.local",
    passwordHash: bcrypt.hashSync("Admin@123", 10),
    role: "ADMIN",
    name: "Admin",
  });

  const lead = await User.create({
    email: "lead@skillsphere.local",
    passwordHash: bcrypt.hashSync("Lead@123", 10),
    role: "LEAD",
    name: "Lead",
  });

  const user = await User.create({
    email: "user@skillsphere.local",
    passwordHash: bcrypt.hashSync("User@123", 10),
    role: "USER",
    name: "Learner",
    leadId: lead._id,
  });

  const course = await Course.create({
    title: "ETL Basics",
    description: "Foundations of ETL pipelines and schema design.",
    category: "ETL",
    roleTarget: ["Developers"],
    level: "Beginner",
    durationMinutes: 120,
    format: "Video",
    instructor: "Dr. Data",
    featured: true,
    isLegacyProcess: false,
    weightage: 1,
  });

  const assignment = await Assessment.create({
    title: "ETL Final Assignment",
    courseId: course._id,
    type: "Assignment",
    maxAttempts: 1,
    points: 150,
    showFeedback: false,
    dueDate: new Date(),
    questions: [
      {
        prompt: "Design a simple ETL pipeline with schema.",
        type: "Short",
        options: [],
        correctIndex: 0,
        weight: 3,
      },
    ],
  });

  const module = await Module.create({
    courseId: course._id,
    title: "Introduction to ETL",
    order: 1,
    materials: [
      {
        type: "Video",
        title: "ETL Overview",
        url: "https://example.com/video1",
        assignmentId: assignment._id,
      },
      {
        type: "Video",
        title: "Extraction in ETL",
        url: "https://example.com/video2",
        assignmentId: assignment._id,
      },
    ],
  });

  course.modules = [module._id];
  await course.save();

  console.log("Seed done");
  process.exit(0);
}

run();
