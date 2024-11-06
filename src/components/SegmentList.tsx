import React from 'react';
import { ViralSegment } from '../types';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface SegmentListProps {
  segments: ViralSegment[];
  onSegmentClick: (segment: ViralSegment) => void;
}

export const SegmentList: React.FC<SegmentListProps> = ({ segments, onSegmentClick }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {segments.map((segment, index) => (
        <Card 
          key={index}
          onClick={() => onSegmentClick(segment)}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <CardContent>
            <Box className="flex justify-between items-center">
              <Typography variant="h6">
                Segment {index + 1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Viral Score: {segment.viralScore.toFixed(1)}/10
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {formatTime(segment.startTime)} - {formatTime(segment.endTime)} 
              ({segment.duration.toFixed(1)}s)
            </Typography>
            <Typography variant="body1" className="mt-2">
              {segment.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};