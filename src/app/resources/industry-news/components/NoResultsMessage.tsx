import React from 'react';

export const NoResultsMessage = () => {
  return (
    <div className="bg-slate-50 rounded-lg p-8 text-center">
      <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-slate-900">No articles match your filters</h3>
      <p className="mt-1 text-slate-500">Try adjusting your search or filter criteria.</p>
    </div>
  );
};
