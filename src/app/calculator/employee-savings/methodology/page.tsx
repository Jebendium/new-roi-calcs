'use client';

import React from 'react';
import Link from 'next/link';
import { WizardShell } from '../../../../components/WizardShell';
import { useRouter } from 'next/navigation';

/**
 * Methodology Page Component for Employee Savings Calculator
 */
export default function EmployeeSavingsMethodologyPage() {
  const [tabValue, setTabValue] = React.useState(2); // Start with "Benefit Types" tab active
  const router = useRouter();

  return (
    <WizardShell 
      activeCalculator="employee-savings" 
      onSelectCalculator={(type) => router.push(`/calculator/${type}`)}
      onGoHome={() => router.push('/')}
    >
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/calculator/employee-savings"
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
        How Does the Employee Tax & NI Savings Calculator Work?
      </h1>

      <p className="text-base mb-6 text-slate-700">
        This page explains the methodology behind the Employee Tax & NI Savings Calculator, including how it calculates potential tax and National Insurance savings from salary sacrifice benefits based on your personal circumstances.
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
            Tax Calculations
          </button>
          <button
            onClick={() => setTabValue(2)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 2
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Benefit Types
          </button>
          <button
            onClick={() => setTabValue(3)}
            className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
              tabValue === 3
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Pension Projections
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
            The Employee Tax & NI Savings Calculator helps individuals estimate potential savings from salary sacrifice benefits.
            By giving up a portion of your salary in exchange for non-cash benefits, you can reduce your income tax and National
            Insurance liabilities, potentially increasing your net take-home pay.
          </p>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator uses current tax year rates and thresholds to calculate how much an individual could save
            based on their gross salary, tax region, and the salary sacrifice benefits they choose to participate in.
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
            For each benefit, the calculator estimates both tax and National Insurance savings, as well as the net 
            impact on monthly take-home pay after accounting for the salary sacrifice amount.
          </p>
        </div>
      )}

      {tabValue === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Tax Calculations Methodology
          </h2>
          
          <p className="text-base mb-4 text-slate-700">
            The calculator uses the following approach to determine tax and National Insurance savings:
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Income Tax Calculation
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            Income tax savings are calculated based on the marginal tax rate applicable to your salary:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>If your salary is below the Personal Allowance (£12,570), tax savings will be zero.</li>
            <li>For salary in the Basic Rate band (up to £50,270), tax savings are 20% of the sacrifice amount.</li>
            <li>For salary in the Higher Rate band (up to £125,140), tax savings are 40% of the sacrifice amount.</li>
            <li>For salary in the Additional Rate band (above £125,140), tax savings are 45% of the sacrifice amount.</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            National Insurance Calculation
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            National Insurance (NI) savings are calculated as follows:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>If your salary is below the Primary Threshold (£12,570), NI savings will be zero.</li>
            <li>For salary between the Primary Threshold and Upper Earnings Limit (£50,270), NI savings are 12% of the sacrifice amount.</li>
            <li>For salary above the Upper Earnings Limit, NI savings are 2% of the sacrifice amount.</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2 text-slate-800">
            Take-Home Pay Impact
          </h3>
          
          <p className="text-base mb-4 text-slate-700">
            The net impact on your take-home pay is calculated as:
            <br />
            <strong>Net Impact = Tax Savings + NI Savings - Salary Sacrifice Amount</strong>
          </p>
          
          <p className="text-base mb-4 text-slate-700">
            This can be positive (increasing your take-home pay) or negative (reducing it), depending on your 
            specific tax situation and the benefits selected.
          </p>
        </div>
      )}

      {tabValue === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-6 text-slate-800">
            Benefit Types Explained
          </h2>
          
          <h3 className="text-lg font-medium mb-3 text-slate-800">
            Pension Contributions
          </h3>
          
          <p className="text-base mb-6 text-slate-700">
            Pension contributions are calculated as a percentage of your gross salary. The calculator determines tax and NI savings based on your marginal rates. For most users, pension contributions represent the largest potential tax savings.
          </p>
          
          <h3 className="text-lg font-medium mb-3 text-slate-800">
            Cycle to Work Scheme
          </h3>
          
          <p className="text-base mb-6 text-slate-700">
            This allows you to purchase a bicycle through salary sacrifice, typically over 12 months. The calculator applies tax and NI savings to the monthly sacrifice amount.
          </p>
          
          <h3 className="text-lg font-medium mb-3 text-slate-800">
            Electric Vehicle Scheme
          </h3>
          
          <p className="text-base mb-6 text-slate-700">
            EV car schemes involve sacrificing salary in exchange for an electric vehicle. The calculator accounts for Benefit in Kind (BIK) taxation at 2% for pure electric vehicles, which slightly reduces the total savings.
          </p>
          
          <h3 className="text-lg font-medium mb-3 text-slate-800">
            Childcare Vouchers
          </h3>
          
          <p className="text-base mb-6 text-slate-700">
            This is a legacy scheme (closed to new entrants) that allows parents to sacrifice salary for childcare vouchers. The calculator applies standard tax and NI calculations to the monthly sacrifice amount.
          </p>
          
          <h3 className="text-lg font-medium mb-3 text-slate-800">
            Holiday Trading
          </h3>
          
          <p className="text-base mb-6 text-slate-700">
            This allows employees to purchase additional holiday days through salary sacrifice. The calculator estimates the daily rate based on the annual salary (assuming 260 working days per year) and applies tax and NI savings to the total holiday value.
          </p>
        </div>
      )}

      {tabValue === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Pension Projections
          </h2>
          
          <p className="text-base mb-4 text-slate-700">
            For users who enable pension contributions, the calculator can provide a simplified
            30-year projection of the pension pot value based on the following assumptions:
          </p>
          
          <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            <li>Constant contribution amount (based on percentage of current salary)</li>
            <li>Fixed 5% annual growth rate (compounded annually)</li>
            <li>No salary increases over the projection period</li>
            <li>No changes to contribution percentage over time</li>
          </ul>
          
          <p className="text-base mb-4 text-slate-700">
            The projection uses a simple compound interest formula to estimate future value:
          </p>
          
          <div className="bg-slate-50 p-4 rounded-md my-4 font-mono text-sm">
            For each year in the projection period:<br />
            Pot Value = (Previous Pot Value + Annual Contribution) × (1 + Growth Rate)
          </div>
          
          <p className="text-base mb-4 text-slate-700">
            <strong>Important limitation:</strong> This is a simplified projection for illustrative purposes only. 
            It does not account for inflation, changing contribution levels, salary increases, or variable investment returns.
            For comprehensive pension planning, users should consult with a financial advisor.
          </p>
        </div>
      )}
    </WizardShell>
  );
}