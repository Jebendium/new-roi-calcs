'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Import separate tab components
import { OverviewTab } from './components/OverviewTab';
import { InputCategoriesTab } from './components/InputCategoriesTab';
import { CalculationMethodTab } from './components/CalculationMethodTab';
import { InterpretingResultsTab } from './components/InterpretingResultsTab';
import { IndustryBenchmarksTab } from './components/IndustryBenchmarksTab';

/**
 * HRIS ROI Calculation Methodology Page
 * Explains how the HRIS ROI Calculator works
 */
export default function HRISMethodologyPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Overview' },
    { id: 1, label: 'Input Categories' },
    { id: 2, label: 'Calculation Method' },
    { id: 3, label: 'Interpreting Results' },
    { id: 4, label: 'Industry Benchmarks' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow p-6 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <Link 
              href="/calculator/business-roi" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2 md:mb-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Calculator
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">How Does the HRIS ROI Calculator Work?</h1>
          </div>
        </div>

        <p className="text-slate-600 mb-6">
          This page explains the methodology behind the HRIS ROI Calculator, including how inputs are used,
          how calculations are performed, and how to interpret the results to make informed HR technology decisions.
        </p>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-6 -mb-px border-b-2 font-medium transition-all duration-200 focus:outline-none ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-blue-600 hover:border-blue-200 bg-slate-50'
              }`}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-4">
          {activeTab === 0 && <OverviewTab />}
          {activeTab === 1 && <InputCategoriesTab />}
          {activeTab === 2 && <CalculationMethodTab />}
          {activeTab === 3 && <InterpretingResultsTab />}
          {activeTab === 4 && <IndustryBenchmarksTab />}
        </div>
      </div>
    </div>
  );
}
