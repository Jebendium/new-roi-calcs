import React, { useState, useEffect } from 'react';
import CalculatorForm from './CalculatorForm';
import WhatIfScenario from './WhatIfScenario';
import { BenefitType, BenefitConfig, MultiBenefitConfig } from '../../calculation-engine/types';
import { getDefaultBenefitConfig } from '../../calculation-engine/benefits/multi-benefit';

interface WhatIfScenarioTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  benefitConfig?: MultiBenefitConfig;
  scenarioBenefitConfig?: MultiBenefitConfig;
  onTaxYearChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEmployeeCountChange?: (value: string) => void;
  onAverageSalaryChange?: (value: string) => void;
  onOriginalConfigChange?: (benefitType: BenefitType, config: BenefitConfig) => void;
  onScenarioConfigChange?: (benefitType: BenefitType, config: BenefitConfig) => void;
  onCalculateScenario?: () => void;
  onResetScenario?: () => void;
}

/**
 * Component for the What-If Scenario tab (Employer calculator)
 */
const WhatIfScenarioTab: React.FC<WhatIfScenarioTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  benefitConfig,
  scenarioBenefitConfig,
  onTaxYearChange = () => {},
  onEmployeeCountChange = () => {},
  onAverageSalaryChange = () => {},
  onOriginalConfigChange = () => {},
  onScenarioConfigChange = () => {},
  onCalculateScenario = () => {},
  onResetScenario = () => {},
}) => {
  // Create default benefit configurations if not provided
  const [originalConfig, setOriginalConfig] = useState<MultiBenefitConfig>(
    benefitConfig || getDefaultBenefitConfig()
  );
  
  const [scenarioConfig, setScenarioConfig] = useState<MultiBenefitConfig>(
    scenarioBenefitConfig || getDefaultBenefitConfig()
  );
  
  // Update local state when props change
  useEffect(() => {
    if (benefitConfig) {
      setOriginalConfig(benefitConfig);
    }
    if (scenarioBenefitConfig) {
      setScenarioConfig(scenarioBenefitConfig);
    }
  }, [benefitConfig, scenarioBenefitConfig]);
  
  // Handlers for config changes
  const handleOriginalChange = (benefitType: BenefitType, config: BenefitConfig) => {
    setOriginalConfig(prev => ({
      ...prev,
      [benefitType]: config
    }));
    onOriginalConfigChange(benefitType, config);
  };
  
  const handleScenarioChange = (benefitType: BenefitType, config: BenefitConfig) => {
    setScenarioConfig(prev => ({
      ...prev,
      [benefitType]: config
    }));
    onScenarioConfigChange(benefitType, config);
  };

  return (
    <>
      <CalculatorForm
        taxYear={taxYear}
        employeeCount={employeeCount}
        averageSalary={averageSalary}
        onTaxYearChange={onTaxYearChange}
        onEmployeeCountChange={onEmployeeCountChange}
        onAverageSalaryChange={onAverageSalaryChange}
      />
      <div className="my-6">
        <WhatIfScenario
          originalConfig={originalConfig}
          scenarioConfig={scenarioConfig}
          onOriginalChange={handleOriginalChange}
          onScenarioChange={handleScenarioChange}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4 justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition"
          onClick={onResetScenario}
        >
          Reset Scenario
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          onClick={onCalculateScenario}
        >
          Calculate Scenario
        </button>
      </div>
    </>
  );
};

export default WhatIfScenarioTab;
