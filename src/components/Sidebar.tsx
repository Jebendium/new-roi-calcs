'use client';

import React from 'react';
import { CalculatorType } from '../types/calculator';
import { calculatorData } from '../data/calculatorData';

interface SidebarProps {
  activeCalculator: CalculatorType | null;
  onSelectCalculator: (calculatorType: CalculatorType) => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeCalculator, 
  onSelectCalculator, 
  onGoHome 
}) => (
  <aside className="fixed md:relative left-0 top-0 w-full md:w-64 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white flex flex-col h-screen shadow-xl z-10 transition-all duration-300">
    {/* Logo and Title - Consistent spacing and alignment */}
    <div className="flex items-center px-6 py-5 border-b border-white/10" onClick={onGoHome}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mr-3">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21V12M12 12L8 16M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold font-display">ROI Calculator</h2>
    </div>
    
    {/* Home Button - Consistent styling */}
    <div className="px-4 py-4">
      <button 
        onClick={onGoHome} 
        className="w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 bg-white/10 hover:bg-white/20"
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-medium">Home</span>
      </button>
    </div>
    
    {/* Calculator Section Header - Improved spacing */}
    <div className="px-6 py-2">
      <div className="text-sm uppercase font-semibold text-blue-100 tracking-wider">Calculators</div>
    </div>
    
    {/* Navigation Links - Consistent sizing and spacing */}
    <nav className="flex-1 px-4 overflow-y-auto">
      <div className="space-y-2 py-2">
        {calculatorData.map(calc => (
          <button
            key={calc.type}
            onClick={() => onSelectCalculator(calc.type as CalculatorType)}
            className={`group w-full flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
              activeCalculator === calc.type
                ? 'bg-white/20 text-white font-medium' 
                : 'hover:bg-white/10'
            }`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${calc.gradient} mr-3 shadow-sm transition-transform group-hover:scale-110`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: calc.iconSvg }} />
            </div>
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{calc.title.replace(' Calculator', '')}</span>
          </button>
        ))}
      </div>
    </nav>
    
    {/* Footer - Clean border and padding */}
    <div className="mt-auto p-4 border-t border-white/10">
      <div className="text-xs text-blue-100 opacity-70 text-center">
        © 2025 Employee Benefits ROI Suite
      </div>
    </div>
  </aside>
);
