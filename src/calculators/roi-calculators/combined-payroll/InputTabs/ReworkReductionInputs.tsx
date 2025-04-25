'use client';

import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../../components/ui';
import NumberInput from '../../../shared/components/NumberInput';
import CurrencyInput from '../../../shared/components/CurrencyInput';
import PercentageInput from '../../../shared/components/PercentageInput';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

interface ReworkReductionInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Rework Reduction inputs for the Combined Payroll Calculator
 */
const ReworkReductionInputs: React.FC<ReworkReductionInputsProps> = ({ 
  inputs, 
  onChange, 
  onNext, 
  onPrevious 
}) => {
  // Handler for number input changes
  const handleNumberChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Handler for currency input changes
  const handleCurrencyChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Handler for percentage input changes
  const handlePercentageChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Calculate potential error reduction savings
  const errorReductionSavings = 
    inputs.annualPayrollErrors * 
    inputs.avgReworkCost * 
    (inputs.errorReduction / 100);
  
  // Calculate potential compliance savings
  const complianceSavings = 
    inputs.annualComplianceIssues * 
    inputs.avgComplianceCost * 
    (inputs.complianceReduction / 100);
  
  // Calculate total potential savings
  const totalSavings = errorReductionSavings + complianceSavings;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Error & Compliance Reduction</h3>
      <p className="text-sm text-slate-600 mb-4">
        Estimate the current costs of payroll errors and compliance issues, and the potential savings from reducing them.
      </p>

      <InfoBox title="Impact of Errors" className="mb-6" variant="warning">
        <p>
          Payroll errors and compliance issues can be costly beyond just the time spent correcting them.
          They can impact employee trust, cause penalties, and create tax complications.
          Modern payroll systems and services can significantly reduce these errors through automation and expert oversight.
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Error Handling</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FormField 
              label="Annual Payroll Errors" 
              htmlFor="annual-payroll-errors"
              tooltip="Number of payroll errors that require correction annually"
              tooltipIcon={<InfoTooltip content="Number of payroll errors that require correction annually" />}
              required
            >
              <NumberInput
                id="annual-payroll-errors"
                value={inputs.annualPayrollErrors}
                onChange={handleNumberChange('annualPayrollErrors')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Average Cost Per Error (£)" 
              htmlFor="avg-rework-cost"
              tooltip="Average cost to correct each payroll error (including time and any financial impact)"
              tooltipIcon={<InfoTooltip content="Average cost to correct each payroll error (including time and any financial impact)" />}
              required
            >
              <CurrencyInput
                id="avg-rework-cost"
                value={inputs.avgReworkCost}
                onChange={handleCurrencyChange('avgReworkCost')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Error Reduction Percentage" 
              htmlFor="error-reduction"
              tooltip="Percentage reduction in payroll errors expected with new system/service"
              tooltipIcon={<InfoTooltip content="Percentage reduction in payroll errors expected with new system/service" />}
              required
            >
              <PercentageInput
                id="error-reduction"
                value={inputs.errorReduction}
                onChange={handlePercentageChange('errorReduction')}
                min={0}
                max={100}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Compliance Issues</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FormField 
              label="Annual Compliance Issues" 
              htmlFor="annual-compliance-issues"
              tooltip="Number of compliance issues or risks annually (e.g., late filings, reporting errors)"
              tooltipIcon={<InfoTooltip content="Number of compliance issues or risks annually (e.g., late filings, reporting errors)" />}
              required
            >
              <NumberInput
                id="annual-compliance-issues"
                value={inputs.annualComplianceIssues}
                onChange={handleNumberChange('annualComplianceIssues')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Average Cost Per Issue (£)" 
              htmlFor="avg-compliance-cost"
              tooltip="Average cost per compliance issue (including penalties, remediation costs)"
              tooltipIcon={<InfoTooltip content="Average cost per compliance issue (including penalties, remediation costs)" />}
              required
            >
              <CurrencyInput
                id="avg-compliance-cost"
                value={inputs.avgComplianceCost}
                onChange={handleCurrencyChange('avgComplianceCost')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Compliance Reduction Percentage" 
              htmlFor="compliance-reduction"
              tooltip="Percentage reduction in compliance issues expected with new system/service"
              tooltipIcon={<InfoTooltip content="Percentage reduction in compliance issues expected with new system/service" />}
              required
            >
              <PercentageInput
                id="compliance-reduction"
                value={inputs.complianceReduction}
                onChange={handlePercentageChange('complianceReduction')}
                min={0}
                max={100}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>
      
      <Card className="mb-6 bg-amber-50 border border-amber-100">
        <h4 className="text-base font-medium mb-4 text-amber-800">Potential Annual Savings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-amber-700">Error Reduction Savings</div>
            <div className="text-xl font-semibold text-amber-900">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(errorReductionSavings)}
            </div>
            <div className="text-sm text-amber-700 mt-1">
              From {inputs.errorReduction}% fewer errors
            </div>
          </div>
          
          <div>
            <div className="text-sm text-amber-700">Compliance Improvement Savings</div>
            <div className="text-xl font-semibold text-amber-900">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(complianceSavings)}
            </div>
            <div className="text-sm text-amber-700 mt-1">
              From {inputs.complianceReduction}% fewer compliance issues
            </div>
          </div>
          
          <div className="md:col-span-2 pt-4 border-t border-amber-200">
            <div className="text-sm text-amber-700">Total Annual Savings</div>
            <div className="text-2xl font-bold text-amber-900">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(totalSavings)}
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
          Previous: Efficiency Gains
        </button>
        
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onNext}
        >
          Next: Paper Savings
        </button>
      </div>
    </div>
  );
};

export default ReworkReductionInputs;