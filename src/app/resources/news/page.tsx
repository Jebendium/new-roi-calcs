'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WizardShell } from '../../../components/WizardShell';

// Updated interfaces to match enhanced-rss/types.ts
interface ProcessedArticle {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  summary: string;
  sentiment: string;
  sentimentScore: number;
  source: string; // This is the original feed name
  category: string;
  topics?: string[];
}

interface FeedCategory {
  title: string;
  description: string;
  sources: string[]; // Names of original feeds in this category
  items: ProcessedArticle[];
}

interface FeedCategoryMap {
  [category: string]: FeedCategory;
}

interface EnhancedFeedResponse {
  feedsByCategory: FeedCategoryMap;
  allArticles: ProcessedArticle[]; // All articles, already sorted by date
  trendingTopics: { topic: string; count: number }[];
  masterSummary: string;
  timestamp: string;
}

export default function NewsPage() {
  const router = useRouter();
  // State to hold the new EnhancedFeedResponse structure
  const [enhancedFeedResponse, setEnhancedFeedResponse] = useState<EnhancedFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // activeSource will now refer to a category title or "All Categories"
  const [activeCategory, setActiveCategory] = useState<string | null>('All Categories');
  
  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  
  const [expandedSummaries, setExpandedSummaries] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    async function fetchEnhancedFeeds() {
      try {
        setLoading(true);
        // Update API endpoint to /api/enhanced-rss
        const response = await fetch('/api/enhanced-rss'); 
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch enhanced feeds');
        }
        
        const data: EnhancedFeedResponse = await response.json();
        setEnhancedFeedResponse(data);
        
        // setActiveCategory is already defaulted to 'All Categories'
      } catch (err) {
        console.error('Error fetching enhanced feeds:', err);
        setError(err instanceof Error ? err.message : 'Failed to load feeds. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEnhancedFeeds();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return 'Date unavailable';
    }
  };
  
  const toggleSummaryExpansion = (articleLink: string) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [articleLink]: !prev[articleLink]
    }));
  };
  
  const getFilteredArticles = (): ProcessedArticle[] => {
    if (!enhancedFeedResponse) return [];
    if (!activeCategory || activeCategory === 'All Categories') {
      return enhancedFeedResponse.allArticles || [];
    }
    return (enhancedFeedResponse.allArticles || []).filter(article => article.category === activeCategory);
  };

  const getPaginatedArticles = () => {
    const filteredArticles = getFilteredArticles();
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  };

  const getTotalPages = () => {
    const filteredArticles = getFilteredArticles();
    return Math.ceil(filteredArticles.length / articlesPerPage);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, getTotalPages())));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, articlesPerPage]);

  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };

  const getSafeISOString = (dateStr: string | null | undefined): string | undefined => {
    if (!dateStr) return undefined;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return undefined; // Check if date is Invalid Date
      return date.toISOString();
    } catch {
      return undefined;
    }
  };

  return (
    <WizardShell
      activeCalculator={null}
      onSelectCalculator={(calculatorType) => router.push(`/calculator/${calculatorType}`)}
      onGoHome={() => router.push('/')}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link 
            href="/resources"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Resources
          </Link>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Industry News</h1>
          <p className="text-lg text-slate-600 mb-6">
            Stay informed with the latest news and developments in HR, employee benefits, and payroll.
            Our AI provides summaries to help you quickly understand the key points.
          </p>
          
          {enhancedFeedResponse && enhancedFeedResponse.timestamp && (
            <p className="text-sm text-slate-500 italic mb-2">
              Last updated: {formatDate(enhancedFeedResponse.timestamp)}
            </p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (!enhancedFeedResponse || !enhancedFeedResponse.allArticles || enhancedFeedResponse.allArticles.length === 0) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">No feeds available at the moment. Please check back later.</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && enhancedFeedResponse && enhancedFeedResponse.allArticles && enhancedFeedResponse.allArticles.length > 0 && (
          <>
            {enhancedFeedResponse.masterSummary && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-8">
                <h2 className="text-xl font-bold text-blue-800 mb-3">
                  <svg className="inline-block w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Executive Summary: Industry Key Trends
                </h2>
                <div className="text-slate-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: enhancedFeedResponse.masterSummary.replace(/\\n/g, '<br />') }}>
                </div>
              </div>
            )}
            {/* Category Filter Tabs */}
            <div className="mb-6 overflow-x-auto" role="tablist" aria-label="Filter news by category">
              <div className="flex flex-wrap pb-1">
                <button
                  onClick={() => setActiveCategory('All Categories')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 whitespace-nowrap mr-2 mb-2 ${
                    activeCategory === 'All Categories' ? 
                    'border-blue-500 bg-blue-50 text-blue-700' : 
                    'border-transparent hover:border-slate-300 text-slate-600 hover:text-slate-800'
                  }`}
                  role="tab"
                  aria-selected={activeCategory === 'All Categories'}
                  aria-controls="all-categories-panel"
                  id="all-categories-tab"
                >
                  All Categories
                </button>
                
                {enhancedFeedResponse.feedsByCategory && Object.keys(enhancedFeedResponse.feedsByCategory).map((categoryKey) => {
                  const category = enhancedFeedResponse.feedsByCategory[categoryKey];
                  return (
                    <button
                      key={categoryKey}
                      onClick={() => setActiveCategory(categoryKey)}
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 whitespace-nowrap mr-2 mb-2 ${
                        activeCategory === categoryKey ? 
                        'border-blue-500 bg-blue-50 text-blue-700' : 
                        'border-transparent hover:border-slate-300 text-slate-600 hover:text-slate-800'
                      }`}
                      role="tab"
                      aria-selected={activeCategory === categoryKey}
                      aria-controls={`${categoryKey.toLowerCase().replace(/\s/g, '-')}-panel`}
                      id={`${categoryKey.toLowerCase().replace(/\s/g, '-')}-tab`}
                    >
                      {category.title}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <div className="text-sm text-slate-500" aria-live="polite">
                Showing {getFilteredArticles().length > 0 ? 
                  `${(currentPage - 1) * articlesPerPage + 1}-${Math.min(currentPage * articlesPerPage, getFilteredArticles().length)} of ${getFilteredArticles().length}` : 
                  '0'} articles
              </div>
              <div className="flex items-center">
                <label htmlFor="articlesPerPage" className="text-sm text-slate-500 mr-2">Show per page:</label>
                <select 
                  id="articlesPerPage"
                  value={articlesPerPage}
                  onChange={(e) => {
                    setArticlesPerPage(Number(e.target.value));
                  }}
                  className="text-sm border border-slate-300 rounded-md px-2 py-1"
                  aria-label="Number of articles per page"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" 
              role="tabpanel"
              id={activeCategory ? `${activeCategory.toLowerCase().replace(/\s/g, '-')}-panel` : 'all-categories-panel'}
              aria-labelledby={activeCategory ? `${activeCategory.toLowerCase().replace(/\s/g, '-')}-tab` : 'all-categories-tab'}
            >
              {getPaginatedArticles().map((article) => (
                <article key={article.link} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wider">
                      Source: {article.source}
                    </div>
                    <div className="text-xs font-medium text-purple-600 mb-2 uppercase tracking-wider">
                      Category: {article.category}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      <a 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {article.title}
                      </a>
                    </h3>
                    
                    <p className="text-sm text-slate-500 mb-4">
                      <time dateTime={getSafeISOString(article.pubDate)}>
                        Published on {formatDate(article.pubDate)}
                      </time>
                    </p>
                    
                    <div 
                      className={`bg-blue-50 p-4 rounded-md mb-4 ${
                        expandedSummaries[article.link] ? '' : 'max-h-40 overflow-hidden relative'
                      }`}
                      aria-expanded={!!expandedSummaries[article.link]}
                    >
                      <h4 className="font-medium text-blue-800 mb-2">AI Summary</h4>
                      <div className="text-slate-700 prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: (article.summary || '').replace(/\\n/g, '<br />') }} />
                      
                      {!expandedSummaries[article.link] && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-50 to-transparent" aria-hidden="true"></div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => toggleSummaryExpansion(article.link)}
                        className="text-sm text-slate-600 hover:text-blue-600"
                        aria-controls={`summary-${article.link}`}
                        aria-expanded={!!expandedSummaries[article.link]}
                      >
                        {expandedSummaries[article.link] ? 'Show Less' : 'Show More'}
                      </button>
                      
                      <a 
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                        aria-label={`Read full article: ${article.title}`}
                      >
                        Read full article
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {getTotalPages() > 1 && (
              <div className="flex justify-center mt-8">
                <nav 
                  className="flex items-center space-x-1" 
                  aria-label="Pagination"
                  role="navigation"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    aria-label="Previous page"
                    aria-disabled={currentPage === 1}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {getPageNumbers().map((pageNum, index) => (
                    <React.Fragment key={index}>
                      {pageNum === '...' ? (
                        <span className="px-3 py-2 text-sm text-slate-500" aria-hidden="true">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(pageNum as number)}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                          aria-label={`Page ${pageNum}`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === getTotalPages()}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === getTotalPages()
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    aria-label="Next page"
                    aria-disabled={currentPage === getTotalPages()}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
            {getFilteredArticles().length === 0 && (
              <div 
                className="bg-blue-50 border-l-4 border-blue-500 p-4 text-center my-8" 
                role="alert"
                aria-live="polite"
              >
                <p className="text-blue-700">No articles found for this category. Try selecting a different category.</p>
              </div>
            )}
          </>
        )}
        
        {/* MediaStack Attribution */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            News data powered by <a href="https://mediastack.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">mediastack.com</a>
          </p>
        </div>
      </div>
    </WizardShell>
  );
}
