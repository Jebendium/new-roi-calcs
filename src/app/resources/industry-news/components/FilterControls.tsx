import React from 'react';

interface FilterControlsProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  activeSentiment: string | null;
  setActiveSentiment: (sentiment: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: boolean;
  setViewMode: (mode: boolean) => void;
  categories: string[];
  setCurrentPage: (page: number) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  activeCategory,
  setActiveCategory,
  activeSentiment,
  setActiveSentiment,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  categories,
  setCurrentPage
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 mb-2 md:mb-0">Filter Articles</h3>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600">View by:</span>
          <button
            onClick={() => setViewMode(true)}
            className={`px-3 py-1 text-sm rounded ${viewMode ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Category
          </button>
          <button
            onClick={() => setViewMode(false)}
            className={`px-3 py-1 text-sm rounded ${!viewMode ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Topic
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={activeCategory || 'All Categories'}
            onChange={(e) => {
              setActiveCategory(e.target.value === 'All Categories' ? null : e.target.value);
              setCurrentPage(1); // Reset to first page when changing category
            }}
            className="w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sentiment Filter */}
        <div>
          <label htmlFor="sentiment-filter" className="block text-sm font-medium text-slate-700 mb-1">
            Sentiment
          </label>
          <select
            id="sentiment-filter"
            value={activeSentiment || 'All Sentiments'}
            onChange={(e) => {
              setActiveSentiment(e.target.value === 'All Sentiments' ? null : e.target.value);
              setCurrentPage(1); // Reset to first page when changing sentiment
            }}
            className="w-full rounded-md border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Sentiments">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
        
        {/* Search Filter */}
        <div>
          <label htmlFor="search-filter" className="block text-sm font-medium text-slate-700 mb-1">
            Search
          </label>
          <div className="relative">
            <input
              id="search-filter"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              placeholder="Search articles..."
              className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
