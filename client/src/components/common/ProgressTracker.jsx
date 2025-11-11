import React, { useEffect, useState } from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';
import ConfettiOverlay from './ConfettiOverlay';
import { useSnackbar } from 'notistack';
import api from '../../api/axios';

export default function ProgressTracker({ value, userId, courseId }) {
  const { enqueueSnackbar } = useSnackbar();
  const [celebrate, setCelebrate] = useState(false);

  let stage = 'Beginner';
  if (value >= 34 && value < 67) stage = 'Intermediate';
  if (value >= 67) stage = 'Advanced';

  useEffect(() => {
    async function awardBadge(stageName) {
      const mapping = { Beginner: 'Bronze', Intermediate: 'Silver', Advanced: 'Gold' };
      const badgeName = mapping[stageName];
      try {
        await api.post('/badges/award', { userId, badgeName });
        enqueueSnackbar(`🎖 New badge earned: ${badgeName}`, { variant: 'success' });
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 5000);
      } catch (err) {
        // silent fail
      }
    }

    if (value === 34) awardBadge('Intermediate');
    if (value === 67) awardBadge('Advanced');
    if (value === 100) {
      enqueueSnackbar('🏆 Course completed! Certificate awarded!', { variant: 'success' });
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 5000);
    }
  }, [value, userId, courseId, enqueueSnackbar]);

  return (
    <Box className="space-y-2">
      <ConfettiOverlay active={celebrate} />
      <Typography variant="subtitle1">Progress: {value}%</Typography>
      <LinearProgress variant="determinate" value={value} />
      <Typography variant="body2" color="text.secondary">
        Current Stage: <strong>{stage}</strong>
      </Typography>
    </Box>
  );
}