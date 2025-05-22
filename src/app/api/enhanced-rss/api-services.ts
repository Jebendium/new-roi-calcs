// External API service functions for sentiment analysis, summarization, etc.
import { ProcessedArticle } from './types';
import OpenAI from 'openai';

// Lazy initialization of DeepSeek client to avoid build-time issues
let deepseekClient: OpenAI | null = null;

function getDeepSeekClient(): OpenAI {
  if (!deepseekClient) {
    deepseekClient = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY || 'dummy-key-for-build',
    });
  }
  return deepseekClient;
}

// Simple local sentiment analysis (fallback if API is too slow or fails)
function localSentimentAnalysis(text: string): { sentiment: string; score: number } {
  // Simple keyword-based approach
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'positive', 'benefit', 'benefits', 'advantage', 'advantages', 'improve', 'improvement', 'success', 'successful', 'growth', 'opportunity', 'opportunities'];
  const negativeWords = ['bad', 'poor', 'terrible', 'negative', 'problem', 'problems', 'issue', 'issues', 'fail', 'failure', 'decline', 'crisis', 'difficult', 'challenge', 'challenging'];
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) positiveCount += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) negativeCount += matches.length;
  });
  
  // Calculate a score between 0 and 1
  const total = positiveCount + negativeCount;
  if (total === 0) return { sentiment: 'neutral', score: 0.5 };
  
  const score = positiveCount / total;
  
  // Determine sentiment category
  let sentiment;
  if (score > 0.67) {
    sentiment = 'positive';
  } else if (score < 0.33) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  return { sentiment, score };
}

// Simple local text summarization (fallback if API is too slow or fails)
function localSummarization(text: string): string {
  if (!text || text.length < 100) return text;
  
  // Extract sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // If very few sentences, return as is
  if (sentences.length <= 3) return text;
  
  // Take first sentence (often contains the main point in news articles)
  // and a couple from the middle
  const summary = [
    sentences[0],
    sentences[Math.floor(sentences.length / 2)],
    sentences[Math.min(sentences.length - 1, 3)]
  ].join(' ');
  
  return summary;
}

// DeepSeek sentiment analysis function with local fallback
export async function analyzeSentiment(text: string): Promise<{ sentiment: string; score: number }> {
  // If text is very short, use local analysis
  if (!text || text.length < 100) {
    return localSentimentAnalysis(text || '');
  }
  
  try {
    // Use DeepSeek API for sentiment analysis
    const response = await getDeepSeekClient().chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a sentiment analysis AI. Analyze the sentiment of the given text and respond with only a JSON object containing 'sentiment' (positive, negative, or neutral) and 'score' (0 to 1)."
        },
        {
          role: "user",
          content: text.substring(0, 500) // Take first 500 chars for sentiment
        }
      ],
      temperature: 0,
      max_tokens: 100
    });
    
    // Extract and parse the response
    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      console.log('Empty response from DeepSeek API, using local fallback');
      return localSentimentAnalysis(text);
    }
    
    try {
      // Try to parse the JSON response
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : responseContent;
      const result = JSON.parse(jsonStr);
      
      if (result && result.sentiment && typeof result.score === 'number') {
        // Normalize the sentiment values to match our expected format
        let normalizedSentiment = result.sentiment.toLowerCase();
        if (normalizedSentiment !== 'positive' && normalizedSentiment !== 'negative' && normalizedSentiment !== 'neutral') {
          normalizedSentiment = 'neutral';
        }
        
        return {
          sentiment: normalizedSentiment,
          score: result.score
        };
      }
    } catch (parseError) {
      console.error('Error parsing DeepSeek response:', parseError);
    }
    
    // If we couldn't parse the response or it doesn't have the expected format, use local analysis
    return localSentimentAnalysis(text);
  } catch (error) {
    console.error('Error analyzing sentiment with DeepSeek:', error);
    return localSentimentAnalysis(text);
  }
}

// DeepSeek text summarization with local fallback
export async function summarizeText(text: string): Promise<string> {
  // If text is very short, no need to summarize
  if (!text || text.length < 500) {
    return text || 'No content available for summarization.';
  }
  
  try {
    // Use DeepSeek API for summarization
    const response = await getDeepSeekClient().chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a text summarization AI. Summarize the following text in 3-4 concise sentences that capture the main points. Use UK English spelling and terminology."
        },
        {
          role: "user",
          content: text.substring(0, 1500) // Take first 1500 chars for summarization
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    });
    
    // Extract the summary
    const summary = response.choices[0].message.content;
    if (summary && summary.length > 0) {
      return summary;
    } else {
      console.log('Empty summary from DeepSeek API, using local fallback');
      return localSummarization(text);
    }
  } catch (error) {
    console.error('Error summarizing text with DeepSeek:', error);
    return localSummarization(text);
  }
}

