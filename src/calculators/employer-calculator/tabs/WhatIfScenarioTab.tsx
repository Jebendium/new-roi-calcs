import React, { useState } from 'react';
import { FormValues, EmployerNIResult } from '../../core/types';
import { FormField, CurrencyInput, PercentageInput, NumberInput } from '../../shared/components';

interface WhatIfScenarioTabProps {
  result: EmployerNIResult;
  formValues: FormValues;
  onRecalculate: (newValues: Partial<FormValues>, scenarioName?: string) => void;
}

/**
 * WhatIfScenarioTab - Component for comparing different employer NI scenarios
 * 
 * This component allows users to create what-if scenarios by adjusting key parameters
 * and comparing the results against the baseline calculation.
 */
const WhatIfScenarioTab: React.FC<WhatIfScenarioTabProps> = ({
  result,
  formValues,
  onRecalculate
}) => {
  const [scenarioName, setScenarioName] = useState<string>('Alternative Scenario');
  const [scenarioValues, setScenarioValues] = useState<Partial<FormValues>>({
    employeeCount: formValues.employeeCount,
    averageSalary: formValues.averageSalary,
    pensionContribution: formValues.pensionContribution,
    pensionParticipation: formValues.pensionParticipation || 80
  });
  
  // Handle input changes
  const handleChange = (field: keyof FormValues, value: any) => {
    setScenarioValues({
      ...scenarioValues,
      [field]: value
    });
  };
  
  // Run scenario calculation
  const calculateScenario = () => {
    onRecalculate(scenarioValues, scenarioName);
  };
  
  // Reset scenario to baseline values
  const resetScenario = () => {
    setScenarioValues({
      employeeCount: formValues.employeeCount,
      averageSalary: formValues.averageSalary,
      pensionContribution: formValues.pensionContribution,
      pensionParticipation: formValues.pensionParticipation || 80
    });
  };
  
  // Format currency values for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        What-If Scenario Analysis
      </h3>
      <p className="text-slate-600 mb-6">
        Adjust key parameters below to see how changes would affect your employer NI savings. 
        This helps you model potential future states or different configurations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario Configuration Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h4 className="text-md font-medium text-slate-800 mb-4">
            Configure Scenario
          </h4>
          
          <FormField
            label="Scenario Name"
            htmlFor="scenarioName"
            tooltip="Give your scenario a descriptive name to identify it in comparison reports."
          >
            <input
              id="scenarioName"
              type="text"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              placeholder="e.g. Increased Participation"
            />
          </FormField>
          
          <div className="mt-6 space-y-6">
            <FormField
              label="Number of Employees"
              htmlFor="employeeCount"
              tooltip="Total number of employees in your organization."
            >
              <NumberInput
                id="employeeCount"
                name="employeeCount"
                value={scenarioValues.employeeCount}
                onChange={(value) => handleChange('employeeCount', value)}
                min={1}
                placeholder="e.g. 100"
              />
            </FormField>
            
            <FormField
              label="Average Annual Salary"
              htmlFor="averageSalary"
              tooltip="Average annual salary across your organization."
            >
              <CurrencyInput
                id="averageSalary"
                name="averageSalary"
                value={scenarioValues.averageSalary}
                onChange={(value) => handleChange('averageSalary', value)}
                min={0}
                placeholder="e.g. £30,000"
              />
            </FormField>
            
            <FormField
              label="Pension Contribution (%)"
              htmlFor="pensionContribution"
              tooltip="Average percentage of salary contributed to pension via salary sacrifice."
            >
              <PercentageInput
                id="pensionContribution"
                name="pensionContribution"
                value={scenarioValues.pensionContribution}
                onChange={(value) => handleChange('pensionContribution', value)}
                min={0}
                max={100}
                placeholder="e.g. 5%"
              />
            </FormField>
            
            <FormField
              label="Pension Participation Rate (%)"
              htmlFor="pensionParticipation"
              tooltip="Percentage of employees participating in the pension scheme."
            >
              <PercentageInput
                id="pensionParticipation"
                name="pensionParticipation"
                value={scenarioValues.pensionParticipation}
                onChange={(value) => handleChange('pensionParticipation', value)}
                min={0}
                max={100}
                placeholder="e.g. 80%"
              />
            </FormField>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button
              type="button"
              onClick={calculateScenario}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Scenario
            </button>
            
            <button
              type="button"
              onClick={resetScenario}
              className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Reset Values
            </button>
          </div>
        </div>
        
        {/* Comparison Results Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h4 className="text-md font-medium text-slate-800 mb-4">
            Baseline vs. Scenario Comparison
          </h4>
          
          <div className="space-y-6">
            {/* Employee Count Comparison */}
            <div className="rounded-lg bg-slate-50 p-4">
              <h5 className="text-sm font-medium text-slate-800 mb-2">
                Employees
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-slate-600">Baseline:</div>
                <div className="text-slate-800 font-medium">{formValues.employeeCount}</div>
                <div></div>
                
                <div className="text-slate-600">Scenario:</div>
                <div className="text-slate-800 font-medium">{scenarioValues.employeeCount}</div>
                <div className="text-slate-500 italic text-xs flex items-center">
                  {scenarioValues.employeeCount !== formValues.employeeCount ? (
                    <>
                      {scenarioValues.employeeCount! > formValues.employeeCount! ? '+' : ''}
                      {Number(scenarioValues.employeeCount) - Number(formValues.employeeCount)} employees
                      ({((Number(scenarioValues.employeeCount) / Number(formValues.employeeCount) - 1) * 100).toFixed(1)}%)
                    </>
                  ) : 'No change'}
                </div>
              </div>
            </div>
            
            {/* Average Salary Comparison */}
            <div className="rounded-lg bg-slate-50 p-4">
              <h5 className="text-sm font-medium text-slate-800 mb-2">
                Average Salary
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-slate-600">Baseline:</div>
                <div className="text-slate-800 font-medium">{formatCurrency(Number(formValues.averageSalary))}</div>
                <div></div>
                
                <div className="text-slate-600">Scenario:</div>
                <div className="text-slate-800 font-medium">{formatCurrency(Number(scenarioValues.averageSalary))}</div>
                <div className="text-slate-500 italic text-xs flex items-center">
                  {scenarioValues.averageSalary !== formValues.averageSalary ? (
                    <>
                      {Number(scenarioValues.averageSalary) > Number(formValues.averageSalary) ? '+' : ''}
                      {formatCurrency(Number(scenarioValues.averageSalary) - Number(formValues.averageSalary))}
                      ({((Number(scenarioValues.averageSalary) / Number(formValues.averageSalary) - 1) * 100).toFixed(1)}%)
                    </>
                  ) : 'No change'}
                </div>
              </div>
            </div>
            
            {/* Pension Contribution Comparison */}
            <div className="rounded-lg bg-slate-50 p-4">
              <h5 className="text-sm font-medium text-slate-800 mb-2">
                Pension Contribution
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-slate-600">Baseline:</div>
                <div className="text-slate-800 font-medium">{formValues.pensionContribution}%</div>
                <div></div>
                
                <div className="text-slate-600">Scenario:</div>
                <div className="text-slate-800 font-medium">{scenarioValues.pensionContribution}%</div>
                <div className="text-slate-500 italic text-xs flex items-center">
                  {scenarioValues.pensionContribution !== formValues.pensionContribution ? (
                    <>
                      {Number(scenarioValues.pensionContribution) > Number(formValues.pensionContribution) ? '+' : ''}
                      {Number(scenarioValues.pensionContribution) - Number(formValues.pensionContribution)}%
                    </>
                  ) : 'No change'}
                </div>
              </div>
            </div>
            
            {/* Participation Rate Comparison */}
            <div className="rounded-lg bg-slate-50 p-4">
              <h5 className="text-sm font-medium text-slate-800 mb-2">
                Pension Participation Rate
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-slate-600">Baseline:</div>
                <div className="text-slate-800 font-medium">{formValues.pensionParticipation || 80}%</div>
                <div></div>
                
                <div className="text-slate-600">Scenario:</div>
                <div className="text-slate-800 font-medium">{scenarioValues.pensionParticipation}%</div>
                <div className="text-slate-500 italic text-xs flex items-center">
                  {scenarioValues.pensionParticipation !== formValues.pensionParticipation ? (
                    <>
                      {Number(scenarioValues.pensionParticipation) > Number(formValues.pensionParticipation || 80) ? '+' : ''}
                      {Number(scenarioValues.pensionParticipation) - Number(formValues.pensionParticipation || 80)}%
                    </>
                  ) : 'No change'}
                </div>
              </div>
            </div>
            
            {/* Projected Savings Comparison */}
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">
                Projected Annual NI Savings
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-blue-700 font-medium">Baseline:</div>
                <div className="text-blue-800 font-medium">{formatCurrency(result.annualSavings)}</div>
                <div></div>
                
                <div className="text-blue-700 font-medium">Scenario:</div>
                <div className="text-blue-800 font-medium">
                  {result.scenarios && result.scenarios[scenarioName] 
                    ? formatCurrency(result.scenarios[scenarioName].annualSavings)
                    : 'Calculate to see results'}
                </div>
                
                {result.scenarios && result.scenarios[scenarioName] && (
                  <div className={`${
                    result.scenarios[scenarioName].annualSavings > result.annualSavings 
                      ? 'text-green-600' 
                      : result.scenarios[scenarioName].annualSavings < result.annualSavings 
                        ? 'text-red-600' 
                        : 'text-slate-500'
                  } italic text-xs flex items-center`}>
                    {result.scenarios[scenarioName].annualSavings > result.annualSavings ? '+' : ''}
                    {formatCurrency(result.scenarios[scenarioName].annualSavings - result.annualSavings)}
                    ({((result.scenarios[scenarioName].annualSavings / result.annualSavings - 1) * 100).toFixed(1)}%)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfScenarioTab;