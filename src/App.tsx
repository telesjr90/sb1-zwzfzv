import React, { useState } from 'react';
import { VideoInput } from './components/VideoInput';
import { VideoPlayer } from './components/VideoPlayer';
import { SegmentList } from './components/SegmentList';
import { ViralSegment, VideoAnalysis } from './types';
import { analyzeTranscript } from './services/analyzerService';
import { extractVideoId, fetchTranscript } from './services/youtubeService';
import { Container, Typography, Box, Alert, Snackbar } from '@mui/material';

function App() {
  const [currentVideo, setCurrentVideo] = useState<VideoAnalysis | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<ViralSegment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVideoSubmit = async (videoUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const videoId = extractVideoId(videoUrl);
      const transcript = await fetchTranscript(videoId);
      const segments = analyzeTranscript(transcript);
      
      setCurrentVideo({ videoId, segments });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" className="mb-8 text-center">
        Viral Segment Analyzer
      </Typography>

      <VideoInput onVideoSubmit={handleVideoSubmit} loading={loading} />

      {currentVideo && (
        <Box className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Box>
            <VideoPlayer 
              videoId={currentVideo.videoId}
              currentTime={selectedSegment?.startTime}
            />
          </Box>
          <Box>
            <Typography variant="h5" className="mb-4">
              Potential Viral Segments
            </Typography>
            <SegmentList 
              segments={currentVideo.segments}
              onSegmentClick={setSelectedSegment}
            />
          </Box>
        </Box>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;