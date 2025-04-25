'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WizardShell } from '../../../components/WizardShell';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  summary: string;
  source: string;
}

interface Feed {
  title: string;
  description: string;
  link: string;
  items: FeedItem[];
}

interface FeedResponse {
  feeds: Feed[];
  masterSummary: string;
  timestamp: string;
}

export default function NewsPage() {
  const router = useRouter();
  const [feedResponse, setFeedResponse] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  
  // Use this to track which articles have their summaries expanded
  const [expandedSummaries, setExpandedSummaries] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    async function fetchFeeds() {
      try {
        setLoading(true);
        const response = await fetch('/api/rss');
        
        if (!response.ok) {
          throw new Error('Failed to fetch feeds');
        }
        
        const data = await response.json();
        setFeedResponse(data);
        
        // If we have feeds, set the first one as active by default
        if (data.feeds && data.feeds.length > 0) {
          setActiveSource(data.feeds[0].title);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load feeds. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchFeeds();
  }, []);

  // Format publication date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return 'Date unavailable';
    }
  };
  
  // Toggle summary expansion
  const toggleSummaryExpansion = (articleId: string) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };
  
  // Get all articles across all feeds
  const getAllArticles = () => {
    if (!feedResponse || !feedResponse.feeds) return [];
    
    return feedResponse.feeds.flatMap(feed => 
      feed.items.map(item => ({
        ...item,
        feedTitle: feed.title
      }))
    ).sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
  };
  
  // Get filtered articles based on active source
  const getFilteredArticles = () => {
    if (!activeSource || activeSource === 'All Sources') {
      return getAllArticles();
    }
    
    return getAllArticles().filter(article => article.feedTitle === activeSource);
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
          
          {/* Last updated timestamp */}
          {feedResponse && feedResponse.timestamp && (
            <p className="text-sm text-slate-500 italic mb-2">
              Last updated: {formatDate(feedResponse.timestamp)}
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

        {!loading && !error && (!feedResponse || !feedResponse.feeds || feedResponse.feeds.length === 0) && (
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

        {!loading && !error && feedResponse && feedResponse.feeds && feedResponse.feeds.length > 0 && (
          <>
            {/* Master Summary Section */}
            {feedResponse.masterSummary && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-8">
                <h2 className="text-xl font-bold text-blue-800 mb-3">
                  <svg className="inline-block w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Executive Summary: Industry Key Trends
                </h2>
                <div className="text-slate-700 prose max-w-none">
                  {feedResponse.masterSummary}
                </div>
              </div>
            )}
            
            {/* Source Filter Tabs */}
            <div className="mb-6 flex flex-wrap overflow-x-auto pb-1">
              <button
                onClick={() => setActiveSource('All Sources')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 whitespace-nowrap mr-2 mb-2 ${
                  activeSource === 'All Sources' ? 
                  'border-blue-500 bg-blue-50 text-blue-700' : 
                  'border-transparent hover:border-slate-300 text-slate-600 hover:text-slate-800'
                }`}
              >
                All Sources
              </button>
              
              {feedResponse.feeds.map((feed, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSource(feed.title)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 whitespace-nowrap mr-2 mb-2 ${
                    activeSource === feed.title ? 
                    'border-blue-500 bg-blue-50 text-blue-700' : 
                    'border-transparent hover:border-slate-300 text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {feed.title}
                </button>
              ))}
            </div>
            
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getFilteredArticles().map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    {/* Source Label */}
                    <div className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wider">
                      {article.source || article.feedTitle}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                      <a 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </h3>
                    
                    <p className="text-sm text-slate-500 mb-4">
                      Published on {formatDate(article.pubDate)}
                    </p>
                    
                    <div className={`${
                      expandedSummaries[article.link] ? 'bg-blue-50 p-4 rounded-md mb-4' : 'bg-blue-50 p-4 rounded-md mb-4 max-h-40 overflow-hidden relative'
                    }`}>
                      <h4 className="font-medium text-blue-800 mb-2">AI Summary</h4>
                      <p className="text-slate-700">
                        {article.summary}
                      </p>
                      
                      {!expandedSummaries[article.link] && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-50 to-transparent"></div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => toggleSummaryExpansion(article.link)}
                        className="text-sm text-slate-600 hover:text-blue-600"
                      >
                        {expandedSummaries[article.link] ? 'Show Less' : 'Show More'}
                      </button>
                      
                      <a 
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Read full article
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </WizardShell>
  );
}
