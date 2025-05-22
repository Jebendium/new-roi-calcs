// Cache management module
import { FeedCache } from './types';

// Cache expiration in milliseconds (8 hours instead of 6 hours)
export const CACHE_EXPIRATION = 28800000; // 8 hours

// Define the cache system with incremental update support
export const cache: FeedCache = {
  data: null,
  timestamp: 0,
  partialData: {}, // For storing partially updated feeds
  lastFeedUpdate: {} // Track when each feed was last updated
};

// Check if a feed needs updating based on last update time
export function needsUpdate(feedUrl: string, forceRefresh = false): boolean {
  if (forceRefresh) return true;
  
  const lastUpdate = cache.lastFeedUpdate[feedUrl] || 0;
  const timeSinceUpdate = Date.now() - lastUpdate;
  
  // Update if more than 2 hours have passed (instead of 4 hours)
  return timeSinceUpdate > 7200000; // 2 hours
}

// Cache persistence hooks (if browser localStorage is available)
export function saveCache(): void {
  if (typeof localStorage !== 'undefined') {
    try {
      const cacheToSave = {
        data: cache.data,
        timestamp: cache.timestamp,
        lastFeedUpdate: cache.lastFeedUpdate
      };
      localStorage.setItem('news-feed-cache', JSON.stringify(cacheToSave));
      console.log('Cache saved to localStorage');
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }
}

export function loadCache(): void {
  if (typeof localStorage !== 'undefined') {
    try {
      const savedCache = localStorage.getItem('news-feed-cache');
      if (savedCache) {
        const parsed = JSON.parse(savedCache);
        cache.data = parsed.data;
        cache.timestamp = parsed.timestamp;
        cache.lastFeedUpdate = parsed.lastFeedUpdate || {};
        console.log('Cache loaded from localStorage');
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
    }
  }
}