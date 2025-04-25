'use client';

import React from 'react';
import Link from 'next/link';
import { WizardShell } from '../../../../components/WizardShell';
import { useRouter } from 'next/navigation';

/**
 * Methodology Page Component for Employer NI Calculator
 */
export default function EmployerNIMethodologyPage() {
  const [tabValue, setTabValue] = React.useState(0);
  const router = useRouter();

  return (
    <WizardShell 
      activeCalculator="employer-ni" 
      onSelectCalculator={(type) => router.push(`/calculator/${type}`)}
      onGoHome={() => router.push('/')}
    >
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/calculator/employer-ni"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Calculator
        </Link>
      </div>

      {/* Page title */}
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        How Does the Employer NI Savings Calculator Work?
      </h1>

      <p className="text-base mb-6 text-slate-700">
        This page explains the methodology behind the Employer NI Savings Calculator, including how inputs are used,
        how calculations are performed, and how to interpret the results to make informed decisions about salary sacrifice benefits.
      </p>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex -mb-px overflow-x-auto">
          <button
            onClick={() => setTabValue(0)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 0
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTabValue(1)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 1
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Input Categories
          </button>
          <button
            onClick={() => setTabValue(2)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 2
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Calculation Method
          </button>
          <button
            onClick={() => setTabValue(3)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 3
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Interpreting Results
          </button>
          <button
            onClick={() => setTabValue(4)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 4
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Benchmark Data
          </button>
        </div>
      </div>

      {/* Tab content */}
      {tabValue === 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Methodology Overview
          </h2>
          
          <p className="text-base mb-4 text-slate-700">
            The Employer National Insurance (NI) Savings Calculator helps businesses estimate potential savings 
            from implementing salary sacrifice benefit schemes. These schemes can reduce employer NI contributions
            while providing valuable benefits to employees.
          </p>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator uses the current tax year's NI rates and thresholds to determine how much an employer
            could save based on their workforce size, average salary, and the benefits they choose to implement.
          </p>
          
          <h3 className="text-lg font-medium mt-6 mb-3 text-slate-800">
            Key Benefits Included:
          </h3>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>Pension Contributions</li>
            <li>Cycle to Work Scheme</li>
            <li>Electric Vehicle Salary Sacrifice</li>
            <li>Childcare Vouchers (legacy scheme)</li>
            <li>Holiday Trading</li>
          </ul>
          
          <p className="text-base mt-4 text-slate-700">
            Each benefit is calculated based on typical participation rates and contribution levels,
            which you can adjust to match your organisation's specific circumstances.
          </p>
        </div>
      )}

      {tabValue === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Input Categories
          </h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Workforce Information
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator requires basic information about your workforce to calculate potential savings:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>Total number of employees</li>
            <li>Average annual salary across your organisation</li>
            <li>Optional: Salary breakdown by band if available</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Benefit Participation Rates
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            For each benefit type, you can specify:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>The current or expected participation rate (as a percentage of eligible employees)</li>
            <li>Average contribution level per employee</li>
          </ul>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator will provide default industry-standard estimates, which you can adjust based on your
            specific organisational context and knowledge.
          </p>
        </div>
      )}

      {tabValue === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Calculation Method
          </h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Employer NI Calculation
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator determines Employer National Insurance savings as follows:
          </p>
          
          <ol className="list-decimal ml-6 mb-4 space-y-2 text-slate-700">
            <li>For each salary band, calculate employer NI liability as 13.8% of salary above the Secondary Threshold (£9,100)</li>
            <li>Apply the estimated benefit uptake and contribution amounts to work out the total salary sacrifice value</li>
            <li>Calculate the reduced employer NI liability after salary sacrifice</li>
            <li>The difference between original and reduced NI liability represents the potential savings</li>
          </ol>
          
          <div className="bg-slate-50 p-4 rounded-md my-4 font-mono text-sm">
            For each benefit type:<br />
            Saving = Number of Employees × Participation Rate × Average Sacrifice Amount × 13.8%
          </div>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator computes this for each benefit category and provides an aggregate total.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Implementation Cost Offsetting
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator also allows you to factor in:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>One-time implementation costs</li>
            <li>Ongoing administration costs</li>
            <li>Third-party platform fees</li>
          </ul>
          
          <p className="text-base mb-4 text-slate-700">
            These are deducted from the gross savings to arrive at net savings figures and ROI calculations.
          </p>
        </div>
      )}

      {tabValue === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Interpreting Results
          </h2>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator provides several key metrics to help you understand the potential impact:
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Gross Annual Savings
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            This represents the total potential employer NI savings across all benefit types before
            accounting for implementation and administration costs.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Net Annual Savings
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            This is the gross savings minus ongoing annual costs, representing the true yearly benefit
            to your organisation after the scheme is established.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            First-Year ROI
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            This calculation includes one-time implementation costs and shows the percentage return
            on your initial investment during the first 12 months.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Long-Term ROI
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            This metric excludes one-time costs and focuses only on ongoing expenses, providing
            insight into the sustainable financial benefit of the scheme.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 my-4">
            <p className="font-medium mb-1">Interpreting Tip</p>
            <p className="text-sm">
              Even modest participation rates can yield significant savings at scale. Focus on the benefits
              most relevant to your workforce demographic to maximize uptake and ROI.
            </p>
          </div>
        </div>
      )}

      {tabValue === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Benchmark Data
          </h2>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator incorporates UK industry benchmark data to help you understand how your potential
            savings compare to typical results for organisations of similar size and sector.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Typical Participation Rates
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            Based on anonymised data from UK employers, the calculator provides typical ranges for:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>Pension scheme uptake: 70-95% (mandatory auto-enrollment drives high participation)</li>
            <li>Cycle to Work: 5-15% of eligible employees</li>
            <li>EV salary sacrifice: 2-8% of eligible employees</li>
            <li>Holiday trading: 10-25% of eligible employees</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Average Savings by Company Size
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            Comparative data shows how your potential savings align with UK averages:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 mb-6">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Size</th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Annual Savings</th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings Per Employee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">Small (10-49 employees)</td>
                  <td className="py-2 px-4 border-b border-gray-200">£5,000 - £25,000</td>
                  <td className="py-2 px-4 border-b border-gray-200">£500 - £700</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">Medium (50-249 employees)</td>
                  <td className="py-2 px-4 border-b border-gray-200">£25,000 - £150,000</td>
                  <td className="py-2 px-4 border-b border-gray-200">£550 - £750</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">Large (250+ employees)</td>
                  <td className="py-2 px-4 border-b border-gray-200">£150,000+</td>
                  <td className="py-2 px-4 border-b border-gray-200">£600 - £900</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-base mb-4 text-slate-700">
            <strong>Note:</strong> These figures are based on average UK salary data and typical benefit uptake rates.
            Your actual results may vary based on your specific workforce profile and benefit implementation strategy.
          </p>
        </div>
      )}
    </WizardShell>
  );
}