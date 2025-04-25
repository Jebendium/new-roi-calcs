'use client';

import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                <span className="text-yellow-300">ROI Calculator</span> for Employee Benefits
              </h1>
              
              <p className="text-xl text-white mb-8 leading-relaxed">
                Make data-driven decisions with our comprehensive suite of tools to calculate the real value and return on investment for UK employee benefits and HR systems.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  Explore Calculators
                </button>
                <button className="px-6 py-3 border border-yellow-200 text-yellow-200 hover:bg-yellow-50 font-medium rounded-lg shadow-sm hover:shadow-md transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Features */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-gradient-to-br from-blue-700/60 to-blue-600/30 rounded-2xl shadow-md p-8 border border-blue-200 w-full">
              <h2 className="text-2xl font-bold text-white mb-6">Make data-driven decisions</h2>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-blue-900 mr-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Calculate employer NI contributions</h3>
                    <p className="text-blue-100">Get accurate calculations of employer National Insurance savings</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-blue-900 mr-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15c0 3.314-4.03 6-9 6-4.97 0-9-2.686-9-6" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 6.5C3 9.538 7.03 12 12 12s9-2.462 9-5.5S16.97 1 12 1 3 3.462 3 6.5z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 10c0 3.314-4.03 6-9 6-4.97 0-9-2.686-9-6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Demonstrate benefits value</h3>
                    <p className="text-blue-100">Show the true value of employee benefits packages</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-blue-900 mr-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Calculate ROI and payback</h3>
                    <p className="text-blue-100">Determine ROI and payback periods for HR systems</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
