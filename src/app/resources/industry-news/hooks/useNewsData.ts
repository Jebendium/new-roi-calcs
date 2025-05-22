import { useState, useEffect } from 'react';
import { FeedResponse } from '../types';

// Define partial data interface for progressive loading
export interface PartialFeedResponse {
  feeds?: any[];
  masterSummary?: string;
  timestamp?: string;
  topics?: {
    trendingTopics: { name: string; count: number; sentiment: number }[];
  };
  loadingStatus?: {
    topics: boolean;
    summary: boolean;
    feeds: {
      [category: string]: boolean;
    };
  };
}

export const useNewsData = (cacheKey: string) => {
  const [feedResponse, setFeedResponse] = useState<FeedResponse | null>(null);
  const [partialData, setPartialData] = useState<PartialFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState<string>('Initializing...');
  const [minimumLoadingTimeElapsed, setMinimumLoadingTimeElapsed] = useState(false);

  // Ensure the loading message is shown for at least 3 seconds
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setMinimumLoadingTimeElapsed(true);
      }, 3000); // 3 seconds minimum loading time
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    // First try to load cached data from localStorage
    const loadCachedData = () => {
      try {
        if (typeof window !== 'undefined') {
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            const parsedData = JSON.parse(cachedData) as FeedResponse;
            // Check if the cache is recent (less than 6 hours old)
            const cacheTimestamp = new Date(parsedData.timestamp).getTime();
            const sixHoursAgo = Date.now() - (6 * 60 * 60 * 1000);
            
            if (cacheTimestamp > sixHoursAgo) {
              console.log('Loading data from cache');
              setFeedResponse(parsedData);
              setPartialData(parsedData); // Also set partial data
              
              // Still show loading for at least the minimum time
              setTimeout(() => {
                setLoading(false);
                setInitialLoad(false);
                setLoadingProgress(100);
              }, 2000); // Delay by 2 seconds to ensure loading message is visible
              
              // Still fetch fresh data in the background
              fetchFeeds(false);
              return true;
            }
          }
        }
        return false;
      } catch (err) {
        console.error('Error loading cache:', err);
        return false;
      }
    };
    
    // If we couldn't load from cache, fetch fresh data
    if (!loadCachedData()) {
      fetchFeeds(true);
    }
  }, [cacheKey]);

  // Fetch data from the enhanced-rss API
  async function fetchFeeds(updateLoadingState = true) {
    try {
      if (updateLoadingState) {
        setLoading(true);
        setLoadingProgress(10);
        setLoadingStage('Connecting to news sources...');
        setMinimumLoadingTimeElapsed(false);
        
        // Reset the minimum loading time timer
        setTimeout(() => {
          setMinimumLoadingTimeElapsed(true);
        }, 3000);
      } else {
        setIsRefreshing(true);
      }
      
      // Use a timeout to abort the fetch if it takes too long
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
      
      // Start the fetch operation
      const response = await fetch('/api/enhanced-rss', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch feeds: ${response.status} ${response.statusText}`);
      }
      
      // Check if response body can be streamed
      if (!response.body) {
        // Standard non-streamed response
        const apiData = await response.json();
        processCompletedResponse(apiData, updateLoadingState);
      } else {
        // Process the response progressively
        processStreamedResponse(response, updateLoadingState);
      }
    } catch (err: any) {
      console.error('Error:', err);
      // Only set error if we don't already have data
      if (!feedResponse) {
        // Provide more specific error messages based on the error
        if (err instanceof SyntaxError) {
          setError('Invalid response format from API. Please check the API endpoint.');
        } else if (err instanceof TypeError && err.message.includes('undefined')) {
          setError('API response structure is incorrect. Check for missing data fields.');
        } else if (err instanceof Error) {
          setError(`Failed to load feeds: ${err.message}`);
        } else {
          setError('Failed to load feeds. Please try again later.');
        }
      }
      
      // Wait for minimum loading time to elapse
      const finalizeError = () => {
        // Still reset loading states
        if (updateLoadingState) {
          setLoading(false);
          setInitialLoad(false);
        } else {
          setIsRefreshing(false);
        }
        setLoadingProgress(0);
      };
      
      if (minimumLoadingTimeElapsed) {
        finalizeError();
      } else {
        setTimeout(finalizeError, 2000); // Show error after at least 2 seconds
      }
    }
  }

  async function processStreamedResponse(response: Response, updateLoadingState: boolean) {
    try {
      // Since the API is not actually set up for streaming, we'll simulate it
      // In a real implementation, you would use a streaming API response
      const apiData = await response.json();
      
      // Track if we have any actual data to display
      let hasContent = false;
      
      // Simulate progressive loading with longer delays for UI visibility
      // First, extract topics and summary if available
      if (apiData.trendingTopics && apiData.trendingTopics.length > 0) {
        hasContent = true;
        setLoadingProgress(30);
        setLoadingStage('Processing trending topics...');
        
        // Update partial data with just the topics
        setPartialData(current => {
          const newPartial: PartialFeedResponse = {
            ...(current || {}),
            topics: {
              trendingTopics: apiData.trendingTopics.map((topic: any) => ({
                name: topic.topic || '',
                count: topic.count || 0,
                sentiment: topic.sentiment || 0.5
              }))
            },
            timestamp: apiData.timestamp || new Date().toISOString(),
            loadingStatus: {
              ...(current?.loadingStatus || { topics: false, summary: false, feeds: {} }),
              topics: true
            }
          };
          return newPartial;
        });
        
        // Longer delay to ensure UI visibility
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Then, load the executive summary
      if (apiData.masterSummary && apiData.masterSummary.length > 0) {
        hasContent = true;
        setLoadingProgress(50);
        setLoadingStage('Generating executive summary...');
        
        setPartialData(current => {
          return {
            ...(current || {}),
            masterSummary: apiData.masterSummary,
            loadingStatus: {
              ...(current?.loadingStatus || { topics: false, summary: false, feeds: {} }),
              summary: true
            }
          };
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Finally, load the category feeds progressively
      if (apiData.feedsByCategory && Object.keys(apiData.feedsByCategory).length > 0) {
        const categories = Object.keys(apiData.feedsByCategory);
        const feedsArray: any[] = [];
        const feedStatus: { [category: string]: boolean } = {};
        
        let categoryWithArticles = false;
        
        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];
          const categoryData = apiData.feedsByCategory[category];
          
          // Check if this category has any articles
          if (categoryData.items && categoryData.items.length > 0) {
            categoryWithArticles = true;
            hasContent = true;
            
            // Update loading progress based on category processing
            setLoadingProgress(50 + Math.floor((i / categories.length) * 50));
            setLoadingStage(`Loading ${category} articles...`);
            
            // Create feed object for this category
            const feed = {
              title: categoryData.title || category,
              description: categoryData.description || `Articles in ${category}`,
              link: categoryData.link || '',
              category: category,
              items: Array.isArray(categoryData.items) ? categoryData.items : []
            };
            
            feedsArray.push(feed);
            feedStatus[category] = true;
            
            // Update partial data with this category
            setPartialData(current => {
              return {
                ...(current || {}),
                feeds: [...(current?.feeds || []), feed],
                loadingStatus: {
                  ...(current?.loadingStatus || { topics: false, summary: false, feeds: {} }),
                  feeds: {
                    ...(current?.loadingStatus?.feeds || {}),
                    [category]: true
                  }
                }
              };
            });
            
            // Longer delay between processing each category
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        // After loading all feeds, create the complete response
        if (feedsArray.length > 0) {
          const transformedData: FeedResponse = {
            feeds: feedsArray,
            masterSummary: apiData.masterSummary || '',
            timestamp: apiData.timestamp || new Date().toISOString(),
            topics: apiData.trendingTopics ? {
              trendingTopics: apiData.trendingTopics.map((topic: any) => ({
                name: topic.topic || '',
                count: topic.count || 0,
                sentiment: topic.sentiment || 0.5
              }))
            } : undefined
          };
          
          // Set the full response and save to cache
          setFeedResponse(transformedData);
          setLoadingProgress(100);
          setLoadingStage('Complete');
          
          // Save to localStorage for faster loading next time
          if (typeof window !== 'undefined') {
            localStorage.setItem(cacheKey, JSON.stringify(transformedData));
          }
        } else if (!hasContent) {
          // No feeds had any articles
          setError('No articles available at the moment. Please try again later.');
          setFeedResponse(null);
          setPartialData(null);
        }
      } else if (!hasContent) {
        // No feeds, topics, or summary
        setError('No content available at the moment. Please try again later.');
        setFeedResponse(null);
        setPartialData(null);
      }
      
      // Only reset loading state when minimum time has elapsed
      const finalizeLoading = () => {
        if (updateLoadingState) {
          setLoading(false);
          setInitialLoad(false);
        } else {
          setIsRefreshing(false);
        }
      };
      
      if (minimumLoadingTimeElapsed) {
        finalizeLoading();
      } else {
        setTimeout(finalizeLoading, 1000);
      }
    } catch (err) {
      console.error('Error processing streamed response:', err);
      processCompletedResponse(await response.json(), updateLoadingState);
    }
  }

  function processCompletedResponse(apiData: any, updateLoadingState: boolean) {
    // Fallback to traditional processing if streaming fails
    console.log('API response:', apiData);
    
    // Transform API response to match expected FeedResponse structure
    if (apiData) {
      let hasContent = false;
      
      // Extract feeds from feedsByCategory
      const feeds = Object.entries(apiData.feedsByCategory || {}).map(([category, data]: [string, any]) => {
        if (data.items && data.items.length > 0) {
          hasContent = true;
        }
        
        return {
          title: data.title || category,
          description: data.description || `Articles in ${category}`,
          link: data.link || '',
          category: category,
          items: Array.isArray(data.items) ? data.items : []
        };
      }).filter(feed => feed.items.length > 0); // Only include feeds with items
      
      // Structure trending topics correctly
      const hasTrendingTopics = apiData.trendingTopics && apiData.trendingTopics.length > 0;
      if (hasTrendingTopics) {
        hasContent = true;
      }
      
      const topics = hasTrendingTopics ? {
        trendingTopics: apiData.trendingTopics.map((topic: any) => ({
          name: topic.topic || '',
          count: topic.count || 0,
          sentiment: topic.sentiment || 0.5
        }))
      } : undefined;
      
      // Check if summary exists
      const hasSummary = apiData.masterSummary && apiData.masterSummary.length > 0;
      if (hasSummary) {
        hasContent = true;
      }
      
      if (hasContent) {
        // Create the transformed response
        const transformedData: FeedResponse = {
          feeds: feeds,
          masterSummary: apiData.masterSummary || '',
          timestamp: apiData.timestamp || new Date().toISOString(),
          topics: topics
        };
        
        setFeedResponse(transformedData);
        setPartialData(transformedData);
        setLoadingProgress(100);
        
        // Save to localStorage for faster loading next time
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(transformedData));
        }
      } else {
        // No content available
        setError('No content available at the moment. Please try again later.');
        setFeedResponse(null);
        setPartialData(null);
      }
    } else {
      // Handle case where API returns null/undefined
      setError('Invalid response from API. Please try again later.');
      setFeedResponse(null);
      setPartialData(null);
    }
    
    // Only reset loading state when minimum time has elapsed
    const finalizeLoading = () => {
      if (updateLoadingState) {
        setLoading(false);
        setInitialLoad(false);
      } else {
        setIsRefreshing(false);
      }
    };
    
    if (minimumLoadingTimeElapsed) {
      finalizeLoading();
    } else {
      setTimeout(finalizeLoading, 1000);
    }
  }

  // Manually refresh the feeds
  const handleRefresh = () => {
    fetchFeeds(false); // Don't show full loading state, just a refresh indicator
  };

  return {
    feedResponse,
    partialData,
    loading,
    initialLoad,
    error,
    isRefreshing,
    loadingProgress,
    loadingStage,
    handleRefresh
  };
};