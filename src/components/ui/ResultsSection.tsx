import React from 'react';

interface ResultsSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardized section component for results display
 * To be used across all calculators for consistent UI/UX
 */
const ResultsSection: React.FC<ResultsSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      
      {description && (
        <p className="text-sm text-slate-600 mb-4">{description}</p>
      )}
      
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
};

export default ResultsSection;