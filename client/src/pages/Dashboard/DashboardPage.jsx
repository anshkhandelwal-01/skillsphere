import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import ProgressTracker from '../../components/common/ProgressTracker';
import BadgeTimeline from '../../components/common/BadgeTimeline';

export default function DashboardPage() {
  const progressOverall = 42; // TODO: fetch via API
  const modulesCompleted = 4;
  const totalModules = 10;
  const userId = 'me'; // replace with actual user id from /users/me
  const courseId = 'overall'; // optional

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h5">My Learning Journey</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Progress overview</Typography>
            <ProgressTracker value={progressOverall} userId={userId} courseId={courseId} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Quick links</Typography>
            <div className="flex gap-2 mt-3">
              <Button variant="outlined" href="/assessments">My Assessments</Button>
              <Button variant="outlined" href="/catalog">Course Catalog</Button>
              <Button variant="outlined" href="/profile">My Profile</Button>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Paper className="p-4 space-y-3">
        <Typography variant="subtitle1">Badge timeline</Typography>
        <BadgeTimeline progress={progressOverall} modulesCompleted={modulesCompleted} totalModules={totalModules} />
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Upcoming assessments</Typography>
            <Button variant="contained" href="/assessments">Go to My Assessments</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-4 space-y-3">
            <Typography variant="subtitle1">Notifications & Alerts</Typography>
            <Typography variant="body2" color="text.secondary">Assessment reminders, overdue alerts, attempt limits, lead notifications, new content.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}