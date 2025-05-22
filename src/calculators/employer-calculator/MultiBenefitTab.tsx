import React from 'react';
import CalculatorForm from './CalculatorForm';
import MultiBenefitConfig from './MultiBenefitConfig';
import { BenefitType, BenefitConfig, MultiBenefitConfig as MultiBenefitConfigType } from '../../calculation-engine/types';
import { Card } from '../../components/ui';

interface MultiBenefitTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  benefitConfig: MultiBenefitConfigType;
  onTaxYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEmployeeCountChange: (value: string) => void;
  onAverageSalaryChange: (value: string) => void;
  onBenefitConfigChange: (benefitType: BenefitType, config: BenefitConfig) => void;
  onCalculate: (e: React.FormEvent) => void;
  onReset: () => void;
}

/**
 * Component for the Multi-Benefit tab (Employer calculator)
 * Uses standardized UI components for consistent experience
 */
const MultiBenefitTab: React.FC<MultiBenefitTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  benefitConfig,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange,
  onBenefitConfigChange,
  onCalculate,
  onReset,
}) => {
  // Handle calculate button click - passes the event to the parent's onCalculate
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(e);
  };

  return (
    <form onSubmit={handleCalculate}>
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <CalculatorForm
          taxYear={taxYear}
          employeeCount={employeeCount}
          averageSalary={averageSalary}
          onTaxYearChange={onTaxYearChange}
          onEmployeeCountChange={onEmployeeCountChange}
          onAverageSalaryChange={onAverageSalaryChange}
        />
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <MultiBenefitConfig 
          benefitConfig={benefitConfig} 
          onChange={onBenefitConfigChange} 
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mt-8 justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Calculate Savings
        </button>
      </div>
    </form>
  );
};

export default MultiBenefitTab;