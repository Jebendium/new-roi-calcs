// Debug wrapper for the analyzeSentiment function in the route.ts file
// Paste this inside the route.ts file to replace the original function

// Sentiment analysis function - fallback when worker thread is not available
async function analyzeSentiment(text: string) {
  try {
    console.log("Attempting sentiment analysis for text:", text.substring(0, 50) + "...");
    
    // Updated endpoint URL to use the router format
    const response = await fetch('https://router.huggingface.co/distilbert-base-uncased-finetuned-sst-2-english', {
      method: 'POST',
      headers: {
        // Using both environment variable names to ensure compatibility
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN || process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text.substring(0, 500), // Take first 500 chars for sentiment
      }),
    });
    
    console.log("Sentiment API Response Status:", response.status);
    
    if (!response.ok) {
      console.log("Sentiment API Error:", response.statusText);
      return { sentiment: 'neutral', score: 0.5 };
    }
    
    const result = await response.json();
    console.log("Sentiment API Raw Response:", JSON.stringify(result));
    
    // Handling different response formats from the API
    let positiveResult;
    if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
      // Original format
      positiveResult = result[0].find((item: any) => item.label === 'POSITIVE');
    } else if (Array.isArray(result)) {
      // Alternative format
      positiveResult = result.find((item: any) => item.label === 'POSITIVE');
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
    
    console.log("Final sentiment result:", { sentiment, score });
    return { sentiment, score };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    console.log("Returning default neutral sentiment due to error");
    return { sentiment: 'neutral', score: 0.5 };
  }
}

// Debugging version of the processArticle function
// Paste this inside the route.ts file to replace the original function

async function processArticle(item: any, feedTitle: string, feedCategory: string) {
  try {
    // Get the richest content available
    const content = item.fullContent || item.content || item.contentSnippet || item.description || item.title;
    
    console.log(`Processing article: ${item.title.substring(0, 50)}...`);
    console.log(`Starting sentiment analysis for article: ${item.title.substring(0, 50)}...`);
    
    // Generate summary and sentiment analysis in parallel
    const [summary, sentiment] = await Promise.all([
      summarizeText(content),
      analyzeSentiment(content)
    ]);
    
    console.log(`Sentiment result for "${item.title.substring(0, 30)}...": ${sentiment.sentiment} (${sentiment.score})`);
    
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
