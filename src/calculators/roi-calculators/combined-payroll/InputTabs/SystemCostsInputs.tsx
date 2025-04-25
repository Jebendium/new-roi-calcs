'use client';

import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../../components/ui';
import CurrencyInput from '../../../shared/components/CurrencyInput';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

interface SystemCostsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  onCalculate: () => void;
  onPrevious: () => void;
}

/**
 * System Costs inputs for the Combined Payroll Calculator
 */
const SystemCostsInputs: React.FC<SystemCostsInputsProps> = ({ 
  inputs, 
  onChange, 
  onCalculate,
  onPrevious 
}) => {
  // Handler for currency input changes
  const handleCurrencyChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Calculate total annual costs
  const totalAnnualCosts = 
    (inputs.monthlyCost * 12) + 
    (inputs.additionalMonthlyCosts * 12) + 
    inputs.additionalAnnualCosts;
  
  // Calculate total first year costs
  const totalFirstYearCosts = totalAnnualCosts + inputs.additionalOneOffCosts;
  
  // Calculate cost per employee per year
  const costPerEmployeePerYear = inputs.employeeCount > 0 
    ? totalAnnualCosts / inputs.employeeCount 
    : 0;
  
  // Calculate cost per employee per month
  const costPerEmployeePerMonth = costPerEmployeePerYear / 12;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">System/Service Costs</h3>
      <p className="text-sm text-slate-600 mb-4">
        Enter the costs of the new payroll system or managed service that you are considering.
      </p>

      <InfoBox title="Cost Structure Differences" className="mb-6" variant="info">
        <p>
          <strong>Payroll Systems</strong> typically have higher one-off costs for implementation and training, 
          with lower ongoing subscription fees, but you'll need to maintain staff to operate them.
        </p>
        <p className="mt-2">
          <strong>Managed Payroll Services</strong> usually have lower implementation costs but higher monthly fees 
          since they include service delivery and operational staff.
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Regular Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Monthly Cost (£)" 
              htmlFor="monthly-cost"
              tooltip="Monthly subscription or service fee for the payroll system/service"
              tooltipIcon={<InfoTooltip content="Monthly subscription or service fee for the payroll system/service" />}
              required
            >
              <CurrencyInput
                id="monthly-cost"
                value={inputs.monthlyCost}
                onChange={handleCurrencyChange('monthlyCost')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Additional Monthly Costs (£)" 
              htmlFor="additional-monthly-costs"
              tooltip="Any other monthly costs related to the new system/service"
              tooltipIcon={<InfoTooltip content="Any other monthly costs related to the new system/service" />}
              required
            >
              <CurrencyInput
                id="additional-monthly-costs"
                value={inputs.additionalMonthlyCosts}
                onChange={handleCurrencyChange('additionalMonthlyCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Additional Annual Costs (£)" 
              htmlFor="additional-annual-costs"
              tooltip="Any additional annual costs (e.g., annual maintenance, upgrades)"
              tooltipIcon={<InfoTooltip content="Any additional annual costs (e.g., annual maintenance, upgrades)" />}
              required
            >
              <CurrencyInput
                id="additional-annual-costs"
                value={inputs.additionalAnnualCosts}
                onChange={handleCurrencyChange('additionalAnnualCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="One-Off Implementation Costs (£)" 
              htmlFor="additional-one-off-costs"
              tooltip="Initial implementation, data migration, and training costs"
              tooltipIcon={<InfoTooltip content="Initial implementation, data migration, and training costs" />}
              required
            >
              <CurrencyInput
                id="additional-one-off-costs"
                value={inputs.additionalOneOffCosts}
                onChange={handleCurrencyChange('additionalOneOffCosts')}
                min={0}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Wage Savings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Potential Wage Savings (£)" 
              htmlFor="wage-savings"
              tooltip="Annual wage savings if staffing is reduced by implementing the new system/service"
              tooltipIcon={<InfoTooltip content="Annual wage savings if staffing is reduced by implementing the new system/service" />}
              required
            >
              <CurrencyInput
                id="wage-savings"
                value={inputs.wageSavings}
                onChange={handleCurrencyChange('wageSavings')}
                min={0}
                step={1000}
                required
              />
            </FormField>
          </div>
          
          <div className="flex flex-col justify-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Include wage savings if you expect to reduce payroll staffing levels with the new system or service.
              For managed payroll, this is typically higher as more of the work is outsourced.
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="mb-6 bg-slate-50 border border-slate-200">
        <h4 className="text-base font-medium mb-4 text-slate-800">Cost Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-slate-600">Annual Cost</div>
            <div className="text-xl font-semibold text-slate-800">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(totalAnnualCosts)}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Ongoing annual expense
            </div>
          </div>
          
          <div>
            <div className="text-sm text-slate-600">First Year Total Cost</div>
            <div className="text-xl font-semibold text-slate-800">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(totalFirstYearCosts)}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Including one-off costs
            </div>
          </div>
          
          <div>
            <div className="text-sm text-slate-600">Cost Per Employee</div>
            <div className="text-xl font-semibold text-slate-800">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              }).format(costPerEmployeePerMonth)}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Per employee per month
            </div>
          </div>
          
          <div>
            <div className="text-sm text-slate-600">Net Annual Cost</div>
            <div className="text-xl font-semibold text-slate-800">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(totalAnnualCosts - inputs.wageSavings)}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              After wage savings
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
          Previous: Paper Savings
        </button>
        
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onCalculate}
        >
          Calculate ROI
        </button>
      </div>
    </div>
  );
};

export default SystemCostsInputs;