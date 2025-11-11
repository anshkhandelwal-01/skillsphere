import React from 'react';
import { Grid, Paper, Typography, Chip, TextField, Button } from '@mui/material';

export default function ProfilePage() {
  const user = {
    name: 'Ansh',
    email: 'ansh@example.com',
    preferences: { learningStyle: 'Video', availability: 'Evenings' },
    skillMatrix: [{ skill: 'ETL', level: 3, points: 180 }, { skill: 'Cybersecurity', level: 2, points: 90 }],
    badges: ['Bronze', 'Silver'],
    pointsTotal: 350,
    certificates: ['https://certificates.skillsphere.com/123_course.pdf']
  };

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5">My profile & skills</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Personal information</Typography>
            <TextField label="Name" defaultValue={user.name} fullWidth />
            <TextField label="Email" defaultValue={user.email} fullWidth />
            <Button variant="contained">Save</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Learning preferences</Typography>
            <TextField label="Learning style" defaultValue={user.preferences.learningStyle} />
            <TextField label="Availability" defaultValue={user.preferences.availability} />
            <Button variant="outlined">Update</Button>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="subtitle1">Skill matrix</Typography>
            <div className="space-y-2">
              {user.skillMatrix.map(s => (
                <div key={s.skill} className="flex items-center justify-between">
                  <Typography>{s.skill}</Typography>
                  <div className="flex items-center gap-2">
                    <Chip label={`Level ${s.level}/5`} />
                    <Chip label={`${s.points} pts`} />
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-4 space-y-2">
            <Typography variant="subtitle1">Badges & certificates</Typography>
            <div className="flex gap-2">
              {user.badges.map(b => <Chip key={b} label={b} color="secondary" />)}
            </div>
            <div className="space-y-2">
              {user.certificates.map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Typography>Certificate {i + 1}</Typography>
                  <Button variant="outlined" href={c} target="_blank">Download</Button>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Paper className="p-4">
        <Typography variant="subtitle1">Points breakdown</Typography>
        <Typography>Total points: {user.pointsTotal}</Typography>
      </Paper>
    </div>
  );
}