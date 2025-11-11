import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import ProgressBar from '../../components/common/ProgressBar';

export default function MyLearningPage() {
  const inProgress = [{ title: 'ETL Basics', progress: 60 }];
  const completed = [{ title: 'Security 101', certificate: 'https://certificates.skillsphere.com/sample.pdf' }];
  const wishlist = [{ title: 'KETL Advanced', approvedByLead: false }];

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5">My learning</Typography>

      <Typography variant="subtitle1">In progress</Typography>
      <Grid container spacing={3}>
        {inProgress.map((c, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper className="p-4 space-y-2">
              <Typography>{c.title}</Typography>
              <ProgressBar value={c.progress} />
              <Button variant="contained">Resume learning</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle1">Completed</Typography>
      <Grid container spacing={3}>
        {completed.map((c, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper className="p-4 space-y-2">
              <Typography>{c.title}</Typography>
              <Button variant="outlined" href={c.certificate} target="_blank">Download certificate</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle1">Saved/Wishlist (requires lead approval)</Typography>
      <Grid container spacing={3}>
        {wishlist.map((c, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper className="p-4 space-y-2">
              <Typography>{c.title}</Typography>
              <Typography variant="caption" color={c.approvedByLead ? 'success.main' : 'warning.main'}>
                {c.approvedByLead ? 'Approved by lead' : 'Pending lead approval'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}