const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const Module = require("../models/Module");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/:courseId", requireAuth, async (req, res) => {
  try {
    const moduleData = await Module.findOne({ courseId: req.params.courseId });
    res.json(moduleData ? moduleData.materials : []);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ----------------------------------------------------------
   ADD Material (Video + PDF)
----------------------------------------------------------- */
router.put(
  "/:courseId/add-material",
  requireAuth,
  requireRole("ADMIN", "LEAD"),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "reading", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let videoUrl = null;
      let readingUrl = null;

      // ------------------ VIDEO UPLOAD ------------------
      if (req.files?.video?.length > 0) {
        console.log("Uploading video to Cloudinary...");
        const cloudinaryResult = await cloudinary.uploader.upload(
          req.files.video[0].path,
          {
            resource_type: "video",
            folder: "courses/videos",
          }
        );

        videoUrl = cloudinaryResult.url;
      }

      // ------------------ PDF UPLOAD --------------------
      if (req.files?.reading?.length > 0) {
        console.log("Uploading reading to Cloudinary...");
        const cloudinaryResult = await cloudinary.uploader.upload(
          req.files.reading[0].path,
          {
            folder: "courses/readings",
            use_filename: true,
            unique_filename: false,
          }
        );
        readingUrl = {
          publicId: cloudinaryResult.public_id,
          pageCount: cloudinaryResult.pages,
          pdfUrl: cloudinaryResult.url,
        };
      }
      // ------------------ SAVE MATERIAL ------------------
      console.log("Saving material to database...");
      const { title, assignmentId } = req.body;

      const newMaterial = {
        title,
        url: videoUrl,
        readingUrl,
        assignmentId,
      };

      let course = await Module.findOne({ courseId: req.params.courseId });

      if (!course) {
        course = await Module.create({
          courseId: req.params.courseId,
          materials: [newMaterial],
        });
      } else {
        course.materials.push(newMaterial);
        await course.save();
      }

      return res.json({
        message: "Material added successfully",
        material: newMaterial,
      });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({ message: err.message });
    }
  }
);

router.get("/:courseId/reading", requireAuth, async (req, res) => {
  try {
    const moduleData = await Module.findOne({ courseId: req.params.courseId });
    const index = parseInt(req.query.index);
    const material = moduleData.materials[index];
    const { publicId, pageCount } = material.readingUrl;
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      const url = cloudinary.url(publicId, {
        page: i,
        format: "jpg",
        secure: true,
        resource_type: "image",
        transformation: [{ width: 900,crop: "scale" }]
      });
      pages.push(url);
    }
    return res.json({ pages });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