// Simple local topic extraction
function localTopicExtraction(articles: ProcessedArticle[]): { topic: string; count: number }[] {
  // Extract common phrases from titles and content
  const commonPhrases: Record<string, number> = {};
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'of', 'this', 'that', 'these', 'those']);
  
  articles.forEach(article => {
    // Process title words to find common topics
    const titleWords = article.title.toLowerCase().split(/\W+/).filter(word => 
      word.length > 3 && !stopWords.has(word)
    );
    
    // Count occurrences
    titleWords.forEach(word => {
      commonPhrases[word] = (commonPhrases[word] || 0) + 2; // Title words count double
    });
    
    // Process content if available (giving less weight to content words)
    if (article.content) {
      const contentWords = article.content.toLowerCase().split(/\W+/).filter(word => 
        word.length > 3 && !stopWords.has(word)
      );
      
      // Sample every 5th word to keep processing light
      for (let i = 0; i < contentWords.length; i += 5) {
        const word = contentWords[i];
        commonPhrases[word] = (commonPhrases[word] || 0) + 1;
      }
    }
  });
  
  // Convert to array and sort by frequency
  return Object.entries(commonPhrases)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Top 10 topics
    .map(([topic, count]) => ({ topic, count }));
}

// Topic extraction using DeepSeek with local fallback
export async function extractTopics(articles: ProcessedArticle[]): Promise<{ topic: string; count: number }[]> {
  // If there are very few articles, use local extraction
  if (!articles || articles.length < 3) {
    return localTopicExtraction(articles || []);
  }
  
  try {
    // Combine article titles and summaries for topic extraction
    const combinedText = articles.slice(0, 15).map(article => // Increased from 10 to 15 articles
      `ARTICLE: ${article.title}. ${article.summary || ''}`
    ).join('\n\n');
    
    // Use DeepSeek API for topic extraction
    const response = await getDeepSeekClient().chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a keyword extraction AI specializing in HR, payroll, and employee benefits. Extract the top 12 topics or keywords from the provided articles. Respond with a JSON array of objects, each with 'topic' and 'count' properties. The 'count' should represent the relative importance (1-10). Use short, specific terms that would work well as hashtags."
        },
        {
          role: "user",
          content: combinedText.substring(0, 3000) // Increased from 2000 to 3000 chars
        }
      ],
      temperature: 0.2,
      max_tokens: 500
    });
    
    // Extract and parse the response
    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      console.log('Empty response from DeepSeek API, using local fallback for topic extraction');
      return localTopicExtraction(articles);
    }
    
    try {
      // Try to parse the JSON response
      const jsonMatch = responseContent.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? jsonMatch[0] : responseContent;
      const result = JSON.parse(jsonStr);
      
      if (Array.isArray(result) && result.length > 0) {
        // Convert to our expected format
        return result.map(item => ({
          topic: item.topic || item.keyword || '',
          count: item.count || item.importance || 1
        })).filter(item => item.topic.length > 0);
      }
    } catch (parseError) {
      console.error('Error parsing DeepSeek topic extraction response:', parseError);
    }
    
    // If we couldn't parse the response or it doesn't have the expected format, use local extraction
    return localTopicExtraction(articles);
  } catch (error) {
    console.error('Error extracting topics with DeepSeek:', error);
    return localTopicExtraction(articles);
  }
}

// Simple local master summary generation
function localMasterSummary(articles: ProcessedArticle[]): string {
  if (!articles || articles.length === 0) {
    return 'No recent articles available.';
  }
  
  // Get the top 3 newest articles
  const topArticles = articles.slice(0, 3);
  
  // Create a simple master summary
  const summary = `Recent articles highlight ${topArticles.map(a => a.title.split(' ').slice(0, 3).join(' ')).join(', ')} and other important topics in HR and employee benefits. Key themes include ${localTopicExtraction(articles).slice(0, 3).map(t => t.topic).join(', ')}.`;
  
  return summary;
}

// Master summary generation using DeepSeek with local fallback
export async function createMasterSummary(allArticles: ProcessedArticle[]): Promise<string> {
  // If there are very few articles, use local summary
  if (!allArticles || allArticles.length < 3) {
    return localMasterSummary(allArticles || []);
  }
  
  try {
    // First, create a condensed version of all article titles and their individual summaries
    // Increase from top 5 to top 10 articles
    const combinedContent = allArticles.slice(0, 10).map(article => 
      `ARTICLE: ${article.title}\nSUMMARY: ${article.summary}\nCATEGORY: ${article.category}`
    ).join('\n\n');
    
    // Use DeepSeek API for master summary generation
    const response = await getDeepSeekClient().chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a news summarization expert specializing in HR, employee benefits, and payroll news. Create a comprehensive overview of the key trends and important developments from these articles. Your summary should be 2-4 paragraphs (at least 6 sentences total) that capture the main themes across HR News, Employee Benefits News, and Payroll News. Use UK English spelling and terminology throughout."
        },
        {
          role: "user",
          content: combinedContent.substring(0, 4000) // Increased from 2000 to 4000 chars
        }
      ],
      temperature: 0.3,
      max_tokens: 600 // Doubled from 300 to 600
    });
    
    // Extract the summary
    const masterSummary = response.choices[0].message.content;
    if (masterSummary && masterSummary.length > 0) {
      return masterSummary;
    } else {
      console.log('Empty master summary from DeepSeek API, using local fallback');
      return localMasterSummary(allArticles);
    }
  } catch (error) {
    console.error('Error creating master summary with DeepSeek:', error);
    return localMasterSummary(allArticles);
  }
}