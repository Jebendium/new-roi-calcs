import React from 'react';
import { FormField, InfoTooltip } from '../../components/ui';
import NumberInput from '../shared/components/NumberInput';
import CurrencyInput from '../shared/components/CurrencyInput';

interface CalculatorFormProps {
  taxYear: string;
  employeeCount: string;
  averageSalary: string;
  onTaxYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEmployeeCountChange: (value: string) => void;
  onAverageSalaryChange: (value: string) => void;
}

/**
 * Standardized calculator form for company details
 * Used across multiple calculators for consistent UI/UX
 */
const CalculatorForm: React.FC<CalculatorFormProps> = ({
  taxYear,
  employeeCount,
  averageSalary,
  onTaxYearChange,
  onEmployeeCountChange,
  onAverageSalaryChange,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Tax Year" 
          htmlFor="tax-year"
          tooltipIcon={<InfoTooltip content="Select the tax year for the calculations" />}
        >
          <select
            id="tax-year"
            value={taxYear}
            onChange={onTaxYearChange}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
        </FormField>
      </div>
      
      <div className="my-4 border-b border-slate-200" />
      
      <h4 className="text-base font-semibold mb-4">Company Details</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Number of Employees" 
          htmlFor="employee-count"
          tooltipIcon={<InfoTooltip content="The total number of employees in your organisation" />}
          helperText="Enter the total headcount of your organisation"
        >
          <NumberInput
            id="employee-count"
            value={employeeCount}
            onChange={onEmployeeCountChange}
            min={1}
            required
          />
        </FormField>
        
        <FormField 
          label="Average Salary (£)" 
          htmlFor="average-salary"
          tooltipIcon={<InfoTooltip content="The average annual salary across all employees" />}
          helperText="Enter the average annual gross salary"
        >
          <CurrencyInput
            id="average-salary"
            value={averageSalary}
            onChange={onAverageSalaryChange}
            min={0}
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default CalculatorForm;