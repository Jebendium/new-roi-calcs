import React from 'react';

interface ResultHighlightProps {
  title: string;
  value: string | number;
  description?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'info';
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Result highlight component for displaying key metrics
 * Used in calculator results sections to emphasize important values
 */
const ResultHighlight: React.FC<ResultHighlightProps> = ({
  title,
  value,
  description,
  variant = 'primary',
  className = '',
  icon
}) => {
  const variantStyles = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-white border border-slate-200 text-slate-800',
    success: 'bg-green-600 text-white',
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
  };

  const valueColor = {
    primary: 'text-white',
    secondary: 'text-slate-800',
    success: 'text-white',
    info: 'text-blue-800',
  };

  return (
    <div
      className={`rounded-lg p-4 shadow-sm ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start">
        {icon && <div className="mr-3 mt-1">{icon}</div>}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1 opacity-90">{title}</h3>
          <div className={`text-2xl font-bold ${valueColor[variant]}`}>
            {value}
          </div>
          {description && (
            <p className={`text-xs mt-1 ${variant === 'secondary' ? 'text-slate-500' : 'opacity-80'}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultHighlight;