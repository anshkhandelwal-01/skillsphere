import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, Chip } from '@mui/material';
import { getPendingAssessments } from '../../api/assessments.api';
import QuizRunner from '../../components/assessments/QuizRunner';

export default function AssessmentsPage() {
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  useEffect(() => {
    getPendingAssessments().then(({ pending, completed }) => {
      setPending(pending || []); setCompleted(completed || []);
    });
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5">Assessments</Typography>

      <Typography variant="subtitle1">Pending</Typography>
      <Grid container spacing={3}>
        {pending.map(a => (
          <Grid item xs={12} md={4} key={a._id}>
            <Paper className="p-4 space-y-2">
              <Typography>{a.title}</Typography>
              <div className="flex gap-2">
                <Chip label={`Due: ${a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'N/A'}`} />
                <Chip color="primary" label={`${a.attemptsRemaining ?? 5} attempts left`} />
              </div>
              <Button variant="contained" onClick={() => setSelectedAssessment(a)}>Start assessment</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedAssessment && (
        <Paper className="p-4">
          <QuizRunner assessment={selectedAssessment} />
        </Paper>
      )}

      <Typography variant="subtitle1">Completed</Typography>
      <Grid container spacing={3}>
        {completed.map(a => (
          <Grid item xs={12} md={4} key={a._id}>
            <Paper className="p-4 space-y-2">
              <Typography>{a.title}</Typography>
              <Typography variant="body2">Score: {a.score}%</Typography>
              {a.showFeedback && <Button variant="outlined">View feedback</Button>}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper className="p-4">
        <Typography variant="subtitle1">Assessment guidelines</Typography>
        <ul className="list-disc pl-6">
          <li>Attempt policy: up to 5 attempts, assignments single attempt.</li>
          <li>Scoring is weighted per question; points scaled by course weightage.</li>
          <li>Lead notification is triggered automatically upon reaching limit.</li>
        </ul>
      </Paper>
    </div>
  );
}