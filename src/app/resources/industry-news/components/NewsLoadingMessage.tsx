import React from 'react';

interface NewsLoadingMessageProps {
  progress: number;
  stage: string;
}

export const NewsLoadingMessage: React.FC<NewsLoadingMessageProps> = ({ progress, stage }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto my-8">
      <div className="text-center">
        <div className="mb-4">
          <svg 
            className="w-16 h-16 mx-auto text-blue-500 animate-pulse" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Gathering Industry News</h2>
        
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          We're busy scouring a variety of Employee Benefits, HR & Payroll sources to bring you the most important news and useful summaries. This can take a minute or two, so please bear with us.
        </p>
        
        <div className="mb-3">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-sm text-slate-500 italic">{stage}</p>
        
        <div className="mt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full mb-2 ${progress >= (i + 1) * 33 ? 'bg-blue-500 animate-none' : 'bg-slate-200 animate-pulse'}`}></div>
              <span className={`text-xs ${progress >= (i + 1) * 33 ? 'text-blue-500 font-medium' : 'text-slate-400'}`}>
                {i === 0 ? 'Topics' : i === 1 ? 'Summary' : 'Articles'}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Content will appear as it becomes available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
