import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function StatCard({ title, value }) {
  return (
    <Paper className="p-4">
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  );
}