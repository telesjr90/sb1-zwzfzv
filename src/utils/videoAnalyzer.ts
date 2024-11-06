import { ViralSegment } from '../types';

const SEGMENT_MIN_LENGTH = 10; // seconds
const SEGMENT_MAX_LENGTH = 60; // seconds

export const analyzeTranscript = async (transcript: string[]): Promise<ViralSegment[]> => {
  // This is a simplified analysis. In a real application, you'd want to use
  // more sophisticated NLP techniques and sentiment analysis
  const segments: ViralSegment[] = [];
  let currentSegment: Partial<ViralSegment> = {};
  
  const calculateViralScore = (text: string): number => {
    // Simple scoring based on text length and basic engagement factors
    const hasEmotionalWords = /love|hate|amazing|awesome|incredible|wow/i.test(text);
    const hasHashtags = /#\w+/.test(text);
    const isIdealLength = text.length > 50 && text.length < 200;
    
    let score = 5; // Base score
    if (hasEmotionalWords) score += 2;
    if (hasHashtags) score += 1;
    if (isIdealLength) score += 2;
    
    return Math.min(10, score);
  };

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

  return segments;
};