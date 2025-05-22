import { NextResponse } from 'next/server';
import { ProcessedArticle, EnhancedFeedResponse } from '../enhanced-rss/types';
import { analyzeSentiment, summarizeText, extractTopics, createMasterSummary } from '../enhanced-rss/api-services';

// Simple Redis client for Upstash
class SimpleRedisClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
  }

  async set(key: string, value: any): Promise<void> {
    if (!this.baseUrl || !this.token) {
      console.warn('Redis not configured, skipping storage');
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/set/${key}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error(`Redis SET failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error storing in Redis:', error);
      throw error;
    }
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

// MediaStack API interface
interface MediaStackArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  image?: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
  author?: string;
}

interface MediaStackResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: MediaStackArticle[];
}

// Simplified MediaStack queries using proper categories
const mediaStackQueries: Record<string, { 
  keywords: string; 
  countries: string; 
  limit: number; 
  categories: string; 
  languages: string;
}> = {
  'Business News (HR/Payroll/Benefits)': { 
    keywords: 'HR,human resources,payroll,employee benefits,employment,workplace,staff,recruitment,pension,salary,wages', 
    countries: 'gb', 
    limit: 40, 
    languages: 'en',
    categories: 'business'
  },
  'Technology News (HR Tech)': { 
    keywords: 'HR technology,payroll software,workforce management,employee management,HRIS,HR systems,digital workplace', 
    countries: 'gb', 
    limit: 20, 
    languages: 'en',
    categories: 'technology'
  }
};
// Function to fetch articles from MediaStack for a specific query
async function fetchMediaStackArticles(query: typeof mediaStackQueries[string]): Promise<MediaStackArticle[]> {
  const apiKey = process.env.MEDIASTACK_API_KEY;
  if (!apiKey) {
    throw new Error('MediaStack API key not configured');
  }

  const params = new URLSearchParams({
    access_key: apiKey,
    keywords: query.keywords,
    countries: query.countries,
    languages: query.languages || 'en',
    limit: query.limit.toString(),
    offset: '0',
    sort: 'published_desc'
  });

  if (query.categories) {
    params.append('categories', query.categories);
  }

  if (query.sources) {
    params.append('sources', query.sources);
  }

  const url = `http://api.mediastack.com/v1/news?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'ROI-Calculator-News-Aggregator/1.0'
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('MediaStack rate limit hit, waiting 60 seconds before retry...');
        await new Promise(resolve => setTimeout(resolve, 60000));
        
        // Retry once after rate limit delay
        const retryResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'ROI-Calculator-News-Aggregator/1.0'
          }
        });
        
        if (!retryResponse.ok) {
          throw new Error(`MediaStack API error after retry: ${retryResponse.status} ${retryResponse.statusText}`);
        }
        
        const retryData: MediaStackResponse = await retryResponse.json();
        if (!retryData || !Array.isArray(retryData.data)) {
          throw new Error('Invalid response format from MediaStack API after retry');
        }
        return retryData.data || [];
      }
      
      throw new Error(`MediaStack API error: ${response.status} ${response.statusText}`);
    }

    const data: MediaStackResponse = await response.json();
    
    // Validate the response structure
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format from MediaStack API');
    }

    return data.data || [];
  } catch (error) {
    console.error('Error fetching from MediaStack:', error);
    throw error;
  }
}

// Function to intelligently categorize articles based on content
function categorizeArticle(article: MediaStackArticle): string {
  const title = article.title.toLowerCase();
  const description = (article.description || '').toLowerCase();
  const content = `${title} ${description}`;

  // Define keyword patterns for each category
  const categoryPatterns = {
    'Payroll News': ['payroll', 'paye', 'wages', 'salary', 'tax', 'national insurance', 'pension', 'hmrc', 'rtl', 'p45', 'p60', 'ir35'],
    'Employee Benefits News': ['benefits', 'wellbeing', 'wellness', 'health insurance', 'life insurance', 'mental health', 'flexible benefits', 'perks', 'rewards', 'cycle to work', 'gym'],
    'HR Legal News': ['tribunal', 'employment law', 'discrimination', 'unfair dismissal', 'redundancy', 'maternity', 'paternity', 'acas', 'legal', 'dispute', 'legislation'],
    'UK HR News': ['hr', 'human resources', 'recruitment', 'hiring', 'employee', 'staff', 'workplace', 'personnel', 'cipd', 'workforce']
  };

  // Score each category based on keyword matches
  let bestCategory = 'UK HR News'; // default
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(categoryPatterns)) {
    let score = 0;
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

// Function to transform MediaStack article to ProcessedArticle format
function transformMediaStackArticle(article: MediaStackArticle, originalQuery: string): Partial<ProcessedArticle> {
  // Use intelligent categorization instead of the query name
  const category = categorizeArticle(article);
  
  return {
    title: article.title || 'Untitled',
    link: article.url || '',
    pubDate: article.published_at || new Date().toISOString(),
    content: article.description || '',
    source: article.source || 'Unknown Source',
    category: category,
    summary: '', // Will be filled by AI processing
    sentiment: 'neutral',
    sentimentScore: 0.5,
    topics: []
  };
}
// Function to process articles with AI (batched for efficiency)
async function processArticleBatch(
  articles: Partial<ProcessedArticle>[], 
  maxConcurrent: number = 3
): Promise<ProcessedArticle[]> {
  const processedArticles: ProcessedArticle[] = [];
  
  // Process articles in batches to avoid overwhelming the AI API
  for (let i = 0; i < articles.length; i += maxConcurrent) {
    const batch = articles.slice(i, i + maxConcurrent);
    
    const batchPromises = batch.map(async (article) => {
      try {
        // Process each article with AI
        const [summary, sentimentResult] = await Promise.all([
          summarizeText(article.content || ''),
          analyzeSentiment(article.content || '')
        ]);

        return {
          ...article,
          summary,
          sentiment: sentimentResult.sentiment,
          sentimentScore: sentimentResult.score,
          topics: [] // Topics will be extracted globally later
        } as ProcessedArticle;
      } catch (error) {
        console.error(`Error processing article "${article.title}":`, error);
        
        // Return article with basic processing
        return {
          ...article,
          summary: article.content?.substring(0, 200) + '...' || 'Summary not available',
          sentiment: 'neutral',
          sentimentScore: 0.5,
          topics: []
        } as ProcessedArticle;
      }
    });

    const batchResults = await Promise.allSettled(batchPromises);
    
    // Extract successful results
    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        processedArticles.push(result.value);
      }
    });

    // Add small delay between batches to respect API rate limits
    if (i + maxConcurrent < articles.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return processedArticles;
}

// Function to deduplicate articles by URL and title similarity
function deduplicateArticles(articles: ProcessedArticle[]): ProcessedArticle[] {
  const seen = new Set<string>();
  const deduped: ProcessedArticle[] = [];

  for (const article of articles) {
    // Create a key based on URL and normalized title
    const normalizedTitle = article.title.toLowerCase().replace(/[^\w]/g, '');
    const key = `${article.link}-${normalizedTitle}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(article);
    }
  }

  return deduped;
}
// Main GET handler for the cron job (Vercel cron jobs use GET by default)
export async function GET(request: Request) {
  // Simple security check using query parameter
  const url = new URL(request.url);
  const cronSecret = url.searchParams.get('cron_secret');
  
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting daily news update job...');
    const startTime = Date.now();

    // Collect all articles from all categories
    const allArticles: ProcessedArticle[] = [];
    const feedsByCategory: Record<string, {
      title: string;
      description: string;
      sources: string[];
      items: ProcessedArticle[];
    }> = {};

    // Process each MediaStack query (only 2 queries instead of 4)
    for (const [queryName, query] of Object.entries(mediaStackQueries)) {
      try {
        console.log(`Fetching articles for query: ${queryName}`);
        
        // Fetch articles from MediaStack
        const mediaStackArticles = await fetchMediaStackArticles(query);
        console.log(`Fetched ${mediaStackArticles.length} articles for ${queryName}`);

        if (mediaStackArticles.length === 0) {
          console.log(`No articles found for query ${queryName}`);
          continue;
        }

        // Transform to our format (with intelligent categorization)
        const transformedArticles = mediaStackArticles.map(article => 
          transformMediaStackArticle(article, queryName)
        );

        // Process with AI (in batches)
        const processedArticles = await processArticleBatch(transformedArticles);
        console.log(`Processed ${processedArticles.length} articles for ${queryName}`);

        // Add to all articles for later categorization
        allArticles.push(...processedArticles);

        // Add much longer delay between queries to respect rate limits (60 seconds)
        if (Object.keys(mediaStackQueries).indexOf(queryName) < Object.keys(mediaStackQueries).length - 1) {
          console.log('Waiting 60 seconds before next query to respect rate limits...');
          await new Promise(resolve => setTimeout(resolve, 60000));
        }

      } catch (queryError) {
        console.error(`Error processing query ${queryName}:`, queryError);
        // Continue with other queries
      }
    }

    // Initialize the category structure
    feedsByCategory['UK HR News'] = {
      title: 'UK HR News',
      description: 'Latest articles in the UK HR News category',
      sources: [],
      items: []
    };
    feedsByCategory['Payroll News'] = {
      title: 'Payroll News',
      description: 'Latest articles in the Payroll News category',
      sources: [],
      items: []
    };
    feedsByCategory['Employee Benefits News'] = {
      title: 'Employee Benefits News',
      description: 'Latest articles in the Employee Benefits News category',
      sources: [],
      items: []
    };
    feedsByCategory['HR Legal News'] = {
      title: 'HR Legal News',
      description: 'Latest articles in the HR Legal News category',
      sources: [],
      items: []
    };

    // Distribute articles into categories and collect unique sources
    allArticles.forEach(article => {
      const category = article.category;
      if (feedsByCategory[category]) {
        feedsByCategory[category].items.push(article);
        
        // Add source if not already included
        if (!feedsByCategory[category].sources.includes(article.source)) {
          feedsByCategory[category].sources.push(article.source);
        }
      }
    });
    // Deduplicate all articles
    const deduplicatedArticles = deduplicateArticles(allArticles);
    console.log(`Deduplicated to ${deduplicatedArticles.length} unique articles`);

    // Sort by publication date (newest first)
    const sortedArticles = deduplicatedArticles.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    // Generate trending topics and master summary
    let trendingTopics: { topic: string; count: number }[] = [];
    let masterSummary = '';

    if (sortedArticles.length > 0) {
      try {
        console.log('Extracting trending topics...');
        trendingTopics = await extractTopics(sortedArticles.slice(0, 15));
        console.log(`Extracted ${trendingTopics.length} trending topics`);
      } catch (topicError) {
        console.error('Error extracting topics:', topicError);
        trendingTopics = [];
      }

      try {
        console.log('Creating master summary...');
        masterSummary = await createMasterSummary(sortedArticles.slice(0, 10));
        console.log('Master summary created successfully');
      } catch (summaryError) {
        console.error('Error creating master summary:', summaryError);
        masterSummary = 'Industry news summary is being prepared. Please check back shortly.';
      }
    } else {
      masterSummary = 'No articles available at the moment. Please check back later.';
    }

    // Create the final response
    const finalResponse: EnhancedFeedResponse = {
      feedsByCategory,
      allArticles: sortedArticles,
      trendingTopics,
      masterSummary,
      timestamp: new Date().toISOString()
    };

    // Store in Redis (Upstash or Vercel KV)
    console.log('Storing data in Redis...');
    await redis.set('dailyNewsData', finalResponse);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`Daily news update job completed successfully in ${duration} seconds`);
    console.log(`Total articles processed: ${sortedArticles.length}`);
    console.log(`Categories: ${Object.keys(feedsByCategory).length}`);

    return NextResponse.json({ 
      message: 'News update successful',
      articlesProcessed: sortedArticles.length,
      categories: Object.keys(feedsByCategory).length,
      duration: `${duration}s`
    });

  } catch (error) {
    console.error('Error in daily news update job:', error);
    return NextResponse.json({ 
      message: 'News update failed', 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
// Also support POST for manual triggers (with Authorization header)
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Redirect to GET handler with query parameter
  const url = new URL(request.url);
  url.searchParams.set('cron_secret', process.env.CRON_SECRET || '');
  
  const getRequest = new Request(url.toString(), {
    method: 'GET',
    headers: request.headers
  });

  return GET(getRequest);
}