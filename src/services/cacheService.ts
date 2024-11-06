// src/services/cacheService.ts
export class CacheService {
  private static CACHE_PREFIX = 'viral_analyzer_';
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static async set(key: string, data: any): Promise<void> {
    const cacheItem = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(
      this.CACHE_PREFIX + key,
      JSON.stringify(cacheItem)
    );
  }

  static async get(key: string): Promise<any | null> {
    const cached = localStorage.getItem(this.CACHE_PREFIX + key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > this.CACHE_DURATION) {
      localStorage.removeItem(this.CACHE_PREFIX + key);
      return null;
    }

    return data;
  }

  static clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
}
