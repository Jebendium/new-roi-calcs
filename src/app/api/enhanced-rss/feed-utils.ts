// Utility functions for feed processing
import { FeedItem, ProcessedArticle } from './types';
import { analyzeSentiment, summarizeText } from './api-services';

// Function to deduplicate articles
export function deduplicateArticles(articles: ProcessedArticle[]): ProcessedArticle[] {
  const seen = new Map<string, ProcessedArticle>();
  
  return articles.filter(article => {
    // Create a fingerprint using title and content
    const titleWords = article.title.toLowerCase().split(/\s+/).slice(0, 5).join(' ');
    const contentPreview = article.content?.substring(0, 100).toLowerCase() || '';
    const fingerprint = `${titleWords}::${contentPreview}`;
    
    // Check if we've seen a similar article
    const similarity = [...seen.keys()].find(key => {
      // Simple similarity check - could be enhanced with proper text similarity algorithms
      return key.includes(titleWords) || titleWords.includes(key.split('::')[0]);
    });
    
    if (similarity) {
      // If we've seen a similar article, compare their timestamps
      const existingDate = seen.get(similarity)!.pubDate;
      const currentDate = article.pubDate;
      
      // Keep the newest one
      if (new Date(currentDate) > new Date(existingDate)) {
        seen.delete(similarity);
        seen.set(fingerprint, article);
        return true;
      }
      return false;
    } 
    
    // If no similar article found, add to seen and keep
    seen.set(fingerprint, article);
    return true;
  });
}

// Note: Removed unused chunkArray function

// Extract topics from article title and content
function extractArticleTopics(title: string, content: string): string[] {
  // Common stop words to filter out
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 
    'by', 'about', 'as', 'of', 'this', 'that', 'these', 'those', 'is', 'are', 
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 
    'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might',
    'must', 'from', 'what', 'when', 'where', 'how', 'all', 'any', 'both', 'each'
  ]);
  
  // Extract words from title and content
  const titleWords = title.toLowerCase().split(/\W+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  const contentWords = content.toLowerCase().split(/\W+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  // Count word frequencies
  const wordCounts = new Map<string, number>();
  
  // Title words get higher weight
  titleWords.forEach(word => {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 3);
  });
  
  // Content words
  contentWords.forEach(word => {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  });
  
  // Extract top words as topics
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

// Generate a simple summary based on the first 2-3 sentences
function generateSimpleSummary(text: string): string {
  if (!text || text.length < 100) return text || 'No content available';
  
  // Extract sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // If very few sentences, return as is
  if (sentences.length <= 3) return text;
  
  // Take first 2-3 sentences (often contains the main point in news articles)
  const summary = sentences.slice(0, 3).join(' ');
  
  return summary;
}

// Process a batch of articles with better parallelization
export async function processArticleBatch(
  items: FeedItem[], 
  feedTitle: string, 
  feedCategory: string
): Promise<ProcessedArticle[]> {
  // Process sequentially to avoid overwhelming the API
  const processedItems: ProcessedArticle[] = [];
  
  for (const item of items) {
    try {
      // Add a small delay between processing each item
      if (processedItems.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay between article processing
      }
      
      const result = await processArticle(item, feedTitle, feedCategory);
      processedItems.push(result);
    } catch (error) {
      console.error(`Error in batch processing for ${item.title}:`, error);
      // Continue with other items
    }
  }
  
  return processedItems;
}

// Process a single article with sentiment analysis and summarization
export async function processArticle(item: FeedItem, feedTitle: string, feedCategory: string): Promise<ProcessedArticle> {
  try {
    // Get the richest content available safely
    const contentSource = item.fullContent || item.content || item.contentSnippet || item.description || item.title || '';
    const content = typeof contentSource === 'string' ? contentSource : 
      typeof contentSource === 'object' ? JSON.stringify(contentSource) : '';
    
    // Use a simple summary generator first before attempting AI summary
    const simpleSummary = generateSimpleSummary(content);
    
    // Extract topics locally immediately
    const topics = extractArticleTopics(item.title || '', content);
    
    // Create a timeout promise for the entire processing
    const timeoutPromise = new Promise<ProcessedArticle>((resolve) => {
      setTimeout(() => {
        console.log(`Processing timed out for article ${item.title}, using defaults`);
        
        resolve({
          title: item.title || 'Untitled',
          link: item.link || '#',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          content: content,
          summary: simpleSummary,
          sentiment: "neutral",
          sentimentScore: 0.5,
          source: feedTitle,
          category: feedCategory,
          topics: topics
        });
      }, 15000); // Increased to 15 second timeout (from 12s)
    });
    
    // Main processing promise
    const processingPromise = (async () => {
      // Generate summary and sentiment analysis in parallel
      const [summary, sentiment] = await Promise.all([
        summarizeText(content),
        analyzeSentiment(content)
      ]);
      
      return {
        title: item.title || 'Untitled',
        link: item.link || '#',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        content: content,
        summary: summary || simpleSummary, // Use AI summary if available, otherwise use simple summary
        sentiment: sentiment.sentiment,
        sentimentScore: sentiment.score,
        source: feedTitle,
        category: feedCategory,
        topics: topics
      };
    })();
    
    // Race between processing and timeout
    return Promise.race([processingPromise, timeoutPromise]);
  } catch (error) {
    console.error(`Error processing article ${item.title}:`, error);
    // Return with default values for error cases
    const contentSource = item.fullContent || item.content || item.contentSnippet || item.description || item.title || '';
    const content = typeof contentSource === 'string' ? contentSource : 
      typeof contentSource === 'object' ? JSON.stringify(contentSource) : '';
    
    // Use simple summary and local topic extraction
    const simpleSummary = generateSimpleSummary(content);
    const topics = extractArticleTopics(item.title || '', content);
      
    return {
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      content: content,
      summary: simpleSummary,
      sentiment: "neutral",
      sentimentScore: 0.5,
      source: feedTitle,
      category: feedCategory,
      topics: topics
    };
  }
}