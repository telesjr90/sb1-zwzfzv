export interface ViralSegment {
  startTime: number;
  endTime: number;
  description: string;
  duration: number;
  viralScore: number;
  transcript: string;
}

export interface VideoAnalysis {
  videoId: string;
  segments: ViralSegment[];
}