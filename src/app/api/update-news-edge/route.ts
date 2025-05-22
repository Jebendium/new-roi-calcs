import { ProcessedArticle, EnhancedFeedResponse } from '../enhanced-rss/types';

// Edge Runtime configuration
export const runtime = 'edge';

// Simple Redis client for Edge Runtime (no Node.js APIs)
class EdgeRedisClient {
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
}

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
// MediaStack queries using proper categories
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
    limit: 25, // Increased back since we have 30s timeout
    languages: 'en',
    categories: 'business'
  },
  'Technology News (HR Tech)': { 
    keywords: 'HR technology,payroll software,workforce management,employee management,HRIS,HR systems,digital workplace', 
    countries: 'gb', 
    limit: 15, // Increased back 
    languages: 'en',
    categories: 'technology'
  }
};

// Function to fetch articles from MediaStack
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
        console.warn('MediaStack rate limit hit, waiting 30 seconds before retry...');
        await new Promise(resolve => setTimeout(resolve, 30000));
        
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
    }    const data: MediaStackResponse = await response.json();
    
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format from MediaStack API');
    }

    return data.data || [];
  } catch (error) {
    console.error('Error fetching from MediaStack:', error);
    throw error;
  }
}

// AI Processing using DeepSeek (Edge Runtime compatible)
async function callDeepSeekAPI(messages: any[], maxTokens: number = 150): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DeepSeek API key not configured');
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        temperature: 0.3,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw error;
  }
}

// Summarize text using DeepSeek
async function summarizeText(text: string): Promise<string> {
  if (!text || text.length < 100) {
    return text || 'No content available for summarization.';
  }

  try {
    const messages = [
      {
        role: "system",
        content: "You are a text summarization AI. Summarize the following text in 3-4 concise sentences that capture the main points. Use UK English spelling and terminology."
      },
      {
        role: "user",
        content: text.substring(0, 1500)
      }
    ];

    const summary = await callDeepSeekAPI(messages, 150);
    return summary || text.substring(0, 200) + '...';
  } catch (error) {
    console.error('Error summarizing text:', error);
    return text.substring(0, 200) + '...';
  }
}
// Create AI-powered master summary
async function createMasterSummary(articles: ProcessedArticle[]): Promise<string> {
  if (!articles || articles.length < 3) {
    return 'No recent articles available.';
  }

  try {
    const combinedContent = articles.slice(0, 8).map(article => 
      `ARTICLE: ${article.title}\nSUMMARY: ${article.summary}\nCATEGORY: ${article.category}`
    ).join('\n\n');

    const messages = [
      {
        role: "system",
        content: "You are a news summarization expert specializing in HR, employee benefits, and payroll news. Create a comprehensive overview of the key trends and important developments from these articles. Your summary should be 2-4 paragraphs (at least 6 sentences total) that capture the main themes across HR News, Employee Benefits News, and Payroll News. Use UK English spelling and terminology throughout."
      },
      {
        role: "user",
        content: combinedContent.substring(0, 3000)
      }
    ];

    const masterSummary = await callDeepSeekAPI(messages, 500);
    return masterSummary || 'Industry news summary is being prepared. Please check back shortly.';
  } catch (error) {
    console.error('Error creating master summary:', error);
    return 'Industry news covering HR, payroll, and employee benefits developments. Key themes include workplace changes, regulatory updates, and technology advances in the sector.';
  }
}

// Function to intelligently categorize articles
function categorizeArticle(article: MediaStackArticle): string {
  const title = article.title.toLowerCase();
  const description = (article.description || '').toLowerCase();
  const content = `${title} ${description}`;

  const categoryPatterns = {
    'Payroll News': ['payroll', 'paye', 'wages', 'salary', 'tax', 'national insurance', 'pension', 'hmrc', 'rtl', 'p45', 'p60', 'ir35'],
    'Employee Benefits News': ['benefits', 'wellbeing', 'wellness', 'health insurance', 'life insurance', 'mental health', 'flexible benefits', 'perks', 'rewards', 'cycle to work', 'gym'],
    'HR Legal News': ['tribunal', 'employment law', 'discrimination', 'unfair dismissal', 'redundancy', 'maternity', 'paternity', 'acas', 'legal', 'dispute', 'legislation'],
    'UK HR News': ['hr', 'human resources', 'recruitment', 'hiring', 'employee', 'staff', 'workplace', 'personnel', 'cipd', 'workforce']
  };

  let bestCategory = 'UK HR News';
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
// Transform MediaStack article to ProcessedArticle format
function transformMediaStackArticle(article: MediaStackArticle): Partial<ProcessedArticle> {
  const category = categorizeArticle(article);
  
  return {
    title: article.title || 'Untitled',
    link: article.url || '',
    pubDate: article.published_at || new Date().toISOString(),
    content: article.description || '',
    source: article.source || 'Unknown Source',
    category: category,
    summary: '',
    sentiment: 'neutral',
    sentimentScore: 0.5,
    topics: []
  };
}

// Process articles with AI (Edge Runtime optimized)
async function processArticleBatch(articles: Partial<ProcessedArticle>[]): Promise<ProcessedArticle[]> {
  const processedArticles: ProcessedArticle[] = [];
  
  // Process in smaller batches to avoid overwhelming the API
  for (let i = 0; i < articles.length; i += 3) {
    const batch = articles.slice(i, i + 3);
    
    const batchPromises = batch.map(async (article) => {
      try {
        const summary = await summarizeText(article.content || '');

        return {
          ...article,
          summary: summary || article.content?.substring(0, 200) + '...' || 'Summary not available',
          sentiment: 'neutral',
          sentimentScore: 0.5,
          topics: []
        } as ProcessedArticle;
      } catch (error) {
        console.error(`Error processing article "${article.title}":`, error);
        
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
    
    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        processedArticles.push(result.value);
      }
    });

    // Small delay between batches
    if (i + 3 < articles.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return processedArticles;
}
// Main GET handler for Edge Function
export async function GET(request: Request) {
  const url = new URL(request.url);
  const cronSecret = url.searchParams.get('cron_secret');
  
  if (cronSecret !== process.env.CRON_SECRET) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    console.log('Starting daily news update job (Edge Function)...');
    const startTime = Date.now();
    const redis = new EdgeRedisClient();

    // Collect all articles
    const allArticles: ProcessedArticle[] = [];
    const feedsByCategory: Record<string, {
      title: string;
      description: string;
      sources: string[];
      items: ProcessedArticle[];
    }> = {
      'UK HR News': { title: 'UK HR News', description: 'Latest articles in the UK HR News category', sources: [], items: [] },
      'Payroll News': { title: 'Payroll News', description: 'Latest articles in the Payroll News category', sources: [], items: [] },
      'Employee Benefits News': { title: 'Employee Benefits News', description: 'Latest articles in the Employee Benefits News category', sources: [], items: [] },
      'HR Legal News': { title: 'HR Legal News', description: 'Latest articles in the HR Legal News category', sources: [], items: [] }
    };

    // Process each MediaStack query
    for (const [queryName, query] of Object.entries(mediaStackQueries)) {
      try {
        console.log(`Fetching articles for query: ${queryName}`);
        
        const mediaStackArticles = await fetchMediaStackArticles(query);
        console.log(`Fetched ${mediaStackArticles.length} articles for ${queryName}`);

        if (mediaStackArticles.length === 0) {
          console.log(`No articles found for query ${queryName}`);
          continue;
        }

        const transformedArticles = mediaStackArticles.map(article => 
          transformMediaStackArticle(article)
        );

        const processedArticles = await processArticleBatch(transformedArticles);
        console.log(`Processed ${processedArticles.length} articles for ${queryName}`);

        allArticles.push(...processedArticles);

        // 10-second delay between queries (we have 30s total)
        if (Object.keys(mediaStackQueries).indexOf(queryName) < Object.keys(mediaStackQueries).length - 1) {
          console.log('Waiting 10 seconds before next query...');
          await new Promise(resolve => setTimeout(resolve, 10000));
        }

      } catch (queryError) {
        console.error(`Error processing query ${queryName}:`, queryError);
      }
    }
    // Organize articles by category
    allArticles.forEach(article => {
      const category = article.category;
      if (feedsByCategory[category]) {
        feedsByCategory[category].items.push(article);
        
        if (!feedsByCategory[category].sources.includes(article.source)) {
          feedsByCategory[category].sources.push(article.source);
        }
      }
    });

    // Sort articles by date
    const sortedArticles = allArticles.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    // Generate AI-powered master summary
    let masterSummary = '';
    if (sortedArticles.length > 0) {
      try {
        console.log('Creating AI master summary...');
        masterSummary = await createMasterSummary(sortedArticles);
      } catch (summaryError) {
        console.error('Error creating master summary:', summaryError);
        masterSummary = 'Industry news summary covering HR, payroll, and employee benefits developments from various sources.';
      }
    } else {
      masterSummary = 'No articles available at the moment. Please check back later.';
    }

    // Simple trending topics from titles
    const topicCounts: { [key: string]: number } = {};
    sortedArticles.slice(0, 10).forEach((article) => {
      const words = article.title.toLowerCase().split(/\W+/).filter(word => 
        word.length > 3 && !['that', 'with', 'this', 'have', 'will', 'been', 'they', 'their', 'would', 'could', 'should'].includes(word)
      );
      
      words.forEach(word => {
        topicCounts[word] = (topicCounts[word] || 0) + 1;
      });
    });
    
    const trendingTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([topic, count]) => ({ topic, count }));

    // Create final response
    const finalResponse: EnhancedFeedResponse = {
      feedsByCategory,
      allArticles: sortedArticles,
      trendingTopics,
      masterSummary,
      timestamp: new Date().toISOString()
    };

    // Store in Redis
    console.log('Storing data in Redis...');
    await redis.set('dailyNewsData', finalResponse);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`Edge Function completed in ${duration} seconds`);

    return new Response(JSON.stringify({
      message: 'News update successful',
      articlesProcessed: sortedArticles.length,
      categories: Object.keys(feedsByCategory).length,
      duration: `${duration}s`,
      runtime: 'edge'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in Edge Function:', error);
    return new Response(JSON.stringify({
      message: 'News update failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      runtime: 'edge'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}