import React from 'react';
import { FormSection, FormField, CurrencyInput, PercentageInput, NumberInput, ValidationWarnings } from '../../shared/components';
import { FormValues } from '../../core/types';

interface EmployerNIFormProps {
  values: FormValues;
  errors: Record<string, string>;
  warnings: string[];
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  setFieldValue: (name: string, value: any) => void;
  showMethodologyLink?: boolean;
}

/**
 * EmployerNIForm - Form component for the Employer NI calculator
 * 
 * This component renders the input form for the Employer NI calculator,
 * including employee count, average salary, and pension contribution inputs.
 */
const EmployerNIForm: React.FC<EmployerNIFormProps> = ({
  values,
  errors,
  warnings,
  isSubmitting,
  onChange,
  onSubmit,
  setFieldValue,
  showMethodologyLink = true
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Employer NI Savings Calculator
        </h2>
        <p className="text-slate-600">
          Calculate how much your organisation can save in employer National Insurance 
          contributions through salary sacrifice pension schemes and other benefits.
        </p>
        
        {showMethodologyLink && (
          <p className="mt-2 text-sm">
            <a 
              href="/calculator/employer-ni/methodology" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View calculation methodology
            </a>
          </p>
        )}
      </div>
      
      <ValidationWarnings warnings={warnings} />
      
      <form onSubmit={onSubmit}>
        <FormSection 
          title="Organisation Details"
          description="Enter information about your organisation's workforce."
        >
          <FormField
            label="Number of Employees"
            htmlFor="employeeCount"
            tooltip="The total number of employees in your organisation."
            error={errors.employeeCount}
            required
          >
            <NumberInput
              id="employeeCount"
              name="employeeCount"
              value={values.employeeCount || ''}
              onChange={(value) => setFieldValue('employeeCount', value)}
              min={1}
              placeholder="e.g. 100"
              allowDecimals={false}
              required
            />
          </FormField>
          
          <FormField
            label="Average Annual Salary"
            htmlFor="averageSalary"
            tooltip="The average annual salary across your organisation."
            error={errors.averageSalary}
            required
          >
            <CurrencyInput
              id="averageSalary"
              name="averageSalary"
              value={values.averageSalary || ''}
              onChange={(value) => setFieldValue('averageSalary', value)}
              min={1}
              placeholder="e.g. £30,000"
              required
            />
          </FormField>
        </FormSection>
        
        <FormSection
          title="Pension Details"
          description="Enter details about your pension scheme."
        >
          <FormField
            label="Pension Contribution (%)"
            htmlFor="pensionContribution"
            tooltip="The percentage of salary that employees contribute to their pension through salary sacrifice."
            error={errors.pensionContribution}
            required
          >
            <PercentageInput
              id="pensionContribution"
              name="pensionContribution"
              value={values.pensionContribution || ''}
              onChange={(value) => setFieldValue('pensionContribution', value)}
              min={0}
              max={100}
              placeholder="e.g. 5%"
              required
            />
          </FormField>
          
          <FormField
            label="Tax Year"
            htmlFor="taxYear"
            tooltip="The tax year for which to calculate NI savings."
            error={errors.taxYear}
          >
            <select
              id="taxYear"
              name="taxYear"
              value={values.taxYear || '2023-2024'}
              onChange={onChange}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </FormField>
          
          <FormField
            label="Include Additional Benefits"
            htmlFor="includeMultiBenefits"
            tooltip="Enable to include additional salary sacrifice benefits in the calculation."
            error={errors.includeMultiBenefits}
          >
            <div className="flex items-center">
              <input
                id="includeMultiBenefits"
                name="includeMultiBenefits"
                type="checkbox"
                checked={!!values.includeMultiBenefits}
                onChange={onChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeMultiBenefits" className="ml-2 text-sm text-slate-700">
                Include Cycle to Work, EV Car Scheme, etc.
              </label>
            </div>
          </FormField>
        </FormSection>
        
        {values.includeMultiBenefits && (
          <div className="text-center text-sm text-slate-700 mt-4 mb-6">
            <p>
              Additional benefit options will appear in the results screen.
            </p>
          </div>
        )}
        
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Calculating...' : 'Calculate Savings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerNIForm;