import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'active' | 'inactive' | 'highlight';
}

/**
 * Standard Card component for consistent card styling across calculators
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'bg-white border border-slate-200',
    active: 'bg-white border border-blue-500',
    inactive: 'bg-slate-50 border border-slate-200 opacity-75',
    highlight: 'bg-blue-50 border border-blue-200'
  };

  return (
    <div className={`rounded-lg shadow-sm p-4 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;