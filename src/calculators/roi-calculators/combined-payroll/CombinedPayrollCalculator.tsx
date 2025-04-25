'use client';

import React, { useState } from 'react';
import { TabNavigation, Card, InfoBox, InfoTooltip } from '../../../components/ui';
import useCalculatorState from './hooks/useCalculatorState';
import { ValidationWarnings } from './shared';
import { CombinedPayrollInputs, PayrollSystemResults, ManagedPayrollResults } from '../../../types/combinedPayrollTypes';

// Import the input and results tab components
import {
  CompanyInfoInputs,
  CurrentPayrollCostsInputs,
  EfficiencyGainsInputs,
  ReworkReductionInputs,
  PaperCostSavingsInputs,
  SystemCostsInputs
} from './InputTabs';

import {
  PayrollSystemResults as PayrollSystemResultsTab,
  ManagedPayrollResults as ManagedPayrollResultsTab,
  ComparisonResults as ComparisonResultsTab
} from './ResultsTabs';

const TAB_LABELS = [
  'Company Info',
  'Current Costs',
  'Efficiency Gains',
  'Rework Reduction',
  'Paper Savings',
  'System Costs',
];

const RESULT_TAB_LABELS = [
  'Payroll System',
  'Managed Payroll',
  'Comparison',
];

interface CombinedPayrollCalculatorProps {
  onSaveScenario?: (name: string, formValues: CombinedPayrollInputs, result: { payrollSystemResults: PayrollSystemResults, managedPayrollResults: ManagedPayrollResults }) => void;
  initialValues?: CombinedPayrollInputs;
  showMethodologyLink?: boolean;
}

/**
 * Combined Payroll ROI Calculator
 * This component provides a unified interface for calculating ROI for both
 * Payroll System implementations and Managed Payroll services.
 */
const CombinedPayrollCalculator: React.FC<CombinedPayrollCalculatorProps> = ({
  onSaveScenario,
  initialValues,
  showMethodologyLink = true
}) => {
  // Save scenario state
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const {
    activeTab,
    showResults,
    inputs,
    payrollSystemResults,
    managedPayrollResults,
    validationWarnings,
    hasErrors,
    snackbarOpen,
    snackbarMessage,
    navigateToNextTab,
    navigateToPreviousTab,
    handleTabChange,
    handleInputChange,
    handleCalculate,
    handleReset,
    setSnackbarOpen,
    setSnackbarMessage
  } = useCalculatorState();

  // Create an array of all tab labels based on whether results are shown
  const allTabLabels = showResults 
    ? [...TAB_LABELS, ...RESULT_TAB_LABELS]
    : TAB_LABELS;

  // Handle saving the scenario
  const handleSaveScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenarioName.trim() && payrollSystemResults && managedPayrollResults && onSaveScenario) {
      onSaveScenario(
        scenarioName, 
        inputs, 
        { 
          payrollSystemResults,
          managedPayrollResults
        }
      );
      setScenarioName('');
      setShowSaveForm(false);
      setSnackbarMessage('Scenario saved successfully');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <h1 className="text-2xl font-bold mb-6">Payroll ROI Calculator</h1>
      
      <InfoBox title="About this calculator" variant="info" className="mb-6">
        <p>
          This calculator helps you compare the financial benefits of implementing a new payroll system 
          versus outsourcing to a managed payroll service. Enter your company details and current 
          costs to see which option provides the best return on investment.
        </p>
      </InfoBox>
      
      {/* Show validation warnings if there are any */}
      {validationWarnings.length > 0 && (
        <ValidationWarnings warnings={validationWarnings} />
      )}
      
      {/* Tab Navigation */}
      <TabNavigation
        tabs={allTabLabels}
        activeTabIndex={activeTab}
        onTabChange={(idx) => handleTabChange({} as React.SyntheticEvent, idx)}
        className="mb-6"
      />
      
      {/* Tab Panels */}
      <Card className="p-6">
        {/* Input Tabs */}
        {activeTab === 0 && (
          <CompanyInfoInputs 
            inputs={inputs}
            onChange={handleInputChange}
            onNext={navigateToNextTab}
          />
        )}
        
        {activeTab === 1 && (
          <CurrentPayrollCostsInputs 
            inputs={inputs}
            onChange={handleInputChange}
            onNext={navigateToNextTab}
            onPrevious={navigateToPreviousTab}
          />
        )}
        
        {activeTab === 2 && (
          <EfficiencyGainsInputs 
            inputs={inputs}
            onChange={handleInputChange}
            onNext={navigateToNextTab}
            onPrevious={navigateToPreviousTab}
          />
        )}
        
        {activeTab === 3 && (
          <ReworkReductionInputs 
            inputs={inputs}
            onChange={handleInputChange}
            onNext={navigateToNextTab}
            onPrevious={navigateToPreviousTab}
          />
        )}
        
        {activeTab === 4 && (
          <PaperCostSavingsInputs 
            inputs={inputs}
            onChange={handleInputChange}
            onNext={navigateToNextTab}
            onPrevious={navigateToPreviousTab}
          />
        )}
        
        {activeTab === 5 && (
          <SystemCostsInputs 
            inputs={inputs}
            onChange={handleInputChange}
            onCalculate={handleCalculate}
            onPrevious={navigateToPreviousTab}
          />
        )}
        
        {/* Result Tabs - Only shown when showResults is true */}
        {showResults && activeTab === 6 && payrollSystemResults && (
          <PayrollSystemResultsTab 
            results={payrollSystemResults}
            inputs={{
              employeeCount: inputs.employeeCount,
              currentAnnualCost: 
                inputs.currentStaffCosts + 
                inputs.currentSoftwareCosts + 
                inputs.currentTrainingCosts + 
                inputs.currentInfrastructureCosts + 
                inputs.currentOtherCosts
            }}
          />
        )}
        
        {showResults && activeTab === 7 && managedPayrollResults && (
          <ManagedPayrollResultsTab 
            results={managedPayrollResults}
            inputs={{
              employeeCount: inputs.employeeCount,
              currentAnnualCost: 
                inputs.currentStaffCosts + 
                inputs.currentSoftwareCosts + 
                inputs.currentTrainingCosts + 
                inputs.currentInfrastructureCosts + 
                inputs.currentOtherCosts
            }}
          />
        )}
        
        {showResults && activeTab === 8 && payrollSystemResults && managedPayrollResults && (
          <ComparisonResultsTab 
            payrollSystemResults={payrollSystemResults}
            managedPayrollResults={managedPayrollResults}
            inputs={inputs}
          />
        )}

        {/* Save Scenario Section - Only shown in results tabs */}
        {showResults && onSaveScenario && (activeTab >= 6) && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-medium mb-4">Save This Scenario</h3>
            
            {!showSaveForm ? (
              <button
                type="button"
                onClick={() => setShowSaveForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save for Comparison
              </button>
            ) : (
              <form onSubmit={handleSaveScenario} className="flex items-end gap-3">
                <div className="flex-grow">
                  <label htmlFor="scenario-name" className="block text-sm font-medium text-slate-700 mb-2">
                    Scenario Name
                  </label>
                  <input
                    type="text"
                    id="scenario-name"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Current Payroll Setup"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowSaveForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        )}
      </Card>
      
      {/* Action buttons for results tabs */}
      {showResults && (
        <div className="flex flex-wrap justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
          >
            Reset Calculator
          </button>

          <div className="space-x-3">
            {showMethodologyLink && (
              <a
                href="/calculators/roi/combined-payroll/methodology"
                className="px-6 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Methodology
              </a>
            )}
            
            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Print Results
            </button>
          </div>
        </div>
      )}
      
      {/* Show Calculate button if on the last input tab and not showing results */}
      {activeTab === 5 && !showResults && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleCalculate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            disabled={hasErrors}
          >
            Calculate ROI
          </button>
        </div>
      )}
      
      {/* Snackbar for notifications */}
      {snackbarOpen && (
        <div 
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50
            ${hasErrors ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {snackbarMessage}
          <button 
            className="ml-4 text-white"
            onClick={() => setSnackbarOpen(false)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default CombinedPayrollCalculator;