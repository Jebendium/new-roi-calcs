import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';

interface SalaryBandsTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  onTaxYearChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEmployeeCountChange?: (value: string) => void;
  onAverageSalaryChange?: (value: string) => void;
  onCalculate?: () => void;
  onReset?: () => void;
}

/**
 * Component for the Salary Bands tab (Employer calculator)
 */
const SalaryBandsTab: React.FC<SalaryBandsTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  onTaxYearChange = () => {},
  onEmployeeCountChange = () => {},
  onAverageSalaryChange = () => {},
  onCalculate = () => {},
  onReset = () => {},
}) => {
  // Local state for salary bands toggle
  const [useSalaryBands, setUseSalaryBands] = useState(false);
  
  // Handler for the checkbox
  const handleUseSalaryBandsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSalaryBands(e.target.checked);
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
      <div className="my-6 border-b border-slate-200" />
      <h4 className="text-base font-semibold mb-2">Salary Band Settings</h4>
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-4 text-sm">
        Salary band calculation allows for more accurate estimates by accounting for different salary ranges within your organisation.
      </div>
      <div className="flex items-center mb-6">
        <input
          id="use-salary-bands"
          type="checkbox"
          checked={useSalaryBands}
          onChange={handleUseSalaryBandsChange}
          className="accent-blue-600 w-4 h-4 mr-2"
        />
        <label htmlFor="use-salary-bands" className="text-sm font-medium cursor-pointer">
          Use detailed salary bands for calculation
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4 justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          onClick={onCalculate}
        >
          Calculate Savings
        </button>
      </div>
    </>
  );
};

export default SalaryBandsTab;
