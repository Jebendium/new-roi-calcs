// Debug wrapper for the analyzeSentiment function in the rss-worker.js file
// Paste this inside the rss-worker.js file to replace the original function

// Sentiment analysis function
async function analyzeSentiment(text, huggingFaceToken) {
  try {
    console.log("Worker: Attempting sentiment analysis for text:", text.substring(0, 50) + "...");
    
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
    
    console.log("Worker: Sentiment API Response Status:", response.status);
    
    if (!response.ok) {
      console.log("Worker: Sentiment API Error:", response.statusText);
      return { sentiment: 'neutral', score: 0.5 };
    }
    
    const result = await response.json();
    console.log("Worker: Sentiment API Raw Response:", JSON.stringify(result));
    
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
    
    console.log("Worker: Final sentiment result:", { sentiment, score });
    return { sentiment, score };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    console.log("Worker: Returning default neutral sentiment due to error");
    return { sentiment: 'neutral', score: 0.5 };
  }
}

// Function to create a more detailed and comprehensive summary - UPDATED to use new router endpoint
async function summarizeText(text, huggingFaceToken) {
  try {
    console.log("Worker: Attempting text summarization...");
    
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
    
    console.log("Worker: Summarization API Response Status:", response.status);
    
    if (!response.ok) {
      console.error('Worker: Summary API error:', response.statusText);
      return 'Summary unavailable. Our AI summarization service is currently experiencing issues. Please check back later or read the full article for details.';
    }
    
    const result = await response.json();
    console.log("Worker: Summary API Raw Response:", JSON.stringify(result).substring(0, 200) + "...");
    
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
    console.error('Worker: Error summarizing text:', error);
    return 'Summary unavailable due to a technical issue. Please read the full article for details.';
  }
}

// Debugging version of the processArticle function in rss-worker.js
// Paste this inside the rss-worker.js file to replace the original function

async function processArticle(item, feedTitle, feedCategory, huggingFaceToken) {
  try {
    // Get the richest content available
    const content = item.fullContent || item.content || item.contentSnippet || item.description || item.title;
    
    console.log(`Worker: Processing article: ${item.title.substring(0, 50)}...`);
    console.log(`Worker: Starting sentiment analysis for article: ${item.title.substring(0, 50)}...`);
    
    // Generate summary and sentiment analysis in parallel
    const [summary, sentiment] = await Promise.all([
      summarizeText(content, huggingFaceToken),
      analyzeSentiment(content, huggingFaceToken)
    ]);
    
    console.log(`Worker: Sentiment result for "${item.title.substring(0, 30)}...": ${sentiment.sentiment} (${sentiment.score})`);
    
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
    console.error(`Worker: Error processing article ${item.title}:`, error);
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
