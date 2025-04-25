'use client';

import React from 'react';

export const OverviewTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Purpose of the Calculator</h2>
      <p className="text-slate-600 mb-4">
        The HRIS ROI Calculator helps organisations evaluate the potential return on investment when implementing a Human Resource Information System. Unlike traditional ROI calculations that focus solely on direct cost savings, this calculator captures broader benefits including:
      </p>
      <ul className="space-y-4 mb-6">
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Operational Efficiency</h3>
            <p className="text-slate-600">Quantify time savings across various HR activities including administration, data entry, reporting, and query handling</p>
          </div>
        </li>
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Data Accuracy Benefits</h3>
            <p className="text-slate-600">Calculate savings from reduced errors and improved compliance</p>
          </div>
        </li>
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Strategic Value</h3>
            <p className="text-slate-600">Measure benefits that are harder to quantify but often provide the greatest organisational impact, such as reduced turnover and improved decision-making</p>
          </div>
        </li>
      </ul>
      <p className="text-slate-600 mb-6">
        By providing a comprehensive view of both operational and strategic benefits, this calculator helps HR professionals build a compelling business case for HRIS investment.
      </p>

      <h2 className="text-xl font-semibold text-slate-800 mb-4">What Data Drives the Calculations</h2>
      <p className="text-slate-600 mb-4">
        The calculator uses the following information to determine ROI:
      </p>
      <ul className="space-y-4 mb-6">
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Company Information</h3>
            <p className="text-slate-600">Size of your organisation and HR staffing levels</p>
          </div>
        </li>
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Time Allocation Data</h3>
            <p className="text-slate-600">How HR staff time is currently distributed across different activities</p>
          </div>
        </li>
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Error and Compliance Metrics</h3>
            <p className="text-slate-600">Frequency and cost of data errors and compliance issues</p>
          </div>
        </li>
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">Strategic Indicators</h3>
            <p className="text-slate-600">Employee turnover rates and decision-making quality</p>
          </div>
        </li>
        <li className="flex">
          <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">HRIS Implementation Costs</h3>
            <p className="text-slate-600">One-time and ongoing costs of the HRIS solution</p>
          </div>
        </li>
      </ul>
    </div>
  );
};