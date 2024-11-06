import axios from 'axios';

export const extractVideoId = (url: string): string => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  if (!match) throw new Error('Invalid YouTube URL');
  return match[1];
};

export const fetchTranscript = async (videoId: string): Promise<string[]> => {
  try {
    // In a real application, you would make an API call to fetch the transcript
    // For demo purposes, returning mock data
    return [
      "Welcome to this amazing video",
      "Today we'll explore something incredible",
      "You won't believe what happens next",
      "This part is particularly interesting",
      "Let's dive deeper into the topic",
      "Here's something unexpected",
      "And that's how it all comes together"
    ];
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};