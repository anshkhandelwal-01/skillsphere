import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function BadgeTimeline({ progress, modulesCompleted = 0, totalModules = 10 }) {
  let stage = 'Beginner';
  if (progress >= 34 && progress < 67) stage = 'Intermediate';
  if (progress >= 67) stage = 'Advanced';

  const stages = [
    { label: 'Beginner', badge: 'Bronze', threshold: 0, color: '#cd7f32' },
    { label: 'Intermediate', badge: 'Silver', threshold: 34, color: '#c0c0c0' },
    { label: 'Advanced', badge: 'Gold', threshold: 67, color: '#ffd700' }
  ];

  let nextStage = null;
  if (progress < 34) nextStage = stages[1];
  else if (progress < 67) nextStage = stages[2];
  else if (progress < 100) nextStage = { label: 'Completion', badge: 'Certificate', threshold: 100 };

  const modulesLeft = totalModules
    ? Math.max(0, Math.ceil((nextStage.threshold / 100) * totalModules) - modulesCompleted)
    : null;

  return (
    <Box className="space-y-4">
      <Typography variant="subtitle1">Learning Path Progress</Typography>
      <Box className="flex justify-between items-center">
        {stages.map((s, idx) => {
          const active = progress >= s.threshold;
          const nextThreshold = stages[idx + 1]?.threshold || 100;
          const percentTowardNext = Math.min(100, Math.max(0, ((progress - s.threshold) / (nextThreshold - s.threshold)) * 100));
          const isNext = nextStage && nextStage.badge === s.badge;

          return (
            <Box key={idx} className="flex flex-col items-center relative">
              <Box className="relative flex items-center justify-center">
                <CircularProgress
                  variant="determinate"
                  value={active ? 100 : percentTowardNext}
                  size={60}
                  thickness={4}
                  style={{ color: s.color }}
                />
                <EmojiEventsIcon
                  style={{
                    position: 'absolute',
                    color: active ? s.color : '#ccc',
                    fontSize: 30,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                    transform: isNext ? 'scale(1.2)' : 'scale(1)',
                    opacity: isNext ? 0.9 : 1,
                    animation: isNext ? 'pulse 1.5s infinite' : 'none'
                  }}
                />
              </Box>
              <Typography variant="caption">{s.label}</Typography>
              <Typography variant="caption">{s.badge}</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography variant="body2" color="text.secondary">
        Current Stage: <strong>{stage}</strong>
      </Typography>
      {nextStage && (
        <Typography variant="body2" color="primary">
          Next Milestone: <strong>{nextStage.label}</strong> ({nextStage.badge})
          {modulesLeft !== null && ` — Complete ${modulesLeft} more module${modulesLeft !== 1 ? 's' : ''}`}
        </Typography>
      )}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
        `}
      </style>
    </Box>
  );
}