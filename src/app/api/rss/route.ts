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

// Define the RSS feeds to fetch - using more reliable HR and benefits feeds
const feedUrls = [
  'https://www.personneltoday.com/feed/',
  'https://www.hrmagazine.co.uk/feed',
  'https://workplaceinsight.net/feed/',
  'https://www.cipd.co.uk/feed/news',
  'https://www.hrgrapevine.com/content/feed'
];

// Function to create a more detailed and comprehensive summary
async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text.substring(0, 1500), // Increased input length for better context
        parameters: {
          max_length: 150, // Increased summary length
          min_length: 80,  // Increased minimum length to ensure more detailed summaries
          length_penalty: 1.5, // Encourage slightly longer summaries
          num_beams: 4,    // Better quality generation
        },
      }),
    });
    
    if (!response.ok) {
      console.error('Summary API error:', response.statusText);
      return 'Summary unavailable. Our AI summarization service is currently experiencing issues. Please check back later or read the full article for details.';
    }
    
    const result = await response.json();
    return result[0]?.summary_text || 'Summary unavailable';
  } catch (error) {
    console.error('Error summarizing text:', error);
    return 'Summary unavailable due to a technical issue. Please read the full article for details.';
  }
}

// Function to create a master summary from all articles
async function createMasterSummary(allArticles: any[]): Promise<string> {
  try {
    // First, create a condensed version of all article titles and their individual summaries
    const combinedContent = allArticles.map(article => 
      `ARTICLE: ${article.title}\nSUMMARY: ${article.summary}`
    ).join('\n\n');
    
    const prompt = `The following are summaries of recent HR and employee benefits news articles. Create a comprehensive overview of the key trends and important developments from these articles:\n\n${combinedContent}`;
    
    // Use a more comprehensive prompt for the master summary
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt.substring(0, 2000), // Take first 2000 chars for the prompt
        parameters: {
          max_length: 300,
          min_length: 150,
          length_penalty: 2.0,
          num_beams: 4,
        },
      }),
    });
    
    if (!response.ok) {
      return 'Master summary unavailable. Please review the individual article summaries below.';
    }
    
    const result = await response.json();
    return result[0]?.summary_text || 'Master summary unavailable';
  } catch (error) {
    console.error('Error creating master summary:', error);
    return 'Unable to generate a master summary at this time. Please review the individual article summaries below.';
  }
}

// Improved RSS feed handling with better error handling and retry logic
async function fetchRSSFeed(url: string): Promise<any> {
  const parser = new Parser({
    headers: {
      'User-Agent': 'ROI-Calculator-RSS-Reader/1.0',
      'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
    },
    timeout: 10000, // 10 second timeout
    customFields: {
      item: [
        ['content:encoded', 'fullContent'],
        ['description', 'description']
      ]
    }
  });
  
  try {
    return await parser.parseURL(url);
  } catch (error) {
    console.error(`Error parsing feed ${url}:`, error);
    // Try a fallback approach for some common feed issues
    try {
      // Sometimes using a proxy helps with CORS issues
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      const text = await response.text();
      return await parser.parseString(text);
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${url}:`, fallbackError);
      throw error; // Rethrow the original error
    }
  }
}

export async function GET() {
  // Check cache
  if (cache.data && (Date.now() - cache.timestamp < CACHE_EXPIRATION)) {
    return NextResponse.json(cache.data);
  }
  
  try {
    // Parse feeds with improved handling
    const feedPromises = feedUrls.map(url => 
      fetchRSSFeed(url).catch(err => {
        console.error(`Failed to fetch feed from ${url}:`, err);
        return null; // Return null for failed feeds instead of an empty object
      })
    );
    
    const feeds = await Promise.all(feedPromises);
    
    // Process feeds and generate summaries
    const processedFeeds = [];
    const allArticles = [];
    
    for (const feed of feeds) {
      if (!feed || !feed.items || feed.items.length === 0) continue;
      
      const processedItems = [];
      
      // Process up to 5 items per feed for better coverage
      for (const item of feed.items.slice(0, 5)) {
        // Get the richest content available
        const content = item.fullContent || item.content || item.contentSnippet || item.description || item.title;
        const summary = await summarizeText(content);
        
        const processedItem = {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || item.isoDate,
          content: content,
          summary,
          source: feed.title || 'Unknown Source'
        };
        
        processedItems.push(processedItem);
        allArticles.push(processedItem);
      }
      
      if (processedItems.length > 0) {
        processedFeeds.push({
          title: feed.title || 'Unknown Feed',
          description: feed.description || '',
          link: feed.link || '',
          items: processedItems,
        });
      }
    }
    
    // Only create master summary if we have articles
    let masterSummary = '';
    if (allArticles.length > 0) {
      masterSummary = await createMasterSummary(allArticles);
    }
    
    // Update cache
    const responseData = {
      feeds: processedFeeds,
      masterSummary,
      timestamp: new Date().toISOString()
    };
    
    cache = {
      data: responseData,
      timestamp: Date.now()
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error processing feeds:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process feeds',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
