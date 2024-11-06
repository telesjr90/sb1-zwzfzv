import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

interface VideoInputProps {
  onVideoSubmit: (videoUrl: string) => void;
  loading?: boolean;
}

export const VideoInput: React.FC<VideoInputProps> = ({ onVideoSubmit, loading }) => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVideoSubmit(videoUrl);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        label="YouTube Video URL"
        variant="outlined"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        disabled={loading}
      />
      <Button 
        variant="contained" 
        type="submit"
        fullWidth
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Analyze Video'
        )}
      </Button>
    </Box>
  );
};