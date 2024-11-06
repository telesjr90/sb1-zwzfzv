// src/services/viralScoreService.ts
interface ScoreFactor {
  weight: number;
  evaluate: (text: string) => number;
}

export class ViralScoreService {
  private static readonly scoreFactors: Record<string, ScoreFactor> = {
    emotionalImpact: {
      weight: 0.3,
      evaluate: (text: string) => {
        const emotionalWords = /love|hate|amazing|awesome|incredible|wow|omg|shocking/i;
        const matches = (text.match(emotionalWords) || []).length;
        return Math.min(matches / 2, 1);
      }
    },
    engagement: {
      weight: 0.2,
      evaluate: (text: string) => {
        const engagementPhrases = /subscribe|like|comment|share|follow/i;
        return engagementPhrases.test(text) ? 1 : 0;
      }
    },
    trending: {
      weight: 0.15,
      evaluate: (text: string) => {
        const trendingTerms = /#\w+|trending|viral/i;
        const matches = (text.match(trendingTerms) || []).length;
        return Math.min(matches / 3, 1);
      }
    },
    length: {
      weight: 0.2,
      evaluate: (text: string) => {
        const idealLength = 100;
        const currentLength = text.length;
        return Math.max(0, 1 - Math.abs(currentLength - idealLength) / idealLength);
      }
    },
    uniqueness: {
      weight: 0.15,
      evaluate: (text: string) => {
        const uniqueWords = new Set(text.toLowerCase().split(/\s+/)).size;
        const totalWords = text.split(/\s+/).length;
        return uniqueWords / totalWords;
      }
    }
  };

  static calculateScore(text: string): number {
    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(this.scoreFactors).forEach(([_, factor]) => {
      totalScore += factor.evaluate(text) * factor.weight;
      totalWeight += factor.weight;
    });

    return (totalScore / totalWeight) * 10;
  }
}
