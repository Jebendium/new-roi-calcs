import React from 'react';
import { Article } from '../types';

// Function to generate a sentiment badge based on sentiment and score
function getSentimentBadge(sentiment: string, score: number) {
  let bgColor, textColor, label;
  
  switch (sentiment) {
    case 'positive':
      bgColor = 'bg-green-50';
      textColor = 'text-green-700';
      label = 'Positive';
      break;
    case 'negative':
      bgColor = 'bg-red-50';
      textColor = 'text-red-700';
      label = 'Negative';
      break;
    default:
      bgColor = 'bg-slate-50';
      textColor = 'text-slate-700';
      label = 'Neutral';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
}

interface ArticleCardProps {
  article: Article;
  isExpanded: boolean;
  onToggleExpand: () => void;
  formatDate: (date: string) => string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  isExpanded, 
  onToggleExpand,
  formatDate 
}) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Source and Sentiment */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
            {article.source}
          </span>
          
          {getSentimentBadge(article.sentiment, article.sentimentScore)}
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
          isExpanded ? 'bg-blue-50 p-4 rounded-md mb-4' : 'bg-blue-50 p-4 rounded-md mb-4 max-h-40 overflow-hidden relative'
        }`}>
          <h4 className="font-medium text-blue-800 mb-2">AI Summary</h4>
          <p className="text-slate-700">
            {article.summary}
          </p>
          
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-50 to-transparent"></div>
          )}
        </div>
        
        {/* Topics Tags */}
        {article.topics && article.topics.length > 0 && (
          <div className="mb-4">
            {article.topics.map((topic, i) => (
              <span key={i} className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                #{topic}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex justify-between">
          <button
            onClick={onToggleExpand}
            className="text-sm text-slate-600 hover:text-blue-600"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
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
    </article>
  );
};
