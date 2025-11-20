const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const Module = require("../models/Module");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/:courseId", requireAuth, async (req, res) => {
  const { courseId } = req.params;
  try {
    const modules = await Module.find({ courseId }).sort({ order: 1 });
    const allMaterials = modules.flatMap((m) => m.materials);
    res.json(allMaterials);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:courseId/add-material", requireAuth, requireRole("ADMIN", "LEAD"), upload.single("video"), async (req, res) => {
    const { courseId } = req.params;

    try {
      // 1. Upload video to cloudinary
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "courses/videos",
      });

      const videoUrl = cloudinaryResult.secure_url;

      // 2. Extract other fields from body
      const { type, title, assignmentId } = req.body;

      const newMaterial = {
        type,
        title,
        url: videoUrl,
        assignmentId,
      };

      // 3. Find existing module
      const existing = await Module.find({ courseId }).sort({ order: 1 });

      let result;

      if (existing.length === 0) {
        // If module doesn’t exist → create a new one
        result = await Module.create({
          courseId,
          materials: [newMaterial],
        });
      } else {
        // Module exists → push new material
        result = await Module.findByIdAndUpdate(
          existing[0]._id,
          { $push: { materials: newMaterial } },
          { new: true }
        );
      }

      // 4. FINAL SINGLE RESPONSE (IMPORTANT)
      res.json({
        message: "Material added successfully",
        material: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
