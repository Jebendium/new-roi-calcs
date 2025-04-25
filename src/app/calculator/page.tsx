'use client';

import React from 'react';
import { calculatorData } from '../../data/calculatorData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WizardShell } from '../../components/WizardShell';

// Define the calculators that are actually implemented and ready to use
const IMPLEMENTED_CALCULATORS = ['employer-ni', 'employee-savings', 'business-roi'];

export default function CalculatorIndexPage() {
  const router = useRouter();
  
  return (
    <WizardShell activeCalculator={null} onSelectCalculator={() => {}} onGoHome={() => router.push('/')}>
      <section id="calculators" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our ROI Calculators</h2>
            <p className="text-lg text-slate-600">
              Select a calculator to start analysing your benefits ROI. Each tool is designed
              to provide specific insights for UK-based businesses.
            </p>
          </div>
          
          {/* Calculators Grid - Updated Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorData.map((calc) => (
              <div 
                key={calc.type}
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Header with Gradient */}
                <div className={`p-6 bg-gradient-to-r ${calc.gradient} text-white`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: calc.iconSvg }} />
                    </div>
                    <h3 className="text-xl font-bold">{calc.title}</h3>
                  </div>
                  <p className="text-white/90">{calc.description}</p>
                </div>
                
                {/* Benefits List */}
                <div className="p-6 bg-slate-50 flex-grow">
                  <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4">
                    Benefits
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {calc.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Action Button */}
                  {IMPLEMENTED_CALCULATORS.includes(calc.type) ? (
                    <Link 
                      href={`/calculator/${calc.type}`}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 border text-center inline-block ${
                        calc.gradient.includes('blue') 
                          ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' 
                          : calc.gradient.includes('purple')
                            ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                            : calc.gradient.includes('green')
                              ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                              : calc.gradient.includes('orange')
                                ? 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      Use this calculator
                    </Link>
                  ) : (
                    <button 
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 border opacity-80 ${
                        calc.gradient.includes('blue') 
                          ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' 
                          : calc.gradient.includes('purple')
                            ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                            : calc.gradient.includes('green')
                              ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                              : calc.gradient.includes('orange')
                                ? 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                      onClick={() => alert('This calculator is coming soon!')}
                    >
                      Coming soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WizardShell>
  );
}