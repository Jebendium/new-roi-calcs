const { parentPort } = require('worker_threads');
const fetch = require('node-fetch');
const Parser = require('rss-parser');

// Worker receives feed data and processes it
parentPort.on('message', async (data) => {
  const { feed, huggingFaceToken } = data;
  
  try {
    // Process the feed
    const result = await processFeed(feed, huggingFaceToken);
    parentPort.postMessage(result);
  } catch (error) {
    console.error(`Worker error processing feed ${feed.url}:`, error);
    parentPort.postMessage({ 
      error: true, 
      url: feed.url,
      message: error.message 
    });
  }
});

// Process a feed
async function processFeed(feed, huggingFaceToken) {
  const { url, name, category } = feed;
  
  try {
    // Fetch and parse the feed
    const parsedFeed = await fetchRSSFeed(feed);
    
    if (!parsedFeed || !parsedFeed.items || parsedFeed.items.length === 0) {
      return { 
        error: true, 
        url, 
        category,
        source: name,
        message: 'No items in feed' 
      };
    }
    
    // Process articles in parallel for better performance
    const itemPromises = [];
    for (const item of parsedFeed.items.slice(0, 5)) {
      itemPromises.push(processArticle(item, parsedFeed.title || name, category, huggingFaceToken));
    }
    
    // Wait for all article processing to complete
    const processedResults = await Promise.all(itemPromises);
    
    return {
      url,
      category,
      source: name || parsedFeed.title,
      articles: processedResults
    };
  } catch (error) {
    console.error(`Error in worker processing feed ${url}:`, error);
    return { 
      error: true, 
      url, 
      category,
      source: name,
      message: error.message 
    };
  }
}

// Fetch and parse an RSS feed
async function fetchRSSFeed(feed) {
  const { url, name } = feed;
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
    const parsedFeed = await parser.parseURL(url);
    return {
      ...parsedFeed,
      name: name || parsedFeed.title
    };
  } catch (error) {
    console.error(`Error parsing feed ${url}:`, error);
    // Try a fallback approach for some common feed issues
    try {
      // Sometimes using a proxy helps with CORS issues
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      const text = await response.text();
      const parsedFeed = await parser.parseString(text);
      return {
        ...parsedFeed,
        name: name || parsedFeed.title
      };
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${url}:`, fallbackError);
      throw error; // Rethrow the original error
    }
  }
}

// Process a single article with sentiment analysis and summarization
async function processArticle(item, feedTitle, feedCategory, huggingFaceToken) {
  try {
    // Get the richest content available
    const content = item.fullContent || item.content || item.contentSnippet || item.description || item.title;
    
    // Generate summary and sentiment analysis in parallel
    const [summary, sentiment] = await Promise.all([
      summarizeText(content, huggingFaceToken),
      analyzeSentiment(content, huggingFaceToken)
    ]);
    
    return {
      title: item.title,
      link: item.link,
      pubDate: item.pubDate || item.isoDate,
      content: content,
      summary,
      sentiment: sentiment.sentiment,
      sentimentScore: sentiment.score,
      source: feedTitle,
      category: feedCategory
    };
  } catch (error) {
    console.error(`Error processing article ${item.title}:`, error);
    // Return with default values for error cases
    return {
      title: item.title,
      link: item.link,
      pubDate: item.pubDate || item.isoDate,
      content: item.fullContent || item.content || item.contentSnippet || item.description || item.title,
      summary: "Unable to generate summary due to an error.",
      sentiment: "neutral",
      sentimentScore: 0.5,
      source: feedTitle,
      category: feedCategory
    };
  }
}

// Sentiment analysis function - UPDATED to use new router endpoint
async function analyzeSentiment(text, huggingFaceToken) {
  try {
    // Updated endpoint URL to use the router format
    const response = await fetch('https://router.huggingface.co/distilbert-base-uncased-finetuned-sst-2-english', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text.substring(0, 500), // Take first 500 chars for sentiment
      }),
    });
    
    if (!response.ok) {
      console.log(`Sentiment API response status: ${response.status} ${response.statusText}`);
      return { sentiment: 'neutral', score: 0.5 };
    }
    
    const result = await response.json();
    
    // Handling different response formats from the API
    let positiveResult;
    if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
      // Original format
      positiveResult = result[0].find(item => item.label === 'POSITIVE');
    } else if (Array.isArray(result)) {
      // Alternative format
      positiveResult = result.find(item => item.label === 'POSITIVE');
    } else if (result.label && result.score) {
      // Single result format
      positiveResult = result.label === 'POSITIVE' ? result : null;
    } else {
      // Default fallback
      positiveResult = { label: 'NEUTRAL', score: 0.5 };
    }
    
    const score = positiveResult ? positiveResult.score : 0.5;
    
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
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return { sentiment: 'neutral', score: 0.5 };
  }
}

// Function to create a more detailed and comprehensive summary - UPDATED to use new router endpoint
async function summarizeText(text, huggingFaceToken) {
  try {
    // Updated endpoint URL to use the router format
    const response = await fetch('https://router.huggingface.co/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceToken}`,
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
    
    // Handle different response formats
    if (Array.isArray(result) && result.length > 0 && result[0].summary_text) {
      return result[0].summary_text;
    } else if (typeof result === 'object' && result.summary_text) {
      return result.summary_text;
    } else if (typeof result === 'object' && result.generated_text) {
      return result.generated_text;
    } else if (typeof result === 'string') {
      return result;
    }
    
    return 'Summary unavailable';
  } catch (error) {
    console.error('Error summarizing text:', error);
    return 'Summary unavailable due to a technical issue. Please read the full article for details.';
  }
}
