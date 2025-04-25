import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

// Define the cache system
let cache: {
  data: any;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

// Cache expiration in milliseconds (1 hour)
const CACHE_EXPIRATION = 3600000;

// Define the RSS feeds to fetch
const feedUrls = [
  'https://www.hrmagazine.co.uk/rss/news',
  'https://www.personneltoday.com/feed/',
  'https://www.employeebenefits.co.uk/feed/',
  'https://www.thehrdirector.com/feed/'
];

async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text.substring(0, 1000), // Limit input length
        parameters: {
          max_length: 100,
          min_length: 30,
        },
      }),
    });
    
    if (!response.ok) {
      console.error('Summary API error:', response.statusText);
      return 'Summary unavailable';
    }
    
    const result = await response.json();
    return result[0]?.summary_text || 'Summary unavailable';
  } catch (error) {
    console.error('Error summarizing text:', error);
    return 'Summary unavailable';
  }
}

export async function GET() {
  // Check cache
  if (cache.data && (Date.now() - cache.timestamp < CACHE_EXPIRATION)) {
    return NextResponse.json(cache.data);
  }
  
  try {
    // Parse feeds
    const parser = new Parser();
    const feedPromises = feedUrls.map(url => parser.parseURL(url).catch(err => {
      console.error(`Error parsing ${url}:`, err);
      return { title: 'Feed unavailable', items: [] };
    }));
    
    const feeds = await Promise.all(feedPromises);
    
    // Process feeds and generate summaries
    const processedFeeds = [];
    
    for (const feed of feeds) {
      if (!feed || !feed.items) continue;
      
      const processedItems = [];
      
      // Limit to 3 items per feed to avoid rate limits
      for (const item of feed.items.slice(0, 3)) {
        const content = item.content || item.contentSnippet || item.description || item.title;
        const summary = await summarizeText(content);
        
        processedItems.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: content,
          summary,
        });
      }
      
      processedFeeds.push({
        title: feed.title || 'Unknown Feed',
        description: feed.description || '',
        link: feed.link || '',
        items: processedItems,
      });
    }
    
    // Update cache
    cache = {
      data: processedFeeds,
      timestamp: Date.now()
    };
    
    return NextResponse.json(processedFeeds);
  } catch (error) {
    console.error('Error processing feeds:', error);
    return NextResponse.json({ error: 'Failed to process feeds' }, { status: 500 });
  }
}
