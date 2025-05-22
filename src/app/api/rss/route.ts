import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

// Define feed response interfaces
interface FeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  fullContent?: string;
  content?: string;
  contentSnippet?: string;
  description?: string;
  summary?: string;
  source?: string;
  feedTitle?: string;
}

interface ProcessedFeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  summary: string;
  source: string;
}

interface Feed {
  title?: string;
  description?: string;
  link?: string;
  items: FeedItem[] | ProcessedFeedItem[];
}

interface ParsedFeed {  title?: string;
  description?: string;
  link?: string;
  items: FeedItem[];
  [key: string]: unknown;
}

interface FeedResponse {
  feeds: Feed[];
  masterSummary: string;
  timestamp: string;
}

// Error response type defined inline where used

// Define the cache system
let cache: {
  data: FeedResponse | null;
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
  'https://www.personneltoday.com/hr-practice/feed/',
  'https://www.personneltoday.com/hr-strategy/feed/',
  'https://www.personneltoday.com/employment-law/feed/',
  'https://workplaceinsight.net/feed/',
  'https://www.thehrdirector.com/feed/',
  'https://www.moorepay.co.uk/feed/',
  'https://www.accountancyage.com/category/payroll/feed/'
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
async function createMasterSummary(allArticles: ProcessedFeedItem[]): Promise<string> {
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

// Improved RSS feed handling with better error handling, retry logic, and timeout
async function fetchRSSFeed(url: string): Promise<ParsedFeed> {
  const parser = new Parser({
    headers: {
      'User-Agent': 'ROI-Calculator-RSS-Reader/1.0',
      'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
    },
    timeout: 15000, // 15 second timeout
    customFields: {
      item: [
        ['content:encoded', 'fullContent'],
        ['description', 'description']
      ]
    }
  });
  
  // Create a promise that will reject after timeout to prevent indefinite loading
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out for ${url}`)), 20000); // 20 second hard timeout
  });
  
  try {
    // Race the feed parsing against the timeout
    const parsedFeed = await Promise.race([
      parser.parseURL(url),
      timeoutPromise
    ]);
    
    // Convert parser output to our ParsedFeed type
    const feedItems = parsedFeed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      isoDate: item.isoDate,
      fullContent: item.fullContent,
      content: item.content,
      contentSnippet: item.contentSnippet,
      description: item.description
    }));
    
    return {
      title: parsedFeed.title,
      description: parsedFeed.description,
      link: parsedFeed.link,
      items: feedItems
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error parsing feed ${url}:`, errorMessage);
    
    // Check if this was a timeout error
    if (errorMessage.includes('timed out')) {
      console.warn(`Feed ${url} timed out, skipping`);
      // Return an empty feed structure rather than failing completely
      return {
        title: 'Failed to load',
        description: `Feed from ${url} timed out`,
        link: url,
        items: []
      };
    }
    
    // Try a fallback approach for some common feed issues
    try {
      // Sometimes using a proxy helps with CORS issues
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await Promise.race([
        fetch(proxyUrl),
        timeoutPromise
      ]) as Response;
      
      const text = await response.text();
      
      // Skip empty responses
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from proxy');
      }
      
      const parsedFeed = await parser.parseString(text);
      
      // Convert parser output to our ParsedFeed type
      const feedItems = parsedFeed.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        isoDate: item.isoDate,
        fullContent: item.fullContent,
        content: item.content,
        contentSnippet: item.contentSnippet,
        description: item.description
      }));
      
      return {
        title: parsedFeed.title,
        description: parsedFeed.description,
        link: parsedFeed.link,
        items: feedItems
      };
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${url}:`, fallbackError instanceof Error ? fallbackError.message : 'Unknown error');
      // Return an empty feed structure rather than failing completely
      return {
        title: 'Failed to load',
        description: `Feed from ${url} could not be loaded`,
        link: url,
        items: []
      };
    }
  }
}

export const GET = async (req: Request): Promise<NextResponse> => {
  try {
    // Check for refresh parameter
    const url = new URL(req.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';
    
    // Check cache if not forcing refresh
    if (cache.data && !forceRefresh && (Date.now() - cache.timestamp < CACHE_EXPIRATION)) {
      return NextResponse.json(cache.data);
    }
    
    // Add a timeout promise to prevent hanging on feed fetching
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Feed processing timed out')), 30000); // 30 second overall timeout
    });
    
    // Parse feeds with improved handling
    const feedPromises = feedUrls.map(url => 
      fetchRSSFeed(url).catch(err => {
        console.error(`Failed to fetch feed from ${url}:`, err);
        // Return an empty feed instead of null
        return {
          title: 'Failed to load',
          description: `Feed from ${url} could not be loaded`,
          link: url,
          items: []
        } as ParsedFeed;
      })
    );
      const feeds = await Promise.race([
      Promise.all(feedPromises),
      timeoutPromise
    ]);
    
    // Process feeds and generate summaries
    const processedFeeds: Feed[] = [];
    const allArticles: ProcessedFeedItem[] = [];
    
    for (const feed of feeds) {
      if (!feed || !feed.items || feed.items.length === 0) continue;
      
      const processedItems: ProcessedFeedItem[] = [];
        // Process up to 5 items per feed for better coverage
      for (const item of feed.items.slice(0, 5)) {
        try {
          // Get the richest content available
          const contentSource = item.fullContent || item.content || item.contentSnippet || item.description || item.title || '';
          const content = typeof contentSource === 'string' ? contentSource : 
            typeof contentSource === 'object' ? JSON.stringify(contentSource) : '';
          
          // Generate summary safely
          const summary = await summarizeText(content);
          
          const processedItem: ProcessedFeedItem = {
            title: item.title || 'Untitled',
            link: item.link || '#',
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
            content: content,
            summary,
            source: feed.title || 'Unknown Source'
          };
          
          processedItems.push(processedItem);
          allArticles.push(processedItem);
        } catch (itemError) {
          console.error(`Error processing feed item:`, itemError);
          // Skip this item and continue with others
        }
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
    const responseData: FeedResponse = {
      feeds: processedFeeds,
      masterSummary,
      timestamp: new Date().toISOString()
    };
    
    cache = {
      data: responseData,
      timestamp: Date.now()
    };
      return NextResponse.json(responseData);  } catch (error: unknown) {
    console.error('Error processing feeds:', error);
    
    // If we timed out but have cached data, return that
    if (error instanceof Error && error.message === 'Feed processing timed out' && cache.data) {
      console.warn('Using cached data due to timeout');
      return NextResponse.json({
        ...cache.data,
        status: 'partial',
        message: 'Feed processing timed out, showing cached data'
      });
    }
    
    // If we have any cached data, it's better to return that than nothing
    if (cache.data) {
      console.warn('Using cached data due to error');
      return NextResponse.json({
        ...cache.data,
        status: 'cached',
        message: 'Error updating feeds, showing cached data'
      });
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to process feeds',
        message: error instanceof Error ? error.message : 'Unknown error'
      },      { status: 500 }
    );
  }
};
