'use client';

import React from 'react';
import { CalculatorType } from '../../types/calculator';
import { calculatorData } from '../../data/calculatorData';
import Link from 'next/link';

// Define the calculators that are actually implemented and ready to use
const IMPLEMENTED_CALCULATORS = ['employer-ni', 'employee-savings', 'business-roi', 'combined-payroll', 'holiday-trading', 'p11d-ev-car'];

interface CalculatorsGridProps {
  onSelectCalculator: (calculatorType: CalculatorType) => void;
}

const CalculatorsGrid: React.FC<CalculatorsGridProps> = ({ onSelectCalculator }) => {
  return (
    <section id="calculators" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Our ROI Calculators</h2>
          <p className="text-lg text-slate-600">
            Select a calculator to start analysing your benefits ROI. Each tool is designed to provide
            specific insights for UK-based businesses.
          </p>
        </div>
        
        {/* Calculators Grid - Updated Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorData.map((calc) => (
            <div 
              key={calc.type}
              className="calculator-card"
            >
              {/* Header with Gradient */}
              <div className={`calculator-card-header bg-gradient-to-r ${calc.gradient} text-white`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: calc.iconSvg }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{calc.title}</h3>
                </div>
                <p className="text-white/90">{calc.description}</p>
              </div>
              
              {/* Benefits List */}
              <div className="calculator-card-content bg-slate-50 flex flex-col rounded-b-xl border-t-0 border border-slate-200 overflow-hidden">
                <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4">
                  Benefits
                </h4>
                <ul className="space-y-3 mb-6 flex-grow">
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
                <div className="calculator-card-footer">
                  <Link 
                    href={`/calculator/${calc.type}`}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 border block text-center ${
                      calc.gradient.includes('blue') 
                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' 
                        : calc.gradient.includes('purple')
                          ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                          : calc.gradient.includes('green')
                            ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                            : calc.gradient.includes('cyan')
                              ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border-cyan-200'
                              : calc.gradient.includes('indigo')
                                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                                : calc.gradient.includes('rose')
                                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Use this calculator
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalculatorsGrid;