import { ViralSegment } from '../types';

const SEGMENT_MIN_LENGTH = 10;
const SEGMENT_MAX_LENGTH = 60;

const calculateViralScore = (text: string): number => {
  const factors = {
    emotionalImpact: /love|hate|amazing|awesome|incredible|wow|omg|shocking/i,
    humor: /funny|lol|haha|joke|hilarious/i,
    engagement: /subscribe|like|comment|share/i,
    trending: /#\w+|trending|viral/i,
    clarity: text.length > 50 && text.length < 200
  };

  let score = 5;
  Object.entries(factors).forEach(([_, pattern]) => {
    if (typeof pattern === 'boolean' ? pattern : pattern.test(text)) {
      score += 1;
    }
  });

  return Math.min(10, score);
};

export const analyzeTranscript = (transcript: string[]): ViralSegment[] => {
  const segments: ViralSegment[] = [];
  let currentSegment: Partial<ViralSegment> = {};

  transcript.forEach((line, index) => {
    if (!currentSegment.startTime) {
      currentSegment = {
        startTime: index * SEGMENT_MIN_LENGTH,
        transcript: line,
      };
    } else {
      currentSegment.transcript += ' ' + line;
    }

    if (index > 0 && index % 3 === 0) {
      currentSegment.endTime = (index + 1) * SEGMENT_MIN_LENGTH;
      currentSegment.duration = currentSegment.endTime - currentSegment.startTime;
      currentSegment.viralScore = calculateViralScore(currentSegment.transcript || '');
      currentSegment.description = currentSegment.transcript?.slice(0, 150) + '...';

      if (currentSegment.duration >= SEGMENT_MIN_LENGTH && 
          currentSegment.duration <= SEGMENT_MAX_LENGTH) {
        segments.push(currentSegment as ViralSegment);
      }
      
      currentSegment = {};
    }
  });

  return segments.sort((a, b) => b.viralScore - a.viralScore);
};