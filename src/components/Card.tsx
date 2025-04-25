'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
  animateIn?: boolean;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  animateIn = false,
  icon
}) => (
  <div className={`card bg-white rounded-xl shadow-card p-6 mb-6 w-full ${animateIn ? 'animate-slide-up' : ''} ${className}`}>
    <div className="flex items-start mb-4">
      {icon && <div className="mr-3">{icon}</div>}
      <h3 className="text-xl font-semibold text-charcoal-700">{title}</h3>
    </div>
    <div className="mt-4">{children}</div>
  </div>
);
