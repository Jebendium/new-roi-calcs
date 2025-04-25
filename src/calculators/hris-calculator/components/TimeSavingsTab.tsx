import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip, ResultHighlight } from '../../../components/ui';
import NumberInput from '../../../calculators/shared/components/NumberInput';

interface TimeSavingsTabProps {
  timeSavings: any;
  setTimeSavings: (values: any) => void;
  onCalculate: () => void;
  onNextTab: () => void;
}

const TimeSavingsTab: React.FC<TimeSavingsTabProps> = ({
  timeSavings,
  setTimeSavings,
  onCalculate,
  onNextTab
}) => {
  // Calculate total hours
  const onboardingAnnualHours = timeSavings.onboardingTime * 12; // Assume 12 new hires per year
  const reportingAnnualHours = timeSavings.reportingTime * 12; // Monthly
  const dataEntryAnnualHours = timeSavings.dataEntryTime * 52; // Weekly
  const timeOffAnnualHours = timeSavings.timeOffManagementTime * 26; // Bi-weekly
  const payrollAnnualHours = timeSavings.payrollProcessingTime * 24; // Bi-monthly
  const complianceAnnualHours = timeSavings.complianceTime * 4; // Quarterly
  
  const totalAnnualHours = 
    onboardingAnnualHours + 
    reportingAnnualHours + 
    dataEntryAnnualHours + 
    timeOffAnnualHours + 
    payrollAnnualHours + 
    complianceAnnualHours;
  
  const potentialTimeSavings = Math.round(totalAnnualHours * (timeSavings.improvementPercentage / 100));

  // Handle input changes
  const handleValueChange = (field: string, value: number) => {
    setTimeSavings({ ...timeSavings, [field]: value });
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Time Spent on HR Activities</h3>
      <p className="text-sm text-slate-600 mb-4">
        Enter the average number of hours your HR team spends on each activity. The calculator will estimate the time savings from automation.
      </p>

      <InfoBox title="CIPD/CIPP Research Highlights" className="mb-6">
        <ul className="list-disc pl-5 space-y-1">
          <li>Administrative tasks can be streamlined by 40-60% with HRIS systems</li>
          <li>Self-service portals decrease HR data entry requirements by 50-70%</li>
          <li>Employee metrics are reported with 75% higher efficiency</li>
          <li>HRIS frees up HR professionals' time for more strategic, value-adding activities</li>
        </ul>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Onboarding & Reporting</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="New Employee Onboarding (hours per employee)" 
              htmlFor="onboarding-hours"
              tooltip="Average time spent onboarding each new employee including paperwork, system setup, and training"
              tooltipIcon={<InfoTooltip content="Average time spent onboarding each new employee including paperwork, system setup, and training" />}
            >
              <NumberInput
                id="onboarding-hours"
                value={timeSavings.onboardingTime}
                onChange={(value) => handleValueChange('onboardingTime', value)}
                min={0}
                step={0.5}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Annual hours: {onboardingAnnualHours.toFixed(1)} (assumes ~12 new hires/year)
              </p>
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="HR Reporting (hours per month)" 
              htmlFor="reporting-hours"
              tooltip="Time spent creating, reviewing, and distributing HR reports and analytics"
              tooltipIcon={<InfoTooltip content="Time spent creating, reviewing, and distributing HR reports and analytics" />}
            >
              <NumberInput
                id="reporting-hours"
                value={timeSavings.reportingTime}
                onChange={(value) => handleValueChange('reportingTime', value)}
                min={0}
                step={0.5}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Annual hours: {reportingAnnualHours.toFixed(1)}
              </p>
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Data Entry & Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="HR Data Entry/Updates (hours per week)" 
              htmlFor="data-entry-hours"
              tooltip="Time spent updating employee records, processing changes, and managing HR data"
              tooltipIcon={<InfoTooltip content="Time spent updating employee records, processing changes, and managing HR data" />}
            >
              <NumberInput
                id="data-entry-hours"
                value={timeSavings.dataEntryTime}
                onChange={(value) => handleValueChange('dataEntryTime', value)}
                min={0}
                step={0.5}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Annual hours: {dataEntryAnnualHours.toFixed(1)}
              </p>
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Time Off Management (hours bi-weekly)" 
              htmlFor="time-off-hours"
              tooltip="Time spent processing leave requests, tracking balances, and managing time off"
              tooltipIcon={<InfoTooltip content="Time spent processing leave requests, tracking balances, and managing time off" />}
            >
              <NumberInput
                id="time-off-hours"
                value={timeSavings.timeOffManagementTime}
                onChange={(value) => handleValueChange('timeOffManagementTime', value)}
                min={0}
                step={0.5}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Annual hours: {timeOffAnnualHours.toFixed(1)}
              </p>
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Payroll & Compliance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Payroll Processing (hours bi-monthly)" 
              htmlFor="payroll-hours"
              tooltip="Time spent on payroll-related activities including data validation and corrections"
              tooltipIcon={<InfoTooltip content="Time spent on payroll-related activities including data validation and corrections" />}
            >
              <NumberInput
                id="payroll-hours"
                value={timeSavings.payrollProcessingTime}
                onChange={(value) => handleValueChange('payrollProcessingTime', value)}
                min={0}
                step={0.5}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Annual hours: {payrollAnnualHours.toFixed(1)}
              </p>
            </FormField>
          </div>
          
          <div>
            <FormField 
              label="Compliance Activities (hours quarterly)" 
              htmlFor="compliance-hours"
              tooltip="Time spent on compliance-related activities, reporting, and document management"
              tooltipIcon={<InfoTooltip content="Time spent on compliance-related activities, reporting, and document management" />}
            >
              <NumberInput
                id="compliance-hours"
                value={timeSavings.complianceTime}
                onChange={(value) => handleValueChange('complianceTime', value)}
                min={0}
                step={0.5}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Annual hours: {complianceAnnualHours.toFixed(1)}
              </p>
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Expected Improvement</h4>
        <div className="flex justify-between items-center mb-6">
          <div className="pr-4">
            <p className="text-sm font-medium">Expected Improvement with HRIS (%)</p>
            <p className="text-xs text-slate-500">Based on CIPD research, HR systems typically improve efficiency by 40-70%</p>
          </div>
          <div className="w-36">
            <NumberInput
              id="efficiency-improvement"
              value={timeSavings.improvementPercentage}
              onChange={(value) => handleValueChange('improvementPercentage', value)}
              min={0}
              max={100}
              step={5}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ResultHighlight
            title="Total Annual HR Hours"
            value={totalAnnualHours.toFixed(0)}
            description="Hours spent annually on routine HR activities"
            variant="default"
          />
          <ResultHighlight
            title="Potential Annual Time Savings"
            value={`${potentialTimeSavings} hours`}
            description={`Based on ${timeSavings.improvementPercentage}% efficiency improvement`}
            variant="success"
          />
        </div>
      </Card>
      
      <div className="flex justify-between mt-6">
        <InfoBox title="Why Time Savings Matter" variant="info" className="flex-1 mr-4">
          <p className="text-sm">
            Time savings translate directly to cost savings and allow your HR team to focus more on strategic initiatives rather than administrative tasks.
          </p>
        </InfoBox>
        
        <div className="flex">
          <button
            type="button"
            className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors mr-2"
            onClick={onCalculate}
          >
            Calculate Results
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={onNextTab}
          >
            Next: Error Reduction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSavingsTab;