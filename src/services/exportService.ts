// src/services/exportService.ts
import { ViralSegment } from '../types';

export class ExportService {
  static exportToCSV(segments: ViralSegment[], videoId: string): void {
    const headers = ['Start Time', 'End Time', 'Duration', 'Viral Score', 'Description'];
    const rows = segments.map(segment => [
      segment.startTime,
      segment.endTime,
      segment.duration,
      segment.viralScore,
      `"${segment.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viral-segments-${videoId}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  static exportToJSON(segments: ViralSegment[], videoId: string): void {
    const jsonContent = JSON.stringify(segments, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viral-segments-${videoId}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
