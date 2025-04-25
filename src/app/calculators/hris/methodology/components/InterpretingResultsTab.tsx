'use client';

import React from 'react';

export const InterpretingResultsTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Interpreting Your Results</h2>
      <p className="text-slate-600 mb-6">
        The calculator provides several key metrics to help you evaluate the potential value of an HRIS implementation. Here&apos;s how to interpret and use these results effectively:
      </p>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-medium text-slate-800 mb-2">3-Year ROI Percentage</h3>
          <p className="text-slate-600 mb-2">
            This figure represents your total return on investment over a three-year period, expressed as a percentage of your initial investment.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium text-slate-700">How to interpret:</h4>
            <ul className="list-disc ml-5 text-sm text-slate-600">
              <li><span className="font-medium">Less than 0%:</span> The implementation costs exceed the financial benefits</li>
              <li><span className="font-medium">0-50%:</span> Modest return, may need to reevaluate specific inputs</li>
              <li><span className="font-medium">50-100%:</span> Solid return, indicating a worthwhile investment</li>
              <li><span className="font-medium">100-200%:</span> Strong return, suggesting significant value creation</li>
              <li><span className="font-medium">Over 200%:</span> Exceptional return, potentially transformative for HR operations</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-medium text-slate-800 mb-2">Payback Period</h3>
          <p className="text-slate-600 mb-2">
            This metric shows how long it will take to recover your initial investment through the benefits generated.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium text-slate-700">How to interpret:</h4>
            <ul className="list-disc ml-5 text-sm text-slate-600">
              <li><span className="font-medium">Less than 12 months:</span> Very rapid return, exceptionally strong case for implementation</li>
              <li><span className="font-medium">12-18 months:</span> Strong case for implementation, typical for successful HRIS projects</li>
              <li><span className="font-medium">18-24 months:</span> Reasonable timeframe, still presents a good business case</li>
              <li><span className="font-medium">24-36 months:</span> Longer payback, may want to examine if certain costs can be reduced</li>
              <li><span className="font-medium">Over 36 months:</span> Extended payback, consider reevaluating project scope or inputs</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-medium text-slate-800 mb-2">Value Breakdown</h3>
          <p className="text-slate-600 mb-2">
            The calculator shows the distribution of value across three categories: time savings, error reduction, and strategic value.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium text-slate-700">How to interpret:</h4>
            <ul className="list-disc ml-5 text-sm text-slate-600">
              <li>This breakdown helps identify your primary value drivers</li>
              <li>A balanced distribution suggests comprehensive benefits across operational and strategic areas</li>
              <li>If one area dominates, consider whether all potential benefits in other areas have been fully captured</li>
              <li>Use this breakdown to focus implementation efforts on areas with highest potential value</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="font-medium text-slate-800 mb-2">Year-by-Year Analysis</h3>
          <p className="text-slate-600 mb-2">
            The detailed table shows how costs, benefits, and ROI progress over each year of the three-year period.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium text-slate-700">How to interpret:</h4>
            <ul className="list-disc ml-5 text-sm text-slate-600">
              <li>First-year results show immediate impact including one-time implementation costs</li>
              <li>Years 2 and 3 typically show improved ROI as one-time costs are eliminated</li>
              <li>Cumulative value demonstrates the compound effect of benefits over time</li>
              <li>Use this view for budgeting and financial planning across multiple fiscal years</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Using Results to Build a Business Case</h3>
        <p className="text-blue-700 mb-2">
          When presenting your ROI analysis to stakeholders, consider these approaches:
        </p>
        <ol className="list-decimal ml-5 space-y-1 text-blue-700">
          <li>Lead with the 3-year ROI percentage and payback period as headline metrics</li>
          <li>Support with the value breakdown to show comprehensive benefits</li>
          <li>Include the year-by-year analysis to demonstrate ongoing value</li>
          <li>Highlight both financial and non-financial benefits</li>
          <li>Consider creating multiple scenarios (conservative, moderate, optimistic) by adjusting key inputs</li>
        </ol>
      </div>
    </div>
  );
};
