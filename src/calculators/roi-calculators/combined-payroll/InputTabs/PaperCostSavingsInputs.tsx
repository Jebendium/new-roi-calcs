'use client';

import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../../components/ui';
import CurrencyInput from '../../../shared/components/CurrencyInput';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

interface PaperCostSavingsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Paper Cost Savings inputs for the Combined Payroll Calculator
 */
const PaperCostSavingsInputs: React.FC<PaperCostSavingsInputsProps> = ({ 
  inputs, 
  onChange, 
  onNext, 
  onPrevious 
}) => {
  // Handler for currency input changes
  const handleCurrencyChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Calculate annual paper costs
  const annualPaperCosts = (inputs.monthlyPrintingCosts + inputs.monthlyDistributionCosts) * 12;
  
  // Calculate average cost per employee per year
  const costPerEmployee = inputs.employeeCount > 0 
    ? annualPaperCosts / inputs.employeeCount 
    : 0;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Paper & Distribution Savings</h3>
      <p className="text-sm text-slate-600 mb-4">
        Estimate the current costs of printing and distributing paper payslips and reports, which can be eliminated with digital solutions.
      </p>

      <InfoBox title="Going Paperless" className="mb-6" variant="success">
        <p>
          Modern payroll systems and services typically provide online payslips and digital reports, 
          reducing or eliminating the need for paper documents. This not only saves costs but also 
          supports environmental sustainability goals and improves accessibility for employees.
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Monthly Paper Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Monthly Printing Costs (£)" 
              htmlFor="monthly-printing-costs"
              tooltip="Monthly cost of printing payslips, reports, and other payroll documents"
              tooltipIcon={<InfoTooltip content="Monthly cost of printing payslips, reports, and other payroll documents" />}
              required
            >
              <CurrencyInput
                id="monthly-printing-costs"
                value={inputs.monthlyPrintingCosts}
                onChange={handleCurrencyChange('monthlyPrintingCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Monthly Distribution Costs (£)" 
              htmlFor="monthly-distribution-costs"
              tooltip="Monthly cost of distributing payslips and reports (postage, internal delivery, etc.)"
              tooltipIcon={<InfoTooltip content="Monthly cost of distributing payslips and reports (postage, internal delivery, etc.)" />}
              required
            >
              <CurrencyInput
                id="monthly-distribution-costs"
                value={inputs.monthlyDistributionCosts}
                onChange={handleCurrencyChange('monthlyDistributionCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>
      
      <Card className="mb-6 bg-green-50 border border-green-100">
        <h4 className="text-base font-medium mb-4 text-green-800">Potential Annual Savings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-green-700">Total Annual Paper Costs</div>
            <div className="text-xl font-semibold text-green-900">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(annualPaperCosts)}
            </div>
            <div className="text-sm text-green-700 mt-1">
              12 months × £{(inputs.monthlyPrintingCosts + inputs.monthlyDistributionCosts).toFixed(2)} per month
            </div>
          </div>
          
          <div>
            <div className="text-sm text-green-700">Cost Per Employee Per Year</div>
            <div className="text-xl font-semibold text-green-900">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              }).format(costPerEmployee)}
            </div>
            <div className="text-sm text-green-700 mt-1">
              For {inputs.employeeCount} employees
            </div>
          </div>
          
          <div className="md:col-span-2 pt-4 border-t border-green-200">
            <div className="text-sm text-green-700">Environmental Impact</div>
            <div className="text-base text-green-800">
              Going paperless can save approximately {(inputs.employeeCount * 12 * 2).toLocaleString()} sheets of paper per year,
              equivalent to about {((inputs.employeeCount * 12 * 2) / 8333).toFixed(1)} trees.
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          onClick={onPrevious}
        >
          Previous: Rework Reduction
        </button>
        
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onNext}
        >
          Next: System Costs
        </button>
      </div>
    </div>
  );
};

export default PaperCostSavingsInputs;