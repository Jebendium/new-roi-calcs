'use client';

import React from 'react';
import CurrencyInput from '../../shared/components/CurrencyInput';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../components/ui';

interface PersonalDetailsTabProps {
  taxYear: string;
  taxRegion: string;
  grossSalary: string;
  onTaxYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTaxRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onGrossSalaryChange: (value: string) => void;
  onCalculate: (e: React.FormEvent) => void;
  onReset: () => void;
}

const PersonalDetailsTab: React.FC<PersonalDetailsTabProps> = ({
  taxYear,
  taxRegion,
  grossSalary,
  onTaxYearChange,
  onTaxRegionChange,
  onGrossSalaryChange,
  onCalculate,
  onReset
}) => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
        <p className="text-slate-600 mb-4">
          Enter your personal details to calculate potential tax and NI savings from salary sacrifice benefits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax Year Selection */}
        <FormField 
          label="Tax Year" 
          htmlFor="tax-year"
          tooltipIcon={<InfoTooltip content="Select the tax year for the calculations" />}
        >
          <select
            id="tax-year"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={taxYear}
            onChange={onTaxYearChange}
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
        </FormField>
        
        {/* Tax Region Selection */}
        <FormField 
          label="Tax Region" 
          htmlFor="tax-region"
          tooltipIcon={<InfoTooltip content="Select your tax region as tax rates vary between UK regions" />}
        >
          <select
            id="tax-region"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={taxRegion}
            onChange={onTaxRegionChange}
          >
            <option value="uk">UK (England, Wales, N. Ireland)</option>
            <option value="scotland">Scotland</option>
          </select>
        </FormField>
      </div>
      
      <div className="mt-6">
        <FormField 
          label="Annual Gross Salary (£)" 
          htmlFor="gross-salary"
          tooltipIcon={<InfoTooltip content="Your total annual salary before any deductions" />}
        >
          <div className="w-full md:w-2/3">
            <CurrencyInput
              id="gross-salary"
              value={grossSalary}
              onChange={onGrossSalaryChange}
              min={0}
              required
            />
          </div>
        </FormField>
      </div>
      
      {/* Information box */}
      <InfoBox title="Important Information" className="mt-6">
        <p>
          This calculator provides an estimation of your potential tax and NI savings through 
          salary sacrifice benefits. The calculations are based on current tax rates and thresholds.
        </p>
      </InfoBox>
      
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue to Benefits
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsTab;