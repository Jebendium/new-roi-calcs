import React from 'react';

interface BenefitCardProps {
  title: string;
  description?: string;
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  tooltip?: string;
  tooltipIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardized card component for benefit configuration
 * To be used across all calculators for consistent UI/UX
 */
const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  isEnabled,
  onToggle,
  tooltip,
  tooltipIcon,
  children,
  className = '',
}) => {
  return (
    <div
      className={`border rounded-lg p-4 shadow-sm transition-all ${
        isEnabled 
          ? 'border-blue-500 bg-white' 
          : 'border-slate-200 bg-slate-50 opacity-75'
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => onToggle(e.target.checked)}
              className="accent-blue-600 w-4 h-4"
            />
            <span className="font-medium text-slate-800">{title}</span>
          </label>
          
          {tooltip && tooltipIcon && (
            <div className="ml-2">
              {tooltipIcon}
            </div>
          )}
        </div>
      </div>
      
      {description && (
        <p className="text-sm text-slate-600 mb-3">{description}</p>
      )}
      
      <div className={isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
        {children}
      </div>
    </div>
  );
};

export default BenefitCard;