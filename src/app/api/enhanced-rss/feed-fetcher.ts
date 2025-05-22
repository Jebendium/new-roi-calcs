// RSS feed fetching and processing functions
import Parser from 'rss-parser';
import { FeedItem, FeedSource, ParsedFeed } from './types';

// Improved RSS feed handling with better error handling, retry logic, and timeout
export async function fetchRSSFeed(feed: FeedSource): Promise<ParsedFeed> {
  const { url, name } = feed;
  const parser = new Parser({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
    },
    timeout: 15000, // Increased to 15 second timeout (from 10s)
    customFields: {
      item: [
        ['content:encoded', 'fullContent'],
        ['description', 'description']
      ]
    },
    // Add XML entity parsing improvements to handle malformed XML
    defaultRSS: 2.0,
    xml2js: {
      emptyTag: '',
      normalize: true,
      normalizeTags: true,
      mergeAttrs: true,
      explicitArray: false,
      // Try to handle malformed entity errors
      strict: false
    }
  });
  
  // Create a promise that will reject after timeout to prevent indefinite loading
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out for ${url}`)), 20000); // Increased to 20 seconds
  });
  
  try {
    // Race the feed parsing against the timeout
    const parsedFeed = await Promise.race([
      parser.parseURL(url),
      timeoutPromise
    ]);
    
    // Convert parser output to our ParsedFeed type and limit to 6 items per feed
    const feedItems = (parsedFeed.items || [])
      .slice(0, 6) // Reduced limit to 6 items to help with timeout issues
      .map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        isoDate: item.isoDate,
        fullContent: item.fullContent,
        content: item.content,
        contentSnippet: item.contentSnippet,
        description: item.description
      } as FeedItem));
    
    return {
      title: parsedFeed.title,
      description: parsedFeed.description,
      link: parsedFeed.link,
      items: feedItems,
      name: name || parsedFeed.title,
      url: url
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error parsing feed ${url}:`, errorMessage);
    
    // Check if this was a timeout error
    if (errorMessage.includes('timed out')) {
      console.warn(`Feed ${url} timed out, skipping`);
      
      // Return empty feed instead of throwing
      return {
        title: name,
        description: `Feed ${url} timed out`,
        link: url,
        items: [],
        name,
        url
      };
    }
    
    // Try a direct fetch approach first (instead of using allorigins which is unreliable)
    try {
      const response = await Promise.race([
        fetch(url, { 
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
          },
          cache: 'no-store'
        }),
        timeoutPromise
      ]) as Response;
      
      if (!response.ok) {
        throw new Error(`Direct fetch status code ${response.status}`);
      }
      
      const text = await response.text();
      
      // Skip empty responses
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from direct fetch');
      }
      
      // Try parsing with more lenient settings
      const parserLenient = new Parser({
        customFields: {
          item: [
            ['content:encoded', 'fullContent'],
            ['description', 'description']
          ]
        },
        defaultRSS: 2.0,
        xml2js: {
          emptyTag: '',
          strict: false, // Less strict XML parsing
          normalize: true,
          normalizeTags: true,
          mergeAttrs: true,
          explicitArray: false
        }
      });
      
      // Try to sanitize common XML issues before parsing
      const sanitizedText = text
        .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;') // Fix unescaped ampersands
        .replace(/\<!\[CDATA\[\s*\<!\[CDATA\[/g, '<![CDATA[') // Fix nested CDATA sections
        .replace(/\]\]\>\s*\]\]\>/g, ']]>');
      
      try {
        const parsedFeed = await parserLenient.parseString(sanitizedText);
        
        // Check if parsedFeed or its items is undefined
        if (!parsedFeed || !parsedFeed.items) {
          // Create a fallback empty feed
          return {
            title: name || 'Unknown Feed',
            description: `Unable to parse feed from ${url}`,
            link: url,
            items: [],
            name: name || 'Unknown Feed',
            url
          };
        }
        
        // Convert parser output to our ParsedFeed type and limit to 6 items
        const feedItems = parsedFeed.items
          .slice(0, 6) // Reduced to 6 items
          .map(item => ({
            title: item.title || 'Untitled',
            link: item.link || url,
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
            isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
            fullContent: item.fullContent || item.content || item.description || '',
            content: item.content || item.description || '',
            contentSnippet: item.contentSnippet || '',
            description: item.description || ''
          } as FeedItem));
        
        return {
          title: parsedFeed.title || name || 'Unknown Feed',
          description: parsedFeed.description || `Feed from ${url}`,
          link: parsedFeed.link || url,
          items: feedItems,
          name: name || parsedFeed.title || 'Unknown Feed',
          url: url
        };
      } catch (parseError) {
        console.error(`Error parsing XML for ${url}:`, parseError);
        // Create a fallback empty feed
        return {
          title: name || 'Unknown Feed',
          description: `Unable to parse feed from ${url}`,
          link: url,
          items: [],
          name: name || 'Unknown Feed',
          url
        };
      }
    } catch (directFetchError) {
      console.error(`Direct fetch failed for ${url}:`, directFetchError);
      
      // If direct fetch fails, try the proxy approach as last resort
      try {
        // Using a more reliable CORS proxy
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const response = await Promise.race([
          fetch(proxyUrl, { 
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            cache: 'no-store'
          }),
          timeoutPromise
        ]) as Response;
        
        if (!response.ok) {
          throw new Error(`Proxy status code ${response.status}`);
        }
        
        const text = await response.text();
        
        // Skip empty responses
        if (!text || text.trim().length === 0) {
          throw new Error('Empty response from proxy');
        }
        
        // Try parsing with very lenient settings as a last resort
        const parserLenient = new Parser({
          customFields: {
            item: [
              ['content:encoded', 'fullContent'],
              ['description', 'description']
            ]
          },
          defaultRSS: 2.0,
          xml2js: {
            emptyTag: '',
            strict: false,
            normalize: true,
            normalizeTags: true,
            mergeAttrs: true,
            explicitArray: false
          }
        });
        
        // Further sanitize XML
        const sanitizedText = text
          .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;') // Fix unescaped ampersands
          .replace(/\<!\[CDATA\[\s*\<!\[CDATA\[/g, '<![CDATA[') // Fix nested CDATA sections
          .replace(/\]\]\>\s*\]\]\>/g, ']]>');
        
        try {
          const parsedFeed = await parserLenient.parseString(sanitizedText);
          
          // Check if parsedFeed or its items is undefined
          if (!parsedFeed || !parsedFeed.items) {
            // Create a fallback empty feed
            return {
              title: name || 'Unknown Feed',
              description: `Unable to parse feed from ${url}`,
              link: url,
              items: [],
              name: name || 'Unknown Feed',
              url
            };
          }
          
          // Convert parser output to our ParsedFeed type and limit to 6 items
          const feedItems = parsedFeed.items
            .slice(0, 6)
            .map(item => ({
              title: item.title || 'Untitled',
              link: item.link || url,
              pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
              isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
              fullContent: item.fullContent || item.content || item.description || '',
              content: item.content || item.description || '',
              contentSnippet: item.contentSnippet || '',
              description: item.description || ''
            } as FeedItem));
          
          return {
            title: parsedFeed.title || name || 'Unknown Feed',
            description: parsedFeed.description || `Feed from ${url}`,
            link: parsedFeed.link || url,
            items: feedItems,
            name: name || parsedFeed.title || 'Unknown Feed',
            url: url
          };
        } catch (parseError) {
          console.error(`Error parsing proxy XML for ${url}:`, parseError);
          // Create a fallback empty feed
          return {
            title: name || 'Unknown Feed',
            description: `Unable to parse feed from ${url}`,
            link: url,
            items: [],
            name: name || 'Unknown Feed',
            url
          };
        }
      } catch (proxyError) {
        console.error(`Proxy approach also failed for ${url}:`, proxyError);
        // Return a minimal valid feed object as a last resort
        return {
          title: name || 'Unknown Feed',
          description: `Unable to fetch feed from ${url}`,
          link: url,
          items: [],
          name: name || 'Unknown Feed',
          url
        };
      }
    }
  }
}

// Process feeds in parallel using Promise.all with a timeout for the entire batch
export async function processFeedBatch(feeds: FeedSource[]): Promise<ParsedFeed[]> {
  // Set a timeout for the entire batch process
  const batchTimeout = new Promise<ParsedFeed[]>((resolve) => {
    setTimeout(() => {
      console.warn(`Batch processing timed out for some feeds, returning partial results`);
      resolve([]); // Return empty results for timed out batch
    }, 45000); // Increased to 45 second timeout
  });
  
  // Process all feeds sequentially to avoid overwhelming resources
  const processFeeds = async (): Promise<ParsedFeed[]> => {
    const results: ParsedFeed[] = [];
    
    // Always process feeds sequentially to avoid overwhelming resources
    for (const feed of feeds) {
      try {
        // Add a small delay between fetches to avoid rate limiting
        if (results.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between fetches
        }
        
        const result = await fetchRSSFeed(feed);
        if (result && result.items) results.push(result);
      } catch (err) {
        console.error(`Failed to fetch feed from ${feed.url}:`, err);
        // Continue with other feeds but add a fallback empty feed
        results.push({
          title: feed.name || 'Unknown Feed',
          description: `Unable to fetch feed from ${feed.url}`,
          link: feed.url,
          items: [],
          name: feed.name || 'Unknown Feed',
          url: feed.url,
          category: feed.category
        });
      }
    }
    
    return results;
  };
  
  // Race the entire batch against a timeout
  const result = await Promise.race([
    processFeeds(),
    batchTimeout
  ]);
  
  // Always return at least an empty array, never undefined
  return result || [];
}