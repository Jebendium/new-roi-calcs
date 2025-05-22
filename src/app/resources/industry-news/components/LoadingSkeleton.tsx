import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Skeleton for Master Summary */}
      <div className="bg-slate-100 rounded-xl p-6 mb-8">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-3"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
      
      {/* Skeleton for Trending Topics */}
      <div className="bg-slate-100 rounded-lg p-6 mb-6">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-slate-200 rounded-full w-24"></div>
          ))}
        </div>
      </div>
      
      {/* Skeleton for Filters */}
      <div className="bg-slate-100 rounded-lg p-4 mb-6">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Skeleton for Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-100 rounded-lg p-6">
            <div className="flex justify-between mb-3">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/6"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-32 bg-slate-200 rounded mb-4"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-slate-200 rounded w-1/6"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
