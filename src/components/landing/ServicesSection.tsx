'use client';

import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative flex items-center">
            <div className="bg-blue-50 aspect-[4/3] w-full rounded-lg overflow-hidden shadow-sm">
              <img 
                src="/images/middlesection.jpg" 
                alt="Benefits consulting meeting" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
              Our Benefits Sourcing & Advisory Service
            </h2>
            
            <p className="text-lg text-slate-600 mb-8">
              We use deep market knowledge to help you identify the best salary sacrifice benefit providers and design schemes tailored to your needs. From NIC savings analysis to supplier recommendations and compliance support, we simplify your benefits journey and help you deliver real value to employees.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-slate-700">Independent provider recommendations based on your business</span>
              </li>
              
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-slate-700">Custom NIC savings calculations and scheme suitability advice</span>
              </li>
              
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-slate-700">Guidance on onboarding and working with providers</span>
              </li>
              
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-slate-700">Staff communications templates to engage employees</span>
              </li>
              
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-slate-700">Ongoing compliance tips and optional admin support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;