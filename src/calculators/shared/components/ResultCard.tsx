import React from 'react';
import { VariantType } from '../types';

export interface ResultCardProps {
  title: string;
  value: string | number;
  description?: string;
  variant?: VariantType;
}

export const ResultCard: React.FC<ResultCardProps> = ({ 
  title, 
  value, 
  description, 
  variant = 'primary' 
}) => {
  // Determine background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'danger': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'secondary': return 'bg-slate-50 border-slate-200';
      default: return 'bg-white border-slate-200';
    }
  };

  // Determine text color for value based on variant
  const getValueColor = () => {
    switch (variant) {
      case 'success': return 'text-green-700';
      case 'warning': return 'text-amber-700';
      case 'danger': return 'text-red-700';
      case 'info': return 'text-blue-700';
      case 'secondary': return 'text-slate-700';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className={`rounded-lg shadow-sm p-5 border ${getBgColor()}`}>
      <h3 className="text-sm font-semibold text-slate-700 mb-1">{title}</h3>
      <div className={`text-2xl font-bold mb-1 ${getValueColor()}`}>{value}</div>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
};
