import { useMemo } from 'react';
import { CombinedPayrollInputs, ValidationWarning } from '../../../../types/combinedPayrollTypes';

/**
 * Hook to validate inputs for the combined payroll calculator
 * 
 * @param inputs - The calculator inputs
 * @returns An array of validation warnings
 */
const useValidation = (inputs: CombinedPayrollInputs): ValidationWarning[] => {
  const warnings = useMemo(() => {
    const result: ValidationWarning[] = [];
    
    // Check if at least one payroll frequency is greater than 0
    const hasAnyPayrollFrequency = 
      inputs.monthlyPayrollsCount > 0 ||
      inputs.fourWeeklyPayrollsCount > 0 ||
      inputs.weeklyPayrollsCount > 0 ||
      inputs.fortnightlyPayrollsCount > 0 ||
      inputs.lunarPayrollsCount > 0;
      
    if (!hasAnyPayrollFrequency) {
      result.push({
        field: 'monthlyPayrollsCount',
        message: 'At least one payroll frequency must be greater than 0',
        type: 'error'
      });
    }
    
    // Minimum wage in the UK (as of 2025)
    const UK_MINIMUM_WAGE = 12.21;
    
    // Input Range Validations
    if (inputs.employeeCount <= 0) {
      result.push({
        field: 'employeeCount',
        message: 'Employee count must be greater than 0',
        type: 'error'
      });
    }
    
    if (inputs.payrollStaffCount < 0) {
      result.push({
        field: 'payrollStaffCount',
        message: 'Payroll staff count cannot be negative',
        type: 'error'
      });
    }
    
    if (inputs.avgHourlyRate < UK_MINIMUM_WAGE) {
      result.push({
        field: 'avgHourlyRate',
        message: `Hourly rate must be at least £${UK_MINIMUM_WAGE} (UK minimum wage)`,
        type: 'error'
      });
    }
    
    // Percentage fields
    const percentageFields = [
      { field: 'processingTimeReduction', label: 'Processing time reduction' },
      { field: 'yearEndTimeReduction', label: 'Year-end time reduction' },
      { field: 'queryReduction', label: 'Query reduction' },
      { field: 'errorReduction', label: 'Error reduction' },
      { field: 'complianceReduction', label: 'Compliance reduction' },
    ];
    
    percentageFields.forEach(({ field, label }) => {
      const value = inputs[field as keyof CombinedPayrollInputs] as number;
      if (value < 0 || value > 100) {
        result.push({
          field,
          message: `${label} must be between 0% and 100%`,
          type: 'error'
        });
      } else if (value > 80 && field !== 'complianceReduction') {
        result.push({
          field,
          message: `${label} of ${value}% seems unusually high. Are you sure this is correct?`,
          type: 'warning'
        });
      }
    });
    
    // Check if negative values in non-negative fields
    const nonNegativeFields = [
      { field: 'hoursPerPayRun', label: 'Hours per pay run' },
      { field: 'yearEndHours', label: 'Year-end hours' },
      { field: 'queryHandlingHoursPerMonth', label: 'Query handling hours' },
      { field: 'annualPayrollErrors', label: 'Annual payroll errors' },
      { field: 'avgReworkCost', label: 'Average rework cost' },
      { field: 'annualComplianceIssues', label: 'Annual compliance issues' },
      { field: 'avgComplianceCost', label: 'Average compliance cost' },
      { field: 'monthlyPrintingCosts', label: 'Monthly printing costs' },
      { field: 'monthlyDistributionCosts', label: 'Monthly distribution costs' },
      { field: 'monthlyCost', label: 'Monthly cost' },
      { field: 'additionalMonthlyCosts', label: 'Additional monthly costs' },
      { field: 'additionalAnnualCosts', label: 'Additional annual costs' },
      { field: 'additionalOneOffCosts', label: 'Additional one-off costs' },
    ];
    
    nonNegativeFields.forEach(({ field, label }) => {
      const value = inputs[field as keyof CombinedPayrollInputs] as number;
      if (value < 0) {
        result.push({
          field,
          message: `${label} cannot be negative`,
          type: 'error'
        });
      }
    });
    
    // Logical Validations
    const payrollStaffCost = inputs.payrollStaffCount * inputs.payrollStaffSalary;
    
    if (payrollStaffCost > inputs.currentStaffCosts) {
      result.push({
        field: 'payrollStaffCount',
        message: 'Payroll staff costs exceed total current staff costs. Please check these values.',
        type: 'warning'
      });
    }
    
    // Calculate total working hours per payroll staff per year (assuming 37.5 hour work week, 48 weeks per year)
    const totalStaffHoursPerYear = inputs.payrollStaffCount * 37.5 * 48;
    
    // Calculate total hours spent on payroll activities per year
    const totalAnnualPayRuns = 
      (inputs.monthlyPayrollsCount * 12) + 
      (inputs.fourWeeklyPayrollsCount * 13) + 
      (inputs.weeklyPayrollsCount * 52) + 
      (inputs.fortnightlyPayrollsCount * 26) +
      (inputs.lunarPayrollsCount * 13.04);
      
    const totalPayrollHoursPerYear = 
      (inputs.hoursPerPayRun * totalAnnualPayRuns) + 
      inputs.yearEndHours + 
      (inputs.queryHandlingHoursPerMonth * 12);
      
    if (totalPayrollHoursPerYear > totalStaffHoursPerYear) {
      result.push({
        field: 'hoursPerPayRun',
        message: 'Total hours spent on payroll exceeds available staff hours. Please check these values.',
        type: 'warning'
      });
    }
    
    // Check reasonable payroll staff to employee ratio
    const employeesToPayrollStaffRatio = inputs.employeeCount / inputs.payrollStaffCount;
    
    // Industry benchmark: typically 1 payroll person per 250-300 employees for medium-sized companies
    if (employeesToPayrollStaffRatio > 500 && inputs.employeeCount > 100) {
      result.push({
        field: 'payrollStaffCount',
        message: `${inputs.payrollStaffCount} payroll staff for ${inputs.employeeCount} employees seems unusually low. Industry average is ~1:250-300.`,
        type: 'warning'
      });
    } else if (employeesToPayrollStaffRatio < 50 && inputs.employeeCount > 50) {
      result.push({
        field: 'payrollStaffCount',
        message: `${inputs.payrollStaffCount} payroll staff for ${inputs.employeeCount} employees seems unusually high. Industry average is ~1:250-300.`,
        type: 'warning'
      });
    }
    
    return result;
  }, [inputs]);
  
  return warnings;
};

export default useValidation;