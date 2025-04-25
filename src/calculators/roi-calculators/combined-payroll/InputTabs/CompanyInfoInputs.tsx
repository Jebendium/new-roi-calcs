'use client';

import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../../components/ui';
import NumberInput from '../../../shared/components/NumberInput';
import CurrencyInput from '../../../shared/components/CurrencyInput';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

interface CompanyInfoInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  onNext: () => void;
}

/**
 * Company Information inputs for the Combined Payroll Calculator
 */
const CompanyInfoInputs: React.FC<CompanyInfoInputsProps> = ({ inputs, onChange, onNext }) => {
  // Handler for number input changes
  const handleNumberChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Handler for currency input changes
  const handleCurrencyChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Company Information</h3>
      <p className="text-sm text-slate-600 mb-4">
        Please provide basic information about your organisation's payroll operations.
      </p>

      <InfoBox title="Why this information matters" className="mb-6">
        <p>
          Accurate information about your company size and payroll operations is essential for calculating potential ROI. 
          This data helps us estimate the impact of both payroll system improvements and managed payroll services.
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Organisation Size</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Total Number of Employees" 
              htmlFor="employee-count"
              tooltip="The total number of employees on your payroll"
              tooltipIcon={<InfoTooltip content="The total number of employees on your payroll" />}
              required
            >
              <NumberInput
                id="employee-count"
                value={inputs.employeeCount}
                onChange={handleNumberChange('employeeCount')}
                min={1}
                required
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Payroll Staff Count" 
              htmlFor="payroll-staff-count"
              tooltip="Number of staff dedicated to payroll operations"
              tooltipIcon={<InfoTooltip content="Number of staff dedicated to payroll operations" />}
              required
            >
              <NumberInput
                id="payroll-staff-count"
                value={inputs.payrollStaffCount}
                onChange={handleNumberChange('payrollStaffCount')}
                min={0}
                step={0.5}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Cost Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Average Payroll Staff Salary (£)" 
              htmlFor="payroll-staff-salary"
              tooltip="Average annual salary for payroll staff"
              tooltipIcon={<InfoTooltip content="Average annual salary for payroll staff" />}
              required
            >
              <CurrencyInput
                id="payroll-staff-salary"
                value={inputs.payrollStaffSalary}
                onChange={handleCurrencyChange('payrollStaffSalary')}
                min={0}
                required
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Average Hourly Rate (£)" 
              htmlFor="avg-hourly-rate"
              tooltip="Average hourly cost including benefits"
              tooltipIcon={<InfoTooltip content="Average hourly rate used for time savings calculations, should include employee benefits" />}
              required
            >
              <CurrencyInput
                id="avg-hourly-rate"
                value={inputs.avgHourlyRate}
                onChange={handleCurrencyChange('avgHourlyRate')}
                min={0}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Payroll Frequency</h4>
        <p className="text-sm text-slate-600 mb-4">
          Enter the number of each type of payroll run you process. For example, if you process one monthly payroll for all employees, enter 1 for Monthly and 0 for all others.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FormField 
              label="Monthly Payrolls" 
              htmlFor="monthly-payrolls-count"
              tooltip="Number of monthly payroll runs"
              tooltipIcon={<InfoTooltip content="Number of monthly payroll runs" />}
            >
              <NumberInput
                id="monthly-payrolls-count"
                value={inputs.monthlyPayrollsCount}
                onChange={handleNumberChange('monthlyPayrollsCount')}
                min={0}
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Four-Weekly Payrolls" 
              htmlFor="four-weekly-payrolls-count"
              tooltip="Number of four-weekly payroll runs"
              tooltipIcon={<InfoTooltip content="Number of four-weekly payroll runs" />}
            >
              <NumberInput
                id="four-weekly-payrolls-count"
                value={inputs.fourWeeklyPayrollsCount}
                onChange={handleNumberChange('fourWeeklyPayrollsCount')}
                min={0}
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Fortnightly Payrolls" 
              htmlFor="fortnightly-payrolls-count"
              tooltip="Number of fortnightly payroll runs"
              tooltipIcon={<InfoTooltip content="Number of fortnightly payroll runs" />}
            >
              <NumberInput
                id="fortnightly-payrolls-count"
                value={inputs.fortnightlyPayrollsCount}
                onChange={handleNumberChange('fortnightlyPayrollsCount')}
                min={0}
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Weekly Payrolls" 
              htmlFor="weekly-payrolls-count"
              tooltip="Number of weekly payroll runs"
              tooltipIcon={<InfoTooltip content="Number of weekly payroll runs" />}
            >
              <NumberInput
                id="weekly-payrolls-count"
                value={inputs.weeklyPayrollsCount}
                onChange={handleNumberChange('weeklyPayrollsCount')}
                min={0}
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Lunar Payrolls" 
              htmlFor="lunar-payrolls-count"
              tooltip="Number of lunar (13x per year) payroll runs"
              tooltipIcon={<InfoTooltip content="Number of lunar (13x per year) payroll runs" />}
            >
              <NumberInput
                id="lunar-payrolls-count"
                value={inputs.lunarPayrollsCount}
                onChange={handleNumberChange('lunarPayrollsCount')}
                min={0}
              />
            </FormField>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onNext}
        >
          Next: Current Costs
        </button>
      </div>
    </div>
  );
};

export default CompanyInfoInputs;