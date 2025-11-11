import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, MenuItem, Chip } from '@mui/material';
import { getCourses, updateCourseWeightage } from '../../api/courses.api';

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weightage, setWeightage] = useState(1);
  const [isLegacy, setIsLegacy] = useState(false);

  useEffect(() => { getCourses().then(setCourses); }, []);

  const saveWeightage = async () => {
    if (!selected) return;
    await updateCourseWeightage(selected._id, { weightage, isLegacyProcess: isLegacy });
    const updated = await getCourses();
    setCourses(updated);
  };

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5">Admin/Lead dashboard</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Course management</Typography>
            <TextField select label="Select course" fullWidth value={selected?._id || ''} onChange={e => {
              const c = courses.find(x => x._id === e.target.value);
              setSelected(c); setWeightage(c?.weightage ?? 1); setIsLegacy(!!c?.isLegacyProcess);
            }}>
              {courses.map(c => <MenuItem key={c._id} value={c._id}>{c.title}</MenuItem>)}
            </TextField>
            <TextField type="number" label="Weightage" value={weightage} onChange={e => setWeightage(Number(e.target.value))} />
            <div className="flex items-center gap-2">
              <Chip label={isLegacy ? 'Legacy' : 'New'} onClick={() => setIsLegacy(!isLegacy)} variant="outlined" />
              <Button variant="contained" onClick={saveWeightage}>Save</Button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="subtitle1">Analytics & insights</Typography>
            <div className="text-sm text-gray-600">Coming soon: charts on enrollments, completion rates.</div>
          </Paper>
        </Grid>
      </Grid>

      <Paper className="p-4">
        <Typography variant="subtitle1">Attempt limit breach notifications</Typography>
      </Paper>
    </div>
  );
}