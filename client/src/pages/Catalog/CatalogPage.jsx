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
import { getCourses, deleteCourse } from "../../api/courses.api";
import { EllipsisVertical, Trash2, Plus } from "lucide-react";
import { useSnackbar } from "notistack";
import { addCourseModules } from "../../api/modules.api";
import {useNavigate} from "react-router-dom";

export default function CatalogPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [format, setFormat] = useState("");
  const [openId, setOpenId] = useState(null);
  const [addMaterial, setAddMaterial] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    getCourses().then(setCourses);
  }, [courses]);

  const filtered = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(query.toLowerCase()) &&
      (level ? c.level === level : true) &&
      (format ? c.format === format : true)
  );

  const handleToggle = (i) => {
    setOpenId((prev) => (prev === i ? null : i));
  };

  const handleDeleteCourse = async (title) => {
    try {
      const courseDelete = await deleteCourse(title);
      enqueueSnackbar("Course deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      enqueueSnackbar("Course not found. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleAddMaterial = async (courseId) => {
    try {
      const data = await addCourseModules(courseId, type, title, url);
      enqueueSnackbar("Material added successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setAddMaterial(false);
      setType("");
      setTitle("");
      setUrl("");
      navigate(`/modules/${courseId}`);
    } catch (error) {
      console.error("Error adding material:", error);
      enqueueSnackbar("Failed to add material. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col p-6 space-y-4">
      <Typography variant="h5">Course catalog</Typography>
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
              {/* Ellipsis button at top right */}
              {role === "ADMIN" || role === "LEAD" ? (
                <div className="relative">
                  {/* Ellipsis Button */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                  >
                    <EllipsisVertical size={20} />
                  </button>

                  {/* Dropdown */}
                  {openId === index && (
                    <div className="absolute top-10 right-3 w-36 bg-white rounded-lg shadow-lg z-10 border border-gray-300">
                      <button
                        onClick={() => {
                          setAddMaterial(!addMaterial);
                        }}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-200"
                      >
                        <Plus size={16} /> Add Module
                      </button>
                      {addMaterial && (
                        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-lg z-50">
                          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <h2 className="text-lg font-semibold mb-4 text-black">
                              Add Material
                            </h2>

                            <form
                              onSubmit={(e) => e.preventDefault()}
                              className="space-y-3"
                            >
                              <label className="block">
                                <span className="text-sm font-medium text-black">
                                  Type
                                </span>
                                <input
                                  required
                                  value={type}
                                  onChange={(e) => setType(e.target.value)}
                                  placeholder="Video, Document, etc."
                                  className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm"
                                />
                              </label>

                              <label className="block">
                                <span className="text-sm font-medium text-black">
                                  Title
                                </span>
                                <input
                                  required
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  placeholder="Enter Title"
                                  className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm"
                                />
                              </label>

                              <label className="block">
                                <span className="text-sm font-medium text-black">
                                  URL
                                </span>
                                <input
                                  required
                                  value={url}
                                  onChange={(e) => setUrl(e.target.value)}
                                  placeholder="Enter URL"
                                  className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm"
                                />
                              </label>

                              <div className="flex justify-end gap-2 pt-3">
                                <button
                                  type="button"
                                  onClick={() => setAddMaterial(false)}
                                  className="px-4 py-2 bg-gray-300 rounded-md"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={()=>handleAddMaterial(c._id)}
                                  type="submit"
                                  className="px-4 py-2 bg-indigo-500 text-white rounded-md"
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          handleDeleteCourse(c.title);
                        }}
                        className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-200 text-red-600"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              <Typography variant="subtitle1" className="font-semibold pr-8">
                {c.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {c.description}
              </Typography>

              <div className="flex flex-wrap gap-2">
                <Chip label={c.category} />
                <Chip label={c.level} />

                {c.featured && <Chip color="secondary" label="Featured" />}
                {c.isLegacyProcess && <Chip label="Legacy" />}
                <Chip label={c.weightage} />
              </div>

              <Button
                variant="contained"
                className="mt-2"
                href={`/modules/${c._id}`}
              >
                View
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
