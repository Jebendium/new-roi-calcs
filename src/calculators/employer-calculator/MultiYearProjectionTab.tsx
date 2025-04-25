import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';

interface MultiYearProjectionTabProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  onTaxYearChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEmployeeCountChange?: (value: string) => void;
  onAverageSalaryChange?: (value: string) => void;
  onCalculate?: (e: React.FormEvent) => void;
  onReset?: () => void;
}

/**
 * Component for the Multi-Year Projection tab (Employer calculator)
 */
const MultiYearProjectionTab: React.FC<MultiYearProjectionTabProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  onTaxYearChange = () => {},
  onEmployeeCountChange = () => {},
  onAverageSalaryChange = () => {},
  onCalculate = () => {},
  onReset = () => {},
}) => {
  // Local state for projection settings
  const [projectionYears, setProjectionYears] = useState(3);
  const [employeeGrowthRate, setEmployeeGrowthRate] = useState(5);
  const [salaryGrowthRate, setSalaryGrowthRate] = useState(3);
  const [contributionGrowthRate, setContributionGrowthRate] = useState(2);

  // Handle calculate button click
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(e);
  };

  return (
    <form onSubmit={handleCalculate}>
      <CalculatorForm
        taxYear={taxYear}
        employeeCount={employeeCount}
        averageSalary={averageSalary}
        onTaxYearChange={onTaxYearChange}
        onEmployeeCountChange={onEmployeeCountChange}
        onAverageSalaryChange={onAverageSalaryChange}
      />
      <div className="my-6 border-b border-slate-200" />
      <h4 className="text-base font-semibold mb-2">Projection Settings</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projection Years Slider */}
        <div>
          <label htmlFor="projection-years" className="block text-sm font-medium mb-1">
            Projection Years: <span className="font-semibold">{projectionYears}</span>
          </label>
          <input
            id="projection-years"
            type="range"
            min={1}
            max={5}
            step={1}
            value={projectionYears}
            onChange={e => setProjectionYears(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        {/* Employee Growth Rate Slider */}
        <div>
          <label htmlFor="employee-growth-rate" className="block text-sm font-medium mb-1">
            Annual Employee Growth Rate: <span className="font-semibold">{employeeGrowthRate}%</span>
          </label>
          <input
            id="employee-growth-rate"
            type="range"
            min={0}
            max={20}
            step={1}
            value={employeeGrowthRate}
            onChange={e => setEmployeeGrowthRate(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        {/* Salary Growth Rate Slider */}
        <div>
          <label htmlFor="salary-growth-rate" className="block text-sm font-medium mb-1">
            Annual Salary Growth Rate: <span className="font-semibold">{salaryGrowthRate}%</span>
          </label>
          <input
            id="salary-growth-rate"
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={salaryGrowthRate}
            onChange={e => setSalaryGrowthRate(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        {/* Contribution Growth Rate Slider */}
        <div>
          <label htmlFor="contribution-growth-rate" className="block text-sm font-medium mb-1">
            Annual Contribution Growth Rate: <span className="font-semibold">{contributionGrowthRate}%</span>
          </label>
          <input
            id="contribution-growth-rate"
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={contributionGrowthRate}
            onChange={e => setContributionGrowthRate(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6 justify-between">
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
          Calculate Projections
        </button>
      </div>
    </form>
  );
};

export default MultiYearProjectionTab;
