'use client';

import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../../components/ui';
import CurrencyInput from '../../../shared/components/CurrencyInput';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

interface CurrentPayrollCostsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Current Payroll Costs inputs for the Combined Payroll Calculator
 */
const CurrentPayrollCostsInputs: React.FC<CurrentPayrollCostsInputsProps> = ({ 
  inputs, 
  onChange, 
  onNext, 
  onPrevious 
}) => {
  // Handler for currency input changes
  const handleCurrencyChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Helper to calculate total current costs
  const totalCurrentCosts = 
    inputs.currentStaffCosts + 
    inputs.currentSoftwareCosts + 
    inputs.currentTrainingCosts + 
    inputs.currentInfrastructureCosts + 
    inputs.currentOtherCosts;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Current Payroll Costs</h3>
      <p className="text-sm text-slate-600 mb-4">
        Please enter your current annual costs for payroll operations. These will be used as the baseline for calculating savings.
      </p>

      <InfoBox title="Cost Categories Explained" className="mb-6">
        <p>
          <strong>Staff Costs:</strong> Total annual payroll team salaries and benefits<br />
          <strong>Software Costs:</strong> Current payroll software licenses and maintenance<br />
          <strong>Training Costs:</strong> Annual training for payroll staff<br />
          <strong>Infrastructure Costs:</strong> Hardware, hosting, and IT support for payroll<br />
          <strong>Other Costs:</strong> Any additional annual expenses related to payroll
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Annual Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Current Staff Costs (£)" 
              htmlFor="current-staff-costs"
              tooltip="Total annual cost of payroll staff (salaries and benefits)"
              tooltipIcon={<InfoTooltip content="Total annual cost of payroll staff (salaries and benefits)" />}
              required
            >
              <CurrencyInput
                id="current-staff-costs"
                value={inputs.currentStaffCosts}
                onChange={handleCurrencyChange('currentStaffCosts')}
                min={0}
                required
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Current Software Costs (£)" 
              htmlFor="current-software-costs"
              tooltip="Annual cost of payroll software licenses and maintenance"
              tooltipIcon={<InfoTooltip content="Annual cost of payroll software licenses and maintenance" />}
              required
            >
              <CurrencyInput
                id="current-software-costs"
                value={inputs.currentSoftwareCosts}
                onChange={handleCurrencyChange('currentSoftwareCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Current Training Costs (£)" 
              htmlFor="current-training-costs"
              tooltip="Annual training costs for payroll staff"
              tooltipIcon={<InfoTooltip content="Annual training costs for payroll staff" />}
              required
            >
              <CurrencyInput
                id="current-training-costs"
                value={inputs.currentTrainingCosts}
                onChange={handleCurrencyChange('currentTrainingCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Current Infrastructure Costs (£)" 
              htmlFor="current-infrastructure-costs"
              tooltip="Annual cost of hardware, hosting, and IT support for payroll"
              tooltipIcon={<InfoTooltip content="Annual cost of hardware, hosting, and IT support for payroll" />}
              required
            >
              <CurrencyInput
                id="current-infrastructure-costs"
                value={inputs.currentInfrastructureCosts}
                onChange={handleCurrencyChange('currentInfrastructureCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Other Current Costs (£)" 
              htmlFor="current-other-costs"
              tooltip="Any other annual costs related to payroll operations"
              tooltipIcon={<InfoTooltip content="Any other annual costs related to payroll operations" />}
              required
            >
              <CurrencyInput
                id="current-other-costs"
                value={inputs.currentOtherCosts}
                onChange={handleCurrencyChange('currentOtherCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col justify-center">
            <div className="text-sm text-slate-600">Total Current Annual Cost</div>
            <div className="text-xl font-semibold text-slate-800">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(totalCurrentCosts)}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              {inputs.employeeCount > 0 ? 
                `£${(totalCurrentCosts / inputs.employeeCount).toFixed(2)} per employee` : ''}
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
          Previous: Company Info
        </button>
        
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onNext}
        >
          Next: Efficiency Gains
        </button>
      </div>
    </div>
  );
};

export default CurrentPayrollCostsInputs;