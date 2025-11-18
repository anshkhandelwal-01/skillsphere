import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { createCourse, deleteCourse } from "../../api/courses.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const [createshow, setCreateShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [roleTarget, setRoleTarget] = useState("Developer");
  const [level, setLevel] = useState("");
  const [durationMinutes, setDurationMinutes] = useState();
  const [format, setFormat] = useState("Video");
  const [instructor, setInstructor] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isLegacyProcess, setIsLegacyProcess] = useState(false);
  const [weightage, setWeightage] = useState();

  const handleCreateCourse = async () => {
    try {
      const courseData = await createCourse(
        title,
        description,
        category,
        roleTarget,
        level,
        durationMinutes,
        format,
        instructor,
        featured,
        isLegacyProcess,
        weightage
      );
      navigate("/catalog", { replace: true });
      enqueueSnackbar("Course created successfully!", {
        variant: "success",
      });
      setCreateShow(false);
    } catch (error) {
      console.error("Error creating course:", error);
      enqueueSnackbar("Failed to create new Course. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar className="px-6">
        <Typography variant="h6" color="primary">
          SkillSphere
        </Typography>
        <div className="ml-auto">
          {role === "ADMIN" || role === "LEAD" ? (
            <button
              className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              onClick={() => setCreateShow(!createshow)}
            >
              Create Course
            </button>
          ) : null}
          {createshow ? (
            <div className="absolute top-16 right-16 w-196 p-6 bg-white border border-gray-300 rounded shadow-lg z-50">
              <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
              {/* Form fields for course creation can be added here */}
              <form
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="block">
                  <span className="text-sm font-medium text-black">Title</span>
                  <input
                    type="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Course Title"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Description
                  </span>
                  <input
                    type="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Course Description"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Category
                  </span>
                  <input
                    type="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter Course Category"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Role Target
                  </span>
                  <input
                    type="roleTarget"
                    required
                    value={roleTarget}
                    onChange={(e) => setRoleTarget(e.target.value)}
                    placeholder="Enter Course Role Target"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">Level</span>
                  <select
                    onChange={(e) => setLevel(e.target.value)}
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    value={level}
                  >
                    <option value="" disabled>
                      -- Select Level --
                    </option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Duration (in Minutes)
                  </span>
                  <input
                    type="durationMinutes"
                    required
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    placeholder="Enter Course Duration"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">Format</span>
                  <input
                    type="format"
                    required
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    placeholder="Enter Course Format"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Instructor
                  </span>
                  <input
                    type="instructor"
                    required
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    placeholder="Enter Course Instructor"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Featured
                  </span>
                  <input
                    type="featured"
                    required
                    value={featured}
                    onChange={(e) => setFeatured(e.target.value)}
                    placeholder="Enter Course Featured"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Legacy Process
                  </span>
                  <input
                    type="isLegacyProcess"
                    required
                    value={isLegacyProcess}
                    onChange={(e) => setIsLegacyProcess(e.target.value)}
                    placeholder="Enter Course Leagacy Process"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-black">
                    Weightage
                  </span>
                  <input
                    type="weightage"
                    required
                    value={weightage}
                    onChange={(e) => setWeightage(e.target.value)}
                    placeholder="Enter Course Title"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </label>
              </form>

              <button
                type="submit"
                onClick={handleCreateCourse}
                className="ml-68 mt-4 py-2 px-4 rounded-xl text-black font-medium transition bg-slate-400 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                Add New Course
              </button>
            </div>
          ) : null}
          <IconButton>
            <Badge color="secondary" badgeContent={3}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
