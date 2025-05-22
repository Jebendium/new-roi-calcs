import React from 'react';
import { TopicItem } from '../types';

interface TrendingTopicsProps {
  topics: TopicItem[];
  onTopicClick: (topic: string) => void;
}

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics, onTopicClick }) => {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.67) return 'text-green-600';
    if (sentiment < 0.33) return 'text-red-600';
    return 'text-slate-600';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
        Trending Topics
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {topics.slice(0, 10).map((topic, index) => (
          <button 
            key={index} 
            onClick={() => onTopicClick(topic.name)}
            className="flex items-center px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors duration-200 cursor-pointer"
            aria-label={`Search for ${topic.name}`}
          >
            <span className={`text-sm font-medium ${getSentimentColor(topic.sentiment)}`}>
              #{topic.name}
            </span>
            <span className="ml-1 text-xs text-slate-500">({topic.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};