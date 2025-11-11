import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

export default function ProgressBar({ value }) {
  return (
    <Box>
      <LinearProgress variant="determinate" value={value} />
      <Typography variant="caption">{value}% complete</Typography>
    </Box>
  );
}