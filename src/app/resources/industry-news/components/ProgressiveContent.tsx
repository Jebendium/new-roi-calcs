import React from 'react';
import { PartialFeedResponse } from '../hooks/useNewsData';
import { TrendingTopics } from './TrendingTopics';
import { ArticleCard } from './ArticleCard';
import { formatDate } from '../utils/formatDate';

interface ProgressiveContentProps {
  partialData: PartialFeedResponse;
  onTopicClick: (topic: string) => void;
  expandedSummaries: {[key: string]: boolean};
  toggleSummaryExpansion: (articleId: string) => void;
}

export const ProgressiveContent: React.FC<ProgressiveContentProps> = ({ 
  partialData, 
  onTopicClick,
  expandedSummaries,
  toggleSummaryExpansion
}) => {
  // Check if we have topics to show
  const hasTopics = partialData.topics?.trendingTopics && partialData.topics.trendingTopics.length > 0;
  
  // Check if we have a summary to show
  const hasSummary = partialData.masterSummary && partialData.masterSummary.length > 0;
  
  // Check if we have any feeds to show
  const hasFeeds = partialData.feeds && partialData.feeds.length > 0;
  
  return (
    <div className="space-y-8">
      {/* Show loading indicator for still-loading sections */}
      {(!hasTopics || !hasSummary || !hasFeeds) && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Still loading content... showing what's available so far.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Executive Summary - if available */}
      {hasSummary && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Executive Summary: Industry Key Trends
          </h2>
          <div className="text-slate-700 prose max-w-none">
            {partialData.masterSummary}
          </div>
        </div>
      )}
      
      {/* Trending Topics - if available */}
      {hasTopics && (
        <TrendingTopics 
          topics={partialData.topics!.trendingTopics} 
          onTopicClick={onTopicClick}
        />
      )}
      
      {/* Available Article Categories */}
      {hasFeeds && partialData.feeds.map(feed => (
        <div key={feed.category} className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
            {feed.category} <span className="text-slate-500 text-sm font-normal">({feed.items.length} articles)</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feed.items.map((article, index) => (
              <ArticleCard 
                key={index}
                article={article}
                isExpanded={!!expandedSummaries[article.link]}
                onToggleExpand={() => toggleSummaryExpansion(article.link)}
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
