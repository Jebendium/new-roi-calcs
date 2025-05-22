import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import type { EnhancedFeedResponse } from './types';

export async function GET() {
  try {
    const newsData = await kv.get<EnhancedFeedResponse>('dailyNewsData');
    
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
    console.error('Error fetching news data from KV:', error);
    return NextResponse.json({ 
      message: 'Failed to retrieve news data.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}