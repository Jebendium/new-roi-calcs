'use client';

import React from 'react';

export const IndustryBenchmarksTab = () => {
  // Define benchmark data arrays for easier reuse
  const timeSavingsBenchmarks = [
    { metric: 'Administrative Tasks Time Reduction', value: '60-70%', source: 'CIPD SME Study 2023' },
    { metric: 'Data Entry Time Reduction', value: '70-80%', source: 'CIPP Technology Report' },
    { metric: 'Reporting Time Reduction', value: '50-60%', source: 'CIPD Analytics' },
    { metric: 'Query Handling Reduction', value: '60-70%', source: 'CIPD HR Tech Survey' }
  ];

  const errorReductionBenchmarks = [
    { metric: 'Payroll Error Rate (Before HRIS)', value: '1-3%', source: 'CIPP Payroll Accuracy Study' },
    { metric: 'Payroll Error Reduction', value: '40-50%', source: 'CIPD Technology Study' },
    { metric: 'Data Accuracy Improvement', value: '70-75%', source: 'CIPP Data Report' },
    { metric: 'Compliance Issue Reduction', value: '60-75%', source: 'CIPD Risk Assessment' }
  ];

  const strategicBenchmarks = [
    { metric: 'Employee Turnover Reduction', value: '15-20%', source: 'CIPD Retention Survey' },
    { metric: 'Employee Engagement Value', value: '£800-1,200 per employee', source: 'CIPD Engagement Study' },
    { metric: 'Decision-Making Speed Improvement', value: '40-50%', source: 'HR Analytics Forum' },
    { metric: 'Workflow Automation Rate', value: '70-80%', source: 'CIPD Digital Transformation' }
  ];

  const costBenchmarks = [
    { metric: 'Implementation Cost', value: '£150-250 per employee', source: 'CIPD HR Tech Guide' },
    { metric: 'Annual License/Subscription', value: '£80-120 per employee/year', source: 'CIPP Software Survey' },
    { metric: 'Training Cost', value: '£30-50 per employee', source: 'CIPD L&D Report' },
    { metric: 'Typical ROI Range', value: '150-300% (3-year)', source: 'CIPD ROI Analysis' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Industry Benchmarks</h2>
      <p className="text-slate-600 mb-6">
        Our calculator includes an option to use industry benchmarks based on research from CIPD (Chartered Institute of Personnel and Development) and CIPP (Chartered Institute of Payroll Professionals). These benchmarks provide realistic starting points if you&apos;re unsure about specific inputs.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Benchmark Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {/* Time Savings Benchmarks */}
            <tr className="bg-blue-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-700" colSpan={4}>Time Savings</td>
            </tr>
            {timeSavingsBenchmarks.map((benchmark, index) => (
              <tr key={`time-${index}`}>
                <td className="px-4 py-3 text-sm text-slate-700"></td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.metric}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.value}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.source}</td>
              </tr>
            ))}

            {/* Error Reduction Benchmarks */}
            <tr className="bg-emerald-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-700" colSpan={4}>Error Reduction</td>
            </tr>
            {errorReductionBenchmarks.map((benchmark, index) => (
              <tr key={`error-${index}`}>
                <td className="px-4 py-3 text-sm text-slate-700"></td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.metric}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.value}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.source}</td>
              </tr>
            ))}

            {/* Strategic Value Benchmarks */}
            <tr className="bg-purple-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-700" colSpan={4}>Strategic Value</td>
            </tr>
            {strategicBenchmarks.map((benchmark, index) => (
              <tr key={`strategic-${index}`}>
                <td className="px-4 py-3 text-sm text-slate-700"></td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.metric}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.value}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.source}</td>
              </tr>
            ))}

            {/* Cost Benchmarks */}
            <tr className="bg-slate-100">
              <td className="px-4 py-3 text-sm font-medium text-slate-700" colSpan={4}>System Costs & ROI</td>
            </tr>
            {costBenchmarks.map((benchmark, index) => (
              <tr key={`cost-${index}`}>
                <td className="px-4 py-3 text-sm text-slate-700"></td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.metric}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.value}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{benchmark.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
        <h3 className="font-medium text-amber-800 mb-2">About These Benchmarks</h3>
        <p className="text-amber-700 mb-2">
          These benchmarks are based on industry research and may vary depending on:
        </p>
        <ul className="list-disc ml-5 space-y-1 text-amber-700">
          <li>Organisation size (SMEs may see different results than enterprises)</li>
          <li>Industry sector (some sectors have more complex HR processes)</li>
          <li>Current level of HR process maturity and automation</li>
          <li>Type and complexity of HRIS solution implemented</li>
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">Using Industry Benchmarks</h3>
        <p className="text-blue-700 mb-3">
          The &quot;Use CIPD/CIPP industry benchmarks&quot; toggle in the calculator pre-populates fields with these benchmark values. We recommend:
        </p>
        <ol className="list-decimal ml-5 space-y-1 text-blue-700">
          <li>Starting with benchmarks if you&apos;re unsure about specific inputs</li>
          <li>Adjusting values to reflect your specific organizational context</li>
          <li>Creating multiple scenarios (conservative, moderate, optimistic) by varying key inputs</li>
          <li>Seeking additional data from potential HRIS vendors to refine your estimates</li>
          <li>Tracking actual results post-implementation to validate and refine your ROI model</li>
        </ol>
      </div>
    </div>
  );
};
