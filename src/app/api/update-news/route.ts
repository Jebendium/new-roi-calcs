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

// Category queries mapping to UK HR/Benefits content
const categoryQueries: Record<string, { 
  keywords: string; 
  countries: string; 
  limit: number; 
  categories?: string; 
  languages?: string;
  sources?: string;
}> = {
  'UK HR News': { 
    keywords: 'human resources,HR,employment law,personnel,CIPD,workplace,staff,recruitment,hiring,employees,employment,tribunal,discrimination,harassment,policies,procedures', 
    countries: 'gb', 
    limit: 15, 
    languages: 'en',
    categories: 'business'
  },
  'Payroll News': { 
    keywords: 'payroll,HMRC,CIPP,PAYE,wages,salary,tax,national insurance,pension,auto-enrolment,RTI,P45,P60,IR35,payslip,payroll software', 
    countries: 'gb', 
    limit: 15, 
    languages: 'en',
    categories: 'business'
  },
  'Employee Benefits News': { 
    keywords: 'employee benefits,staff rewards,workplace perks,REBA,pension schemes,health insurance,life insurance,flexible benefits,wellness,wellbeing,mental health,gym membership,cycle to work', 
    countries: 'gb', 
    limit: 15, 
    languages: 'en',
    categories: 'business'
  },
  'HR Legal News': { 
    keywords: 'employment tribunal,HR legislation,workplace disputes,discrimination law,ACAS,unfair dismissal,redundancy,maternity leave,paternity leave,sick pay,minimum wage,working time regulations', 
    countries: 'gb', 
    limit: 15, 
    languages: 'en',
    categories: 'business'
  }
};
// Function to fetch articles from MediaStack for a specific query
async function fetchMediaStackArticles(query: typeof categoryQueries[string]): Promise<MediaStackArticle[]> {
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

// Function to transform MediaStack article to ProcessedArticle format
function transformMediaStackArticle(article: MediaStackArticle, category: string): Partial<ProcessedArticle> {
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

    // Process each category
    for (const [categoryName, query] of Object.entries(categoryQueries)) {
      try {
        console.log(`Fetching articles for category: ${categoryName}`);
        
        // Fetch articles from MediaStack
        const mediaStackArticles = await fetchMediaStackArticles(query);
        console.log(`Fetched ${mediaStackArticles.length} articles for ${categoryName}`);

        if (mediaStackArticles.length === 0) {
          console.log(`No articles found for category ${categoryName}`);
          continue;
        }

        // Transform to our format
        const transformedArticles = mediaStackArticles.map(article => 
          transformMediaStackArticle(article, categoryName)
        );

        // Process with AI (in batches)
        const processedArticles = await processArticleBatch(transformedArticles);
        console.log(`Processed ${processedArticles.length} articles for ${categoryName}`);

        // Add to category
        feedsByCategory[categoryName] = {
          title: categoryName,
          description: `Latest articles in the ${categoryName} category`,
          sources: [...new Set(processedArticles.map(a => a.source))], // Unique sources
          items: processedArticles
        };

        // Add to all articles
        allArticles.push(...processedArticles);

        // Add delay between categories to respect API rate limits (increased to 10 seconds)
        console.log('Waiting 10 seconds before next category to respect rate limits...');
        await new Promise(resolve => setTimeout(resolve, 10000));

      } catch (categoryError) {
        console.error(`Error processing category ${categoryName}:`, categoryError);
        // Continue with other categories
        
        // Create empty category entry
        feedsByCategory[categoryName] = {
          title: categoryName,
          description: `Latest articles in the ${categoryName} category`,
          sources: [],
          items: []
        };
      }
    }
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