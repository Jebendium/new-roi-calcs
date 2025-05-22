// Incremental feed update logic with improved handling
import { 
  ParsedFeed, 
  ProcessedArticle,
  EnhancedFeedResponse,
  FeedCategoryMap
} from './types';
import { cache, needsUpdate, saveCache, loadCache } from './cache';
import { allFeeds } from './feeds-config';
import { deduplicateArticles, processArticleBatch } from './feed-utils';
import { processFeedBatch } from './feed-fetcher';
import { extractTopics, createMasterSummary } from './api-services';

// Maximum time to spend updating feeds (increased to 10 minutes)
const MAX_UPDATE_TIME = 600000;

// Get incremental updates for feeds that need refreshing with timeout
export async function getIncrementalUpdates(forceRefresh = false): Promise<EnhancedFeedResponse> {
  // First, try to load cache from localStorage if available
  loadCache();
  
  // Identify feeds that need updating
  const feedsToUpdate = allFeeds.filter(feed => needsUpdate(feed.url, forceRefresh));
  
  // If no feeds need updating and we have cached data, return it immediately
  if (feedsToUpdate.length === 0 && cache.data) {
    return cache.data;
  }
  
  // Set a timeout for the entire update process
  let timeoutId: NodeJS.Timeout | null = setTimeout(() => {
    console.warn('Feed update process timed out, returning cached data or partial results');
  }, MAX_UPDATE_TIME);
  
  const clearTimeoutSafely = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  
  try {
    // Start timestamp to track overall execution time
    const startTime = Date.now();
    
    // Select a subset of feeds to update if there are too many
    // Process more feeds (8 instead of 6) per batch for better coverage
    let priorityFeeds = feedsToUpdate;
    if (feedsToUpdate.length > 8 && !forceRefresh) {
      console.log(`Too many feeds (${feedsToUpdate.length}) need updates, selecting 8 priority feeds`);
      priorityFeeds = feedsToUpdate.slice(0, 8);
    }
    
    // Process feeds in smaller batches of 2
    const feedBatches = [];
    for (let i = 0; i < priorityFeeds.length; i += 2) {
      feedBatches.push(priorityFeeds.slice(i, i + 2));
    }
    
    // Process each batch sequentially
    const updatedFeeds: ParsedFeed[] = [];
    for (const batch of feedBatches) {
      // Check if we're exceeding the time budget
      if (Date.now() - startTime > MAX_UPDATE_TIME * 0.6) {
        console.warn('Approaching time limit, stopping feed updates');
        break;
      }
      
      const batchResults = await processFeedBatch(batch);
      if (batchResults && batchResults.length > 0) {
        updatedFeeds.push(...batchResults);
      }
      
      // Add a short delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const now = Date.now();
    
    // If no cache exists or no feeds were updated successfully, process feeds
    if (!cache.data || updatedFeeds.length === 0) {
      // If we have no feeds at all, return an empty response
      if (updatedFeeds.length === 0) {
        const emptyResponse: EnhancedFeedResponse = {
          feedsByCategory: {},
          allArticles: [],
          trendingTopics: [],
          masterSummary: 'No feeds available at the moment. Please check back later.',
          timestamp: new Date().toISOString()
        };
        
        // Update cache with the empty response
        cache.data = emptyResponse;
        cache.timestamp = now;
        saveCache();
        
        // Clear the timeout
        clearTimeoutSafely();
        
        return emptyResponse;
      }
      
      // Process all feeds into articles
      const processedFeedsByCategory: FeedCategoryMap = {};
      const allArticles: ProcessedArticle[] = [];
      
      // Process each feed's articles
      for (const feed of updatedFeeds) {
        // Check if we're exceeding the time budget
        if (Date.now() - startTime > MAX_UPDATE_TIME * 0.7) {
          console.warn('Approaching time limit, stopping article processing');
          break;
        }
        
        // Skip feeds with no items
        if (!feed || !feed.items || feed.items.length === 0) continue;
        
        const feedInfo = allFeeds.find(f => f.url === feed.url);
        const category = feedInfo?.category || (typeof feed.category === "string" ? feed.category : "Uncategorized") || 'Uncategorized';
        // Ensure feedSource is always a string
        const feedSource = (feed.name || feed.title || 'Unknown Source') as string;
        
        // Initialize category if not exists
        if (!processedFeedsByCategory[category]) {
          processedFeedsByCategory[category] = {
            title: category,
            description: `Latest articles in the ${category} category`,
            sources: [],
            items: []
          };
        }
        
        // Add source if not already included
        if (!processedFeedsByCategory[category].sources.includes(feedSource)) {
          processedFeedsByCategory[category].sources.push(feedSource);
        }
        
        // Process up to 3 items per feed and use batched processing for better performance
        try {
          const processedItems = await processArticleBatch(
            feed.items.slice(0, 3), 
            feedSource, 
            category
          );
          
          // Add processed items to category and all articles
          if (processedItems && processedItems.length > 0) {
            processedFeedsByCategory[category].items.push(...processedItems);
            allArticles.push(...processedItems);
          }
        } catch (batchError) {
          console.error(`Error processing batch for ${feedSource}:`, batchError);
          // Continue with other feeds
        }
        
        // Update last feed update time
        if (feed.url) {
          cache.lastFeedUpdate[feed.url] = now;
        }
      }
      
      // Deduplicate articles
      const deduplicatedArticles = allArticles.length > 0 ? deduplicateArticles(allArticles) : [];
      
      // Sort by publication date (newest first)
      const sortedArticles = deduplicatedArticles.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      
      // Only extract topics and create master summary if we have enough articles and time
      let trendingTopics: { topic: string; count: number }[] = [];
      let masterSummary = '';
      
      if (sortedArticles.length > 0) {
        // Check if we still have time budget
        if (Date.now() - startTime < MAX_UPDATE_TIME * 0.85) {
          try {
            trendingTopics = await extractTopics(sortedArticles.slice(0, 10)); // Limit to top 10 articles for topic extraction
          } catch (topicError) {
            console.error('Error extracting topics:', topicError);
            // Use local extraction fallback
            const topicCounts: { [key: string]: number } = {};
          
            sortedArticles.slice(0, 10).forEach((article) => {
              if (article.topics) {
                article.topics.forEach((topic) => {
                  topicCounts[topic] = (topicCounts[topic] || 0) + 1;
                });
              }
            });
            
            trendingTopics = Object.entries(topicCounts)
              .map(([topic, count]) => ({ topic, count }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 8);
          }
          
          if (Date.now() - startTime < MAX_UPDATE_TIME * 0.95) {
            try {
              masterSummary = await createMasterSummary(sortedArticles.slice(0, 8)); // Limit to top 8 articles for summary
            } catch (summaryError) {
              console.error('Error creating master summary:', summaryError);
              masterSummary = "Industry news summary is being prepared. Please check back shortly.";
            }
          } else {
            masterSummary = "Industry news summary is being prepared. Please check back shortly.";
          }
        } else {
          // Skip these steps if running out of time
          // Extract topics directly from articles without API call
          const topicCounts: { [key: string]: number } = {};
          
          sortedArticles.slice(0, 10).forEach((article) => {
            if (article.topics) {
              article.topics.forEach((topic) => {
                topicCounts[topic] = (topicCounts[topic] || 0) + 1;
              });
            }
          });
          
          trendingTopics = Object.entries(topicCounts)
            .map(([topic, count]) => ({ topic, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
          
          masterSummary = "Industry news summary is being prepared. Please check back shortly.";
        }
      } else {
        masterSummary = "No articles available at the moment. Please check back later.";
      }
      
      // Prepare response data
      const responseData: EnhancedFeedResponse = {
        feedsByCategory: processedFeedsByCategory,
        allArticles: sortedArticles,
        trendingTopics,
        masterSummary,
        timestamp: new Date().toISOString()
      };
      
      // Update cache
      cache.data = responseData;
      cache.timestamp = now;
      cache.partialData = {}; 
      cache.lastFeedUpdate = {
        ...cache.lastFeedUpdate,
        ...Object.fromEntries(updatedFeeds.filter(f => f.url).map(feed => [feed.url!, now]))
      };
      
      // Save cache to localStorage
      saveCache();
      
      // Clear the timeout
      clearTimeoutSafely();
      
      return responseData;
    } else {
      // If cache exists, update incrementally
      const existingData = cache.data;
      const updatedData = { ...existingData };
      
      // Process each updated feed
      const allUpdatedArticles: ProcessedArticle[] = [];
      
      for (const feed of updatedFeeds) {
        // Check if we're exceeding the time budget
        if (Date.now() - startTime > MAX_UPDATE_TIME * 0.7) {
          console.warn('Approaching time limit, stopping article processing');
          break;
        }
        
        // Skip feeds with no items
        if (!feed || !feed.items || feed.items.length === 0) continue;
        
        const feedInfo = allFeeds.find(f => f.url === feed.url);
        const category = feedInfo?.category || (typeof feed.category === "string" ? feed.category : "Uncategorized") || 'Uncategorized';
        // Ensure feedSource is always a string
        const feedSource = (feed.name || feed.title || 'Unknown Source') as string;
        
        // Initialize category if not exists
        if (!updatedData.feedsByCategory[category]) {
          updatedData.feedsByCategory[category] = {
            title: category,
            description: `Latest articles in the ${category} category`,
            sources: [],
            items: []
          };
        }
        
        // Add source if not already included
        if (!updatedData.feedsByCategory[category].sources.includes(feedSource)) {
          updatedData.feedsByCategory[category].sources.push(feedSource);
        }
        
        // Process up to 3 items per feed and use batched processing for better performance
        try {
          const processedItems = await processArticleBatch(
            feed.items.slice(0, 3), 
            feedSource, 
            category
          );
          
          // Remove existing articles from this source to prevent duplicates
          if (updatedData.feedsByCategory[category].items) {
            updatedData.feedsByCategory[category].items = updatedData.feedsByCategory[category].items.filter(
              (item) => item.source !== feedSource
            );
          }
          
          // Add new articles
          if (processedItems && processedItems.length > 0) {
            updatedData.feedsByCategory[category].items.push(...processedItems);
            allUpdatedArticles.push(...processedItems);
          }
        } catch (batchError) {
          console.error(`Error processing batch for ${feedSource}:`, batchError);
          // Continue with other feeds
        }
        
        // Update last feed update time
        if (feed.url) {
          cache.lastFeedUpdate[feed.url] = now;
        }
      }
      
      // Collect all articles across categories
      const allArticles: ProcessedArticle[] = [];
      Object.values(updatedData.feedsByCategory).forEach((categoryData) => {
        if (categoryData && categoryData.items && categoryData.items.length > 0) {
          allArticles.push(...categoryData.items);
        }
      });
      
      // Deduplicate articles
      const deduplicatedArticles = allArticles.length > 0 ? deduplicateArticles(allArticles) : [];
      
      // Sort by publication date (newest first)
      const sortedArticles = deduplicatedArticles.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      
      // Update all articles in response
      updatedData.allArticles = sortedArticles;
      
      // Only update trending topics and master summary if significant changes
      // and if we have enough time budget left
      if ((allUpdatedArticles.length > 2 || forceRefresh) && 
          (Date.now() - startTime < MAX_UPDATE_TIME * 0.85)) {
        // Extract trending topics
        try {
          const trendingTopics = await extractTopics(sortedArticles.slice(0, 10));
          updatedData.trendingTopics = trendingTopics;
        } catch (topicError) {
          console.error('Error extracting topics:', topicError);
          // Use local extraction fallback
          const topicCounts: { [key: string]: number } = {};
          
          sortedArticles.slice(0, 10).forEach((article) => {
            if (article.topics) {
              article.topics.forEach((topic) => {
                topicCounts[topic] = (topicCounts[topic] || 0) + 1;
              });
            }
          });
          
          updatedData.trendingTopics = Object.entries(topicCounts)
            .map(([topic, count]) => ({ topic, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
        }
        
        // Only create master summary if we have time
        if (Date.now() - startTime < MAX_UPDATE_TIME * 0.95) {
          try {
            // Update master summary
            const masterSummary = await createMasterSummary(sortedArticles.slice(0, 8));
            updatedData.masterSummary = masterSummary;
          } catch (summaryError) {
            console.error('Error creating master summary:', summaryError);
            // Keep the existing summary
          }
        }
      } else if (allUpdatedArticles.length > 0) {
        // If we have updated articles but no time for API calls, 
        // update trending topics using local extraction
        const topicCounts: { [key: string]: number } = {};
          
        sortedArticles.slice(0, 10).forEach((article) => {
          if (article.topics) {
            article.topics.forEach((topic) => {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            });
          }
        });
        
        updatedData.trendingTopics = Object.entries(topicCounts)
          .map(([topic, count]) => ({ topic, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);
      }
      
      // Update timestamp
      updatedData.timestamp = new Date().toISOString();
      
      // Update cache
      cache.data = updatedData;
      cache.timestamp = now;
      
      // Save cache to localStorage
      saveCache();
      
      // Clear the timeout
      clearTimeoutSafely();
      
      return updatedData;
    }
  } catch (error) {
    console.error('Error getting incremental updates:', error);
    
    // Always clear the timeout
    clearTimeoutSafely();
    
    // If we have cached data, return it
    if (cache.data) {
      return cache.data;
    }
    
    // Otherwise, return a minimal valid response
    return {
      feedsByCategory: {},
      allArticles: [],
      trendingTopics: [],
      masterSummary: 'An error occurred while fetching news. Please try again later.',
      timestamp: new Date().toISOString()
    };
  }
}