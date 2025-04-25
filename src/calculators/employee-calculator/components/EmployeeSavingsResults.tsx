'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmployeeSavingsCharts from './EmployeeSavingsCharts';

interface BenefitSavingsResult {
  taxSavings: number;
  niSavings: number;
  totalSavings: number;
  takeHomeIncrease: number;
}

interface EmployeeCalculationResult {
  annualTaxSavings: number;
  annualNISavings: number;
  totalAnnualSavings: number;
  monthlyTakeHomeIncrease: number;
  benefitBreakdown: {
    [key: string]: BenefitSavingsResult;
  };
  projectionResults?: {
    totalContributions: number;
    potValue: number;
  } | null;
}

interface EmployeeSavingsResultsProps {
  result: EmployeeCalculationResult;
  formValues: {
    taxYear: string;
    taxRegion: string;
    grossSalary: string;
    includeProjection: boolean;
  };
  formattedResults: any;
  onReset: () => void;
  onSaveScenario?: (name: string) => void;
  showMethodologyLink?: boolean;
}

const EmployeeSavingsResults: React.FC<EmployeeSavingsResultsProps> = ({
  result,
  formValues,
  formattedResults,
  onReset,
  onSaveScenario,
  showMethodologyLink = true
}) => {
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState(0);
  
  // Handle saving a scenario
  const handleSave = () => {
    if (onSaveScenario && scenarioName.trim()) {
      onSaveScenario(scenarioName.trim());
      setShowSaveModal(false);
      setScenarioName('');
    }
  };
  
  // Format benefit types for display
  const formatBenefitType = (type: string): string => {
    const benefitTypeMap: Record<string, string> = {
      'PENSION': 'Pension',
      'CYCLE_TO_WORK': 'Cycle to Work',
      'EV_CAR_SCHEME': 'Electric Vehicle Scheme',
      'CHILDCARE': 'Childcare Vouchers',
      'HOLIDAY_TRADING': 'Holiday Trading'
    };
    return benefitTypeMap[type] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Employee Tax & NI Savings Results
        </h2>
        <p className="text-slate-600">
          Based on £{Number(formValues.grossSalary).toLocaleString()} annual salary 
          ({formValues.taxRegion === 'scotland' ? 'Scottish' : 'UK'} tax rates for {formValues.taxYear})
        </p>
        
        {showMethodologyLink && (
          <p className="mt-2 text-sm">
            <Link
              href="/calculator/employee-savings/methodology"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View calculation methodology
            </Link>
          </p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Annual Tax & NI Savings</h3>
          <div className="text-2xl font-bold text-green-600 mb-1">{formattedResults.totalAnnualSavings}</div>
          <p className="text-xs text-slate-500">Total annual tax and NI savings</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Monthly Take-Home Increase</h3>
          <div className="text-2xl font-bold text-blue-600 mb-1">{formattedResults.monthlyTakeHomeIncrease}</div>
          <p className="text-xs text-slate-500">Additional monthly net pay</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Tax Savings</h3>
          <div className="text-2xl font-bold text-purple-600 mb-1">{formattedResults.annualTaxSavings}</div>
          <p className="text-xs text-slate-500">Annual income tax savings</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">NI Savings</h3>
          <div className="text-2xl font-bold text-indigo-600 mb-1">{formattedResults.annualNISavings}</div>
          <p className="text-xs text-slate-500">Annual National Insurance savings</p>
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeResultTab === 0
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveResultTab(0)}
          >
            Overview
          </button>
          
          <button
            className={`${
              activeResultTab === 1
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveResultTab(1)}
          >
            Benefit Breakdown
          </button>
          
          {result.projectionResults && formValues.includeProjection && (
            <button
              className={`${
                activeResultTab === 2
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveResultTab(2)}
            >
              Pension Projection
            </button>
          )}
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeResultTab === 0 && (
          <div>
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-slate-600 mb-4">
                Based on your selections, you could save <span className="font-semibold text-green-600">{formattedResults.totalAnnualSavings}</span> annually 
                through salary sacrifice benefits, increasing your monthly take-home pay by <span className="font-semibold text-blue-600">{formattedResults.monthlyTakeHomeIncrease}</span>.
              </p>
              <p className="text-slate-600">
                These savings come from reduced income tax and National Insurance contributions, 
                which vary based on your tax bracket and the benefits you&apos;ve selected.
              </p>
            </div>
            
            {/* Charts visualizations */}
            <EmployeeSavingsCharts result={result} grossSalary={formValues.grossSalary} />
            
            {/* Add some bullet points with advice */}
            <div className="mt-6">
              <h4 className="font-semibold text-slate-700 mb-3">What does this mean for you?</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You&apos;ll pay less in income tax and National Insurance while still benefiting from valuable employee benefits.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your annual reportable income will be lower, which may affect loan applications or credit checks.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>The tax and NI savings can effectively reduce the cost of benefits like pension contributions, cycle to work schemes, and more.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Benefit Breakdown Tab */}
        {activeResultTab === 1 && (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 mb-6">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Benefit Type</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Tax Savings</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">NI Savings</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Total Savings</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly Impact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {Object.entries(result.benefitBreakdown).map(([benefitType, data]) => (
                    <tr key={benefitType}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{formatBenefitType(benefitType)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                        £{data.taxSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                        £{data.niSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                        £{data.totalSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                        £{(data.takeHomeIncrease / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-slate-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                      £{result.annualTaxSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                      £{result.annualNISavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                      £{result.totalAnnualSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                      £{result.monthlyTakeHomeIncrease.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Note: The Monthly Impact column shows the net effect on your take-home pay after considering both the tax/NI savings and the salary sacrifice amounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Pension Projection Tab */}
        {activeResultTab === 2 && result.projectionResults && formValues.includeProjection && (
          <div>
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Pension Projection</h3>
              <p className="text-slate-600 mb-4">
                Based on your current pension contributions and assuming a 5% annual growth rate over 30 years:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Total Contributions</h4>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    £{result.projectionResults.totalContributions.toLocaleString('en-GB')}
                  </div>
                  <p className="text-xs text-slate-500">Amount you will contribute over 30 years</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Projected Pot Value</h4>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    £{result.projectionResults.potValue.toLocaleString('en-GB')}
                  </div>
                  <p className="text-xs text-slate-500">Estimated pension pot value after 30 years</p>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      This is a simplified projection based on a constant contribution amount and a fixed 5% annual growth rate. 
                      Actual pension growth will depend on investment performance and could be higher or lower.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Recalculate
        </button>
        
        <div className="flex space-x-4">
          {onSaveScenario && (
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Scenario
            </button>
          )}
          
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Results
          </button>
        </div>
      </div>
      
      {/* Save Scenario Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-slate-900">
                      Save Scenario
                    </h3>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Scenario name"
                        value={scenarioName}
                        onChange={(e) => setScenarioName(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!scenarioName.trim()}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-blue-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSavingsResults;
