'use client';

import React, { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';

interface PageShellProps {
  children: ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <TopNavigation 
        activeCalculator={null}
        onGoHome={() => {}}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Colwell Benefits Consulting</h3>
              <p className="text-slate-600 mb-4">
                Expert employee benefits sourcing and advisory services for UK businesses and payroll bureaus. Helping you simplify benefits, save on NICs, and stay compliant.
              </p>
              <p className="text-slate-500 text-sm">© 2025 Colwell Benefits Consulting. All rights reserved.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-800 mb-4">Contact</h4>
              <address className="not-italic">
                <p className="text-slate-600 mb-2">123 Business Street</p>
                <p className="text-slate-600 mb-2">London, SW1A 1AA</p>
                <p className="text-slate-600 mb-2">info@colwellbenefits.co.uk</p>
                <p className="text-slate-600">020 1234 5678</p>
              </address>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-800 mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="/privacy-policy" className="text-slate-600 hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-slate-600 hover:text-blue-600">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="text-slate-600 hover:text-blue-600">Cookie Policy</a></li>
              </ul>
              <div className="mt-6 text-xs text-slate-500">
                <p>This website is for informational purposes only. Colwell Benefits Consulting does not provide financial advice. Always consult with appropriate professionals regarding your specific circumstances.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageShell;