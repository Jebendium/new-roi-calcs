'use client';

import React, { useState } from 'react';
import MultiBenefitTab from './MultiBenefitTab';
import MultiYearProjectionTab from './MultiYearProjectionTab';
import SalaryBandsTab from './SalaryBandsTab';
import WhatIfScenarioTab from './WhatIfScenarioTab';
import EmployerNIResults from './components/EmployerNIResults';
import { BenefitType, BenefitConfig, MultiBenefitConfig } from '../../calculation-engine/types';
import { getDefaultBenefitConfig } from '../../calculation-engine/benefits/multi-benefit';
import { calculateMultiBenefitSavings } from '../../calculation-engine/benefits/multi-benefit';
import { TabNavigation } from '../../components/ui';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

const TAB_LABELS = [
  'Multiple Benefits',
  'Multi-Year Projection',
  'Salary Bands',
  'What-If Scenarios',
];

interface EmployerNICalculatorProps {
  onSaveScenario?: (name: string, formValues: any, result: any) => void;
  initialValues?: any;
  showMethodologyLink?: boolean;
}

const EmployerNICalculator: React.FC<EmployerNICalculatorProps> = ({
  onSaveScenario,
  initialValues,
  showMethodologyLink = true
}) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Initialize state
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [employeeCount, setEmployeeCount] = useState('100');
  const [averageSalary, setAverageSalary] = useState('30000');
  const [benefitConfig, setBenefitConfig] = useState<MultiBenefitConfig>(getDefaultBenefitConfig());
  const [scenarioBenefitConfig, setScenarioBenefitConfig] = useState<MultiBenefitConfig>(getDefaultBenefitConfig());
  
  // Initialize result state
  const [result, setResult] = useState<any>(null);

  // Handlers for form fields
  const handleTaxYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaxYear(e.target.value);
  };
  
  const handleEmployeeCountChange = (value: string) => {
    setEmployeeCount(value);
  };
  
  const handleAverageSalaryChange = (value: string) => {
    setAverageSalary(value);
  };

  // Handlers for config and tabs
  const handleBenefitConfigChange = (benefitType: BenefitType, config: BenefitConfig) => {
    setBenefitConfig(prev => ({ ...prev, [benefitType]: config }));
  };
  
  const handleScenarioBenefitConfigChange = (benefitType: BenefitType, config: BenefitConfig) => {
    setScenarioBenefitConfig(prev => ({ ...prev, [benefitType]: config }));
  };
  
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock tax data for the calculation - in production this would come from your tax constants
    const mockTaxData = {
      personalAllowance: 12570,
      basicRate: 0.20,
      basicThreshold: 50270,
      higherRate: 0.40,
      higherThreshold: 125140,
      additionalRate: 0.45,
      niPrimaryRate: 0.12,
      niSecondaryRate: 0.15,
      niUpperEarningsLimit: 50270,
      niPrimaryUpperRate: 0.02,
      niSecondaryUpperRate: 0.15,
      niPrimaryThreshold: 12570,
      niSecondaryThreshold: 5000 // Updated from 9100 to 5000
    };
    
    // Calculate the results
    try {
      const calculationResult = calculateMultiBenefitSavings(
        Number(employeeCount),
        Number(averageSalary),
        benefitConfig,
        mockTaxData
      );
      
      setResult(calculationResult);
      
      // Show results tab
      setActiveTab(4);
    } catch (error) {
      console.error('Calculation error:', error);
      // Handle error scenario
    }
  };
  
  // Format the results for display
  const formatResults = (result: any) => {
    if (!result) return {};
    
    const niReduction = result.originalNI > 0 
      ? ((result.originalNI - result.reducedNI) / result.originalNI) * 100 
      : 0;
    
    return {
      annualSavings: formatCurrency(result.annualSavings),
      savingsPerEmployee: formatCurrency(result.savingsPerEmployee),
      originalNI: formatCurrency(result.originalNI),
      reducedNI: formatCurrency(result.reducedNI),
      niReduction: formatPercentage(niReduction)
    };
  };
  
  // Handle saving the scenario
  const handleSaveScenario = (name: string) => {
    if (result && onSaveScenario) {
      onSaveScenario(name, {
        taxYear,
        employeeCount,
        averageSalary,
        benefitConfig
      }, result);
    }
  };
  
  // Reset the calculator
  const handleReset = () => {
    setTaxYear('2025-2026');
    setEmployeeCount('100');
    setAverageSalary('30000');
    setBenefitConfig(getDefaultBenefitConfig());
    setScenarioBenefitConfig(getDefaultBenefitConfig());
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <h1 className="text-2xl font-bold mb-6">Employer NI Savings Calculator</h1>
      
      <TabNavigation
        tabs={result ? [...TAB_LABELS, 'Results'] : TAB_LABELS}
        activeTabIndex={activeTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />
      
      <div className="bg-white rounded-xl shadow p-6">
        {activeTab === 0 && (
          <MultiBenefitTab
            taxYear={taxYear}
            employeeCount={employeeCount}
            averageSalary={averageSalary}
            benefitConfig={benefitConfig}
            onTaxYearChange={handleTaxYearChange}
            onEmployeeCountChange={handleEmployeeCountChange}
            onAverageSalaryChange={handleAverageSalaryChange}
            onBenefitConfigChange={handleBenefitConfigChange}
            onCalculate={handleSubmit}
            onReset={handleReset}
          />
        )}
        {activeTab === 1 && (
          <MultiYearProjectionTab
            taxYear={taxYear}
            employeeCount={employeeCount}
            averageSalary={averageSalary}
            onTaxYearChange={handleTaxYearChange}
            onEmployeeCountChange={handleEmployeeCountChange}
            onAverageSalaryChange={handleAverageSalaryChange}
            onCalculate={handleSubmit}
            onReset={handleReset}
          />
        )}
        {activeTab === 2 && (
          <SalaryBandsTab
            taxYear={taxYear}
            employeeCount={employeeCount}
            averageSalary={averageSalary}
            onTaxYearChange={handleTaxYearChange}
            onEmployeeCountChange={handleEmployeeCountChange}
            onAverageSalaryChange={handleAverageSalaryChange}
            onCalculate={handleSubmit}
            onReset={handleReset}
          />
        )}
        {activeTab === 3 && (
          <WhatIfScenarioTab
            taxYear={taxYear}
            employeeCount={employeeCount}
            averageSalary={averageSalary}
            benefitConfig={benefitConfig}
            scenarioBenefitConfig={scenarioBenefitConfig}
            onTaxYearChange={handleTaxYearChange}
            onEmployeeCountChange={handleEmployeeCountChange}
            onAverageSalaryChange={handleAverageSalaryChange}
            onOriginalConfigChange={handleBenefitConfigChange}
            onScenarioConfigChange={handleScenarioBenefitConfigChange}
            onCalculateScenario={handleSubmit}
            onResetScenario={handleReset}
          />
        )}
        {activeTab === 4 && result && (
          <EmployerNIResults
            result={result}
            formValues={{
              taxYear,
              employeeCount,
              averageSalary,
              includeMultiBenefits: Object.values(benefitConfig).some(benefit => benefit.enabled)
            }}
            formattedResults={formatResults(result)}
            onReset={handleReset}
            onSaveScenario={onSaveScenario ? handleSaveScenario : undefined}
            showMethodologyLink={showMethodologyLink}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerNICalculator;