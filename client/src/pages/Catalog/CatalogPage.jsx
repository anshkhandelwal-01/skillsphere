import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { getCourses, deleteCourse, createCourse } from "../../api/courses.api";
import { EllipsisVertical, Trash2, Plus } from "lucide-react";
import { useSnackbar } from "notistack";
import { addCourseModules } from "../../api/modules.api";
import { useNavigate } from "react-router-dom";

export default function CatalogPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [format, setFormat] = useState("");

  const [openMenu, setOpenMenu] = useState(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [type, setType] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState("");

  const role = localStorage.getItem("role");

  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [ctitle, setCTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [roleTarget, setRoleTarget] = useState("Developer");
  const [clevel, setCLevel] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [cformat, setCFormat] = useState("Video");
  const [instructor, setInstructor] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isLegacyProcess, setIsLegacyProcess] = useState(false);
  const [weightage, setWeightage] = useState("");

  // ===========================
  // FIX: Prevent infinite loop
  // ===========================
  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(query.toLowerCase()) &&
      (level ? c.level === level : true) &&
      (format ? c.format === format : true)
  );

  const openMaterialModalFn = (courseId) => {
    setSelectedCourseId(courseId);
    setShowMaterialModal(true);
    setOpenMenu(null); // close menu
  };

  //Module form and video setup
  const formData = new FormData();
  formData.append("video", file);
  formData.append("type", type);
  formData.append("title", materialTitle);
  formData.append("assignment", assignment);

  const handleAddMaterial = async () => {
    try {
      const data = await addCourseModules(
        selectedCourseId,
        formData // send formData directly
      );
      console.log(data);
      enqueueSnackbar("Material added!", { variant: "success" });
      setShowMaterialModal(false);

      setType("");
      setMaterialTitle("");
      setFile(null);

      navigate(`/modules/${selectedCourseId}`);
    } catch (err) {
      enqueueSnackbar("Failed to add material", { variant: "error" });
    }
  };

  const handleCreateCourse = async () => {
    try {
      await createCourse(
        ctitle,
        description,
        category,
        roleTarget,
        clevel,
        durationMinutes,
        cformat,
        instructor,
        featured,
        isLegacyProcess,
        weightage
      );

      enqueueSnackbar("Course created!", { variant: "success" });
      setShowCreateCourse(false);
    } catch {
      enqueueSnackbar("Error creating course", { variant: "error" });
    }
  };

  //Delete Course
  const handleDeleteCourse = async (title) => {
    try {
      await deleteCourse(title);
      enqueueSnackbar("Course deleted!", { variant: "success" });
    } catch {
      enqueueSnackbar("Error deleting course", { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col p-6 space-y-4">
      <Typography variant="h5">Course Catalog</Typography>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <TextField
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <TextField
          select
          label="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {["", "Beginner", "Intermediate", "Advanced"].map((v) => (
            <MenuItem value={v} key={v}>
              {v || "Any"}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          {["", "Video", "Interactive", "Text"].map((v) => (
            <MenuItem value={v} key={v}>
              {v || "Any"}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <Grid container spacing={3}>
        {filtered.map((c, index) => (
          <Grid item xs={12} md={4} key={c._id}>
            <Paper className="p-4 space-y-3 relative">
              {/* Menu Button */}
              {(role === "ADMIN" || role === "LEAD") && (
                <div>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                  >
                    <EllipsisVertical />
                  </button>

                  {openMenu === index && (
                    <div className="absolute top-10 right-3 bg-white w-36 rounded shadow z-20">
                      <button
                        onClick={() => openMaterialModalFn(c._id)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-200 flex gap-2"
                      >
                        <Plus size={16} /> Add Module
                      </button>

                      <button
                        onClick={() => handleDeleteCourse(c.title)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-200 text-red-600 flex gap-2"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Typography className="font-semibold">{c.title}</Typography>
              <Typography color="gray">{c.description}</Typography>

              <div className="flex gap-2 flex-wrap">
                <Chip label={c.category} />
                <Chip label={c.level} />
                {c.featured && <Chip label="Featured" color="secondary" />}
              </div>

              <Button variant="contained" href={`/modules/${c._id}`}>
                View
              </Button>
            </Paper>
          </Grid>
        ))}

        {/* Add Course Box */}
        {(role === "ADMIN" || role === "LEAD") && (
          <Paper
            className="p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100"
            onClick={() => setShowCreateCourse(true)}
          >
            <Plus size={90} className="text-gray-400" />
            <Typography>Add Course</Typography>
          </Paper>
        )}
      </Grid>

      {/* ========================= */}
      {/* Material Modal */}
      {/* ========================= */}
      {showMaterialModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Add Material</h2>

            <div className="space-y-4">
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Video, Document"
                className="border p-2 w-full rounded text-black"
              />

              <input
                value={materialTitle}
                onChange={(e) => setMaterialTitle(e.target.value)}
                placeholder="Material Title"
                className="border p-2 w-full rounded text-black"
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                placeholder="Video File (.mp4 supported)"
                className="border p-2 w-full rounded text-black"
              />

              <input
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
                placeholder="Assignment ID (optional)"
                className="border p-2 w-full rounded text-black"
              />

              <div className="flex justify-end gap-3">
                <Button onClick={() => setShowMaterialModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMaterial} variant="contained">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Create Course Modal */}
      {/* ========================= */}
      {showCreateCourse && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[700px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Create New Course</h2>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Title"
                  value={ctitle}
                  onChange={(e) => setCTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Role Target"
                  value={roleTarget}
                  onChange={(e) => setRoleTarget(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Level"
                  value={clevel}
                  onChange={(e) => setCLevel(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Format"
                  value={cformat}
                  onChange={(e) => setCFormat(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Legacy"
                  value={isLegacyProcess}
                  onChange={(e) => setIsLegacyProcess(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Instructor"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Weightage"
                  value={weightage}
                  onChange={(e) => setWeightage(e.target.value)}
                />
              </Grid>
            </Grid>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setShowCreateCourse(!showCreateCourse)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleCreateCourse}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
