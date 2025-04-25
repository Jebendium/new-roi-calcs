import React from 'react';
import { Card, FormField, InfoBox, InfoTooltip } from '../../../components/ui';
import NumberInput from '../../../calculators/shared/components/NumberInput';
import CurrencyInput from '../../../calculators/shared/components/CurrencyInput';

interface CompanyInfoTabProps {
  timeSavings: any;
  setTimeSavings: (values: any) => void;
  costInputs: any;
  setCostInputs: (values: any) => void;
  onCalculate: () => void;
  onNextTab: () => void;
}

const CompanyInfoTab: React.FC<CompanyInfoTabProps> = ({
  timeSavings,
  setTimeSavings,
  costInputs,
  setCostInputs,
  onCalculate,
  onNextTab,
}) => {
  const handleEmployeeCountChange = (value: number) => {
    setTimeSavings({ ...timeSavings, employeeCount: value });
    setCostInputs({ ...costInputs, employeeCount: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Company Information</h3>
      <p className="text-sm text-slate-600 mb-4">
        Please provide basic information about your organisation to help us calculate potential ROI for an HR system.
      </p>

      <InfoBox title="Why this information matters" className="mb-6">
        <p>
          HR systems impact different organisational roles in different ways. Understanding your team structure and costs helps us accurately estimate potential time and cost savings across your organisation.
        </p>
      </InfoBox>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Employee Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Total Number of Employees" 
              htmlFor="total-employees"
              tooltip="The total number of employees in your organisation"
              tooltipIcon={<InfoTooltip content="The total number of employees in your organisation" />}
            >
              <NumberInput
                id="total-employees"
                value={timeSavings.employeeCount}
                onChange={handleEmployeeCountChange}
                min={1}
                required
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="HR Team Size" 
              htmlFor="hr-team-size"
              tooltip="Number of staff working in HR and people operations"
              tooltipIcon={<InfoTooltip content="Number of staff working in HR and people operations" />}
            >
              <NumberInput
                id="hr-team-size"
                value={timeSavings.hrStaffCount}
                onChange={(value) => setTimeSavings({ ...timeSavings, hrStaffCount: value })}
                min={1}
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
              label="Average HR Hourly Rate (£)" 
              htmlFor="hr-hourly-rate"
              tooltip="Average hourly cost of HR staff (salary + benefits)"
              tooltipIcon={<InfoTooltip content="Average hourly cost of HR staff (salary + benefits)" />}
            >
              <CurrencyInput
                id="hr-hourly-rate"
                value={timeSavings.hrHourlyRate}
                onChange={(value) => setTimeSavings({ ...timeSavings, hrHourlyRate: value })}
                min={0}
                required
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Average Manager Hourly Rate (£)" 
              htmlFor="manager-hourly-rate"
              tooltip="Average hourly cost of managers (salary + benefits)"
              tooltipIcon={<InfoTooltip content="Average hourly cost of managers (salary + benefits)" />}
            >
              <CurrencyInput
                id="manager-hourly-rate"
                value={timeSavings.managerHourlyRate}
                onChange={(value) => setTimeSavings({ ...timeSavings, managerHourlyRate: value })}
                min={0}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-base font-medium mb-4">Financial Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField 
              label="Average Employee Hourly Rate (£)" 
              htmlFor="employee-hourly-rate"
              tooltip="Average hourly cost of general employees (salary + benefits)"
              tooltipIcon={<InfoTooltip content="Average hourly cost of general employees (salary + benefits)" />}
            >
              <CurrencyInput
                id="employee-hourly-rate"
                value={timeSavings.employeeHourlyRate}
                onChange={(value) => setTimeSavings({ ...timeSavings, employeeHourlyRate: value })}
                min={0}
                required
              />
            </FormField>
          </div>

          <div>
            <FormField 
              label="Total Annual Salary Bill (£)" 
              htmlFor="total-annual-salary"
              tooltip="Total annual salary expenditure for all employees"
              tooltipIcon={<InfoTooltip content="Total annual salary expenditure for all employees" />}
            >
              <CurrencyInput
                id="total-annual-salary"
                value={costInputs.annualSalaryBill}
                onChange={(value) => setCostInputs({ ...costInputs, annualSalaryBill: value })}
                min={0}
                step={1000}
                required
              />
            </FormField>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onNextTab}
        >
          Next: Time Savings
        </button>
      </div>
    </div>
  );
};

export default CompanyInfoTab;