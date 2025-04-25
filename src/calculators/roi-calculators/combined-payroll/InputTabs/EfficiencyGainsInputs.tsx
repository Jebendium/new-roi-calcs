'use client';

import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../../components/ui';
import NumberInput from '../../../shared/components/NumberInput';
import PercentageInput from '../../../shared/components/PercentageInput';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

interface EfficiencyGainsInputsProps {
  inputs: CombinedPayrollInputs;
  onChange: (field: keyof CombinedPayrollInputs, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Efficiency Gains inputs for the Combined Payroll Calculator
 */
const EfficiencyGainsInputs: React.FC<EfficiencyGainsInputsProps> = ({ 
  inputs, 
  onChange, 
  onNext, 
  onPrevious 
}) => {
  // Handler for number input changes
  const handleNumberChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Handler for percentage input changes
  const handlePercentageChange = (field: keyof CombinedPayrollInputs) => (value: string) => {
    onChange(field, value === '' ? 0 : Number(value));
  };

  // Calculate annual pay runs
  const totalAnnualPayRuns = 
    (inputs.monthlyPayrollsCount * 12) + 
    (inputs.fourWeeklyPayrollsCount * 13) + 
    (inputs.weeklyPayrollsCount * 52) + 
    (inputs.fortnightlyPayrollsCount * 26) +
    (inputs.lunarPayrollsCount * 13.04);
  
  // Calculate total annual hours spent on payroll processing
  const totalAnnualHours = 
    (inputs.hoursPerPayRun * totalAnnualPayRuns) + 
    inputs.yearEndHours + 
    (inputs.queryHandlingHoursPerMonth * 12);
  
  // Calculate potential savings (in hours)
  const potentialHoursSaved = 
    (inputs.hoursPerPayRun * totalAnnualPayRuns * inputs.processingTimeReduction / 100) +
    (inputs.yearEndHours * inputs.yearEndTimeReduction / 100) +
    (inputs.queryHandlingHoursPerMonth * 12 * inputs.queryReduction / 100);
  
  // Calculate potential savings (in money)
  const potentialSavings = potentialHoursSaved * inputs.avgHourlyRate;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Efficiency Gains</h3>
      <p className="text-sm text-slate-600 mb-4">
        Estimate the time currently spent on payroll activities and the potential time savings from a new system or service.
      </p>

      <InfoBox title="Time Saving Potential" className="mb-6" variant="info">
        <p>
          Modern payroll systems and managed services can significantly reduce the time spent on regular payroll tasks.
          Typically, organisations see 40-70% reduction in processing time, 30-50% reduction in query handling,
          and 40-60% reduction in year-end activities.
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Current Time Expenditure</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Hours Per Pay Run" 
              htmlFor="hours-per-pay-run"
              tooltip="Average number of hours spent processing each payroll run"
              tooltipIcon={<InfoTooltip content="Average number of hours spent processing each payroll run" />}
              required
            >
              <NumberInput
                id="hours-per-pay-run"
                value={inputs.hoursPerPayRun}
                onChange={handleNumberChange('hoursPerPayRun')}
                min={0}
                step={0.5}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Year-End Processing Hours" 
              htmlFor="year-end-hours"
              tooltip="Total hours spent on year-end payroll activities"
              tooltipIcon={<InfoTooltip content="Total hours spent on year-end payroll activities annually" />}
              required
            >
              <NumberInput
                id="year-end-hours"
                value={inputs.yearEndHours}
                onChange={handleNumberChange('yearEndHours')}
                min={0}
                step={1}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Query Handling Hours Per Month" 
              htmlFor="query-handling-hours-per-month"
              tooltip="Hours spent monthly handling payroll queries"
              tooltipIcon={<InfoTooltip content="Hours spent monthly handling payroll queries from employees and managers" />}
              required
            >
              <NumberInput
                id="query-handling-hours-per-month"
                value={inputs.queryHandlingHoursPerMonth}
                onChange={handleNumberChange('queryHandlingHoursPerMonth')}
                min={0}
                step={0.5}
                required
              />
            </FormField>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col justify-center">
            <div className="text-sm text-slate-600">Total Annual Hours</div>
            <div className="text-xl font-semibold text-slate-800">
              {totalAnnualHours.toFixed(1)} hours
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Based on {totalAnnualPayRuns.toFixed(0)} annual pay runs
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Potential Time Savings</h4>
        <p className="text-sm text-slate-600 mb-4">
          Estimate the percentage reduction in time spent on payroll tasks with a new system or service.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FormField 
              label="Processing Time Reduction" 
              htmlFor="processing-time-reduction"
              tooltip="Percentage reduction in time spent on regular payroll processing"
              tooltipIcon={<InfoTooltip content="Percentage reduction in time spent on regular payroll processing" />}
              required
            >
              <PercentageInput
                id="processing-time-reduction"
                value={inputs.processingTimeReduction}
                onChange={handlePercentageChange('processingTimeReduction')}
                min={0}
                max={100}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Year-End Time Reduction" 
              htmlFor="year-end-time-reduction"
              tooltip="Percentage reduction in time spent on year-end activities"
              tooltipIcon={<InfoTooltip content="Percentage reduction in time spent on year-end activities" />}
              required
            >
              <PercentageInput
                id="year-end-time-reduction"
                value={inputs.yearEndTimeReduction}
                onChange={handlePercentageChange('yearEndTimeReduction')}
                min={0}
                max={100}
                required
              />
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Query Reduction" 
              htmlFor="query-reduction"
              tooltip="Percentage reduction in time spent handling queries"
              tooltipIcon={<InfoTooltip content="Percentage reduction in time spent handling payroll queries" />}
              required
            >
              <PercentageInput
                id="query-reduction"
                value={inputs.queryReduction}
                onChange={handlePercentageChange('queryReduction')}
                min={0}
                max={100}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>
      
      <Card className="mb-6 bg-blue-50 border border-blue-100">
        <h4 className="text-base font-medium mb-4 text-blue-800">Potential Annual Savings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-blue-700">Hours Saved</div>
            <div className="text-xl font-semibold text-blue-900">
              {potentialHoursSaved.toFixed(1)} hours per year
            </div>
            <div className="text-sm text-blue-700 mt-1">
              {(potentialHoursSaved / totalAnnualHours * 100).toFixed(1)}% of current time
            </div>
          </div>
          
          <div>
            <div className="text-sm text-blue-700">Financial Value</div>
            <div className="text-xl font-semibold text-blue-900">
              {new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              }).format(potentialSavings)}
            </div>
            <div className="text-sm text-blue-700 mt-1">
              Based on £{inputs.avgHourlyRate.toFixed(2)} per hour
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
          Previous: Current Costs
        </button>
        
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onNext}
        >
          Next: Rework Reduction
        </button>
      </div>
    </div>
  );
};

export default EfficiencyGainsInputs;