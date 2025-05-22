import { NextResponse } from 'next/server';
import type { EnhancedFeedResponse } from './types';

// Simple Redis client for Upstash (same as in update-news)
class SimpleRedisClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.baseUrl || !this.token) {
      console.warn('Redis not configured, returning null');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/get/${key}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Redis GET failed: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error retrieving from Redis:', error);
      return null;
    }
  }
}

const redis = new SimpleRedisClient();

export async function GET() {
  try {
    const newsData = await redis.get<EnhancedFeedResponse>('dailyNewsData');
    
    if (!newsData) {
      // Return an empty but valid structure if no data is found
      return NextResponse.json({
        feedsByCategory: {},
        allArticles: [],
        trendingTopics: [],
        masterSummary: 'News data is currently being updated or is not yet available. Please check back shortly.',
        timestamp: new Date().toISOString(),
        message: 'News data is currently being updated or is not yet available. Please check back shortly.'
      }, { status: 200 });
    }
    
    return NextResponse.json(newsData);
  } catch (error) {
    console.error('Error fetching news data from Redis:', error);
    return NextResponse.json({ 
      message: 'Failed to retrieve news data.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}