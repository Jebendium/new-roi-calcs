'use client';

import React, { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';
import { CalculatorType } from '../types/calculator';

interface WizardShellProps {
  activeCalculator: CalculatorType | null;
  onSelectCalculator: (calculatorType: CalculatorType) => void;
  onGoHome: () => void;
  children: ReactNode;
}

export const WizardShell: React.FC<WizardShellProps> = ({ 
  activeCalculator, 
  onSelectCalculator, 
  onGoHome, 
  children 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <TopNavigation 
        activeCalculator={activeCalculator}
        onSelectCalculator={onSelectCalculator}
        onGoHome={onGoHome}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 flex items-center">
              <img 
                src="/images/main-logo-transparent.svg" 
                alt="Company Logo" 
                className="h-[175px] w-auto mr-3"
              />
              <p className="text-sm text-slate-500">© 2025 All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
