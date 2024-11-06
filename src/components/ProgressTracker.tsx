// src/components/ProgressTracker.tsx
import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  totalSteps,
  stepName,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Box className="w-full p-4">
      <Box className="flex justify-between mb-2">
        <Typography variant="body2" color="textSecondary">
          {stepName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        className="h-2 rounded-full"
      />
    </Box>
  );
};
