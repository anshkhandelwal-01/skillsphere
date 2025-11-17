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
import { getCourses } from "../../api/courses.api";
import { EllipsisVertical } from "lucide-react";

export default function CatalogPage() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [format, setFormat] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(query.toLowerCase()) &&
      (level ? c.level === level : true) &&
      (format ? c.format === format : true)
  );

  return (
    <div className="p-6 space-y-4">
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
        {filtered.map((c) => (
          <Grid item xs={12} md={4} key={c._id}>
            <Paper className="p-4 space-y-3 relative">
              {/* Ellipsis button at top right */}
              <div className="relative">
                {/* Ellipsis Button */}
                <button
                  onClick={() => setShow(!show)}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                >
                  <EllipsisVertical size={20} />
                </button>

                {/* Dropdown */}
                {show && (
                  <div className="absolute top-6 left-70 w-32 bg-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                      Delete
                    </button>
                  </div>
                )}
              </div>

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
                href={`/courses/${c._id}`}
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
