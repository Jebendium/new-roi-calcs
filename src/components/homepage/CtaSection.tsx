'use client';

import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to calculate your employee benefits ROI?
      </h2>
      <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
        Start using our calculator suite today to make data-driven decisions about your 
        employee benefits strategy.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 rounded-lg shadow-lg font-medium transition-all"
        >
          Get Started
        </button>
        <button className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-lg shadow-lg font-medium transition-all">
          Learn More
        </button>
      </div>
      
      {/* Trust Badges */}
      <div className="mt-16 py-8 border-t border-white/20">
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>HMRC Compliant</span>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Secure Calculations</span>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Detailed Reports</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
