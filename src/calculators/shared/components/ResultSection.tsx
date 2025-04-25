import React from 'react';

export interface ResultSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  );
};
