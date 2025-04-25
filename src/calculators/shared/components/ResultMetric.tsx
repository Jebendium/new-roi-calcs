import React from 'react';

interface ResultMetricProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
}

/**
 * ResultMetric - Displays a single metric with label and optional trend indicator
 * 
 * Used for showing individual calculation results within result cards
 */
export const ResultMetric: React.FC<ResultMetricProps> = ({
  label,
  value,
  trend,
  trendLabel
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const trendClasses = {
      up: 'text-green-500',
      down: 'text-red-500',
      neutral: 'text-slate-400'
    };
    
    return (
      <span className={`inline-flex items-center ml-2 ${trendClasses[trend]}`}>
        {trend === 'up' && (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        )}
        {trend === 'down' && (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {trendLabel && <span className="text-xs ml-1">{trendLabel}</span>}
      </span>
    );
  };
  
  return (
    <div className="flex justify-between items-baseline mb-1">
      <dt className="text-sm font-medium text-slate-600">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900 flex items-center">
        {value}
        {getTrendIcon()}
      </dd>
    </div>
  );
};

export default ResultMetric;