// Business System ROI Calculation Logic
import { TaxYearData } from '../types';

/**
 * Calculate ROI for business systems such as HR, payroll, etc.
 * 
 * @param annualSystemCost Annual cost of the system
 * @param annualCostSavings Annual cost savings from the system
 * @param annualTimeSavingsHours Annual time savings in hours
 * @param productivityGainPercent Productivity gain percentage
 * @param numEmployees Number of employees
 * @param avgHourlyRate Average hourly rate
 * @returns ROI calculation results
 */
export function calculateBusinessSystemROI({
  annualSystemCost,
  annualCostSavings,
  annualTimeSavingsHours,
  productivityGainPercent,
  numEmployees,
  avgHourlyRate,
  implementationCost = 0,
  annualMaintenanceCost = 0,
  years = 5
}: {
  annualSystemCost: number;
  annualCostSavings: number;
  annualTimeSavingsHours: number;
  productivityGainPercent: number;
  numEmployees: number;
  avgHourlyRate: number;
  implementationCost?: number;
  annualMaintenanceCost?: number;
  years?: number;
}): {
  totalSavings: number;
  roi: number;
  paybackPeriodMonths: number;
  fiveYearTCO: number;
  breakdown: Record<string, number>;
} {
  // Calculate time savings value
  const timeSavingsValue = annualTimeSavingsHours * avgHourlyRate;
  
  // Calculate productivity value (assuming 2080 working hours per year = 40 hours * 52 weeks)
  const productivityValue = (productivityGainPercent / 100) * numEmployees * avgHourlyRate * 2080; 
  
  // Calculate total annual savings
  const totalAnnualSavings = annualCostSavings + timeSavingsValue + productivityValue;
  
  // Calculate total annual cost
  const totalAnnualCost = annualSystemCost + annualMaintenanceCost;
  
  // Calculate net annual benefit
  const netAnnualBenefit = totalAnnualSavings - totalAnnualCost;
  
  // Calculate ROI
  const totalInvestment = implementationCost + totalAnnualCost;
  const firstYearROI = (netAnnualBenefit - implementationCost) / totalInvestment;
  
  // Calculate multi-year ROI
  const multiYearROI = ((netAnnualBenefit * years) - implementationCost) / 
    (implementationCost + (totalAnnualCost * years));
  
  // Calculate payback period in months
  const paybackPeriodMonths = netAnnualBenefit > 0 ? 
    (implementationCost / (netAnnualBenefit / 12)) : 0;
  
  // Calculate 5-year Total Cost of Ownership
  const fiveYearTCO = implementationCost + (totalAnnualCost * years) - (netAnnualBenefit * years);
  
  return {
    totalSavings: totalAnnualSavings,
    roi: multiYearROI,
    paybackPeriodMonths,
    fiveYearTCO,
    breakdown: {
      annualCostSavings,
      timeSavingsValue,
      productivityValue,
      implementationCost,
      annualSystemCost,
      annualMaintenanceCost,
      netAnnualBenefit,
      firstYearROI: firstYearROI * 100, // as percentage
      multiYearROI: multiYearROI * 100  // as percentage
    }
  };
}

/**
 * Calculate comprehensive ROI for HRIS system with detailed breakdown
 */
export function calculateHRISSystemROI({
  employeeCount,
  avgSalary,
  hrStaffCount,
  avgHRHourlyRate,
  adminHoursPerWeek,
  adminTimeReduction,
  queryHandlingHoursPerWeek,
  queryReduction,
  annualErrors,
  avgErrorCost,
  errorReduction,
  turnoverRate,
  avgReplacementCost,
  turnoverReduction,
  softwareCost,
  implementationCost,
  annualMaintenanceCost,
  years = 5
}: {
  employeeCount: number;
  avgSalary: number;
  hrStaffCount: number;
  avgHRHourlyRate: number;
  adminHoursPerWeek: number;
  adminTimeReduction: number;
  queryHandlingHoursPerWeek: number;
  queryReduction: number;
  annualErrors: number;
  avgErrorCost: number;
  errorReduction: number;
  turnoverRate: number;
  avgReplacementCost: number;
  turnoverReduction: number;
  softwareCost: number;
  implementationCost: number;
  annualMaintenanceCost: number;
  years?: number;
}) {
  // Calculate admin time savings
  const weeksPerYear = 52;
  const adminTimeSavings = 
    hrStaffCount * 
    avgHRHourlyRate * 
    adminHoursPerWeek * 
    (adminTimeReduction / 100) * 
    weeksPerYear;
  
  // Calculate query handling time savings
  const queryHandlingTimeSavings = 
    hrStaffCount * 
    avgHRHourlyRate * 
    queryHandlingHoursPerWeek * 
    (queryReduction / 100) * 
    weeksPerYear;
  
  // Calculate error reduction savings
  const errorSavings = 
    annualErrors * 
    avgErrorCost * 
    (errorReduction / 100);
  
  // Calculate turnover reduction savings
  const currentTurnoverCount = employeeCount * (turnoverRate / 100);
  const reducedTurnoverCount = currentTurnoverCount * (1 - (turnoverReduction / 100));
  const turnoverSavings = (currentTurnoverCount - reducedTurnoverCount) * avgReplacementCost;
  
  // Calculate total annual savings
  const totalAnnualSavings = adminTimeSavings + queryHandlingTimeSavings + errorSavings + turnoverSavings;
  
  // Calculate ROI
  const totalAnnualCost = softwareCost + annualMaintenanceCost;
  const netAnnualBenefit = totalAnnualSavings - totalAnnualCost;
  
  const totalInvestment = implementationCost + totalAnnualCost;
  const firstYearROI = ((netAnnualBenefit - implementationCost) / totalInvestment) * 100;
  
  // Calculate multi-year ROI
  const multiYearROI = (((netAnnualBenefit * years) - implementationCost) / 
    (implementationCost + (totalAnnualCost * years))) * 100;
  
  // Calculate payback period in months
  const paybackPeriodMonths = netAnnualBenefit > 0 ? 
    (implementationCost / (netAnnualBenefit / 12)) : 0;
  
  // Calculate 5-year Total Cost of Ownership
  const fiveYearTCO = implementationCost + (totalAnnualCost * years) - (netAnnualBenefit * years);
  
  return {
    adminTimeSavings,
    queryHandlingTimeSavings,
    errorSavings,
    turnoverSavings,
    totalAnnualSavings,
    implementationCost,
    annualSoftwareCost: softwareCost,
    annualMaintenanceCost,
    totalAnnualCost,
    netAnnualBenefit,
    firstYearROI,
    multiYearROI,
    paybackPeriodMonths,
    fiveYearTCO,
    savingsPerEmployee: netAnnualBenefit / employeeCount
  };
}

/**
 * Calculate Payroll System ROI
 */
export function calculatePayrollSystemROI({
  employeeCount,
  monthlyPayrollRuns,
  hoursPerPayroll,
  avgHourlyRate,
  currentSoftwareCost,
  currentStaffCost,
  newSoftwareCost,
  implementationCost,
  efficiencyGainPercent,
  errorRate,
  errorReductionPercent,
  avgErrorCost,
  years = 5
}: {
  employeeCount: number;
  monthlyPayrollRuns: number;
  hoursPerPayroll: number;
  avgHourlyRate: number;
  currentSoftwareCost: number;
  currentStaffCost: number;
  newSoftwareCost: number;
  implementationCost: number;
  efficiencyGainPercent: number;
  errorRate: number;
  errorReductionPercent: number;
  avgErrorCost: number;
  years?: number;
}) {
  // Annual payroll runs
  const annualPayrollRuns = monthlyPayrollRuns * 12;
  
  // Current payroll processing cost
  const currentProcessingHours = hoursPerPayroll * annualPayrollRuns;
  const currentProcessingCost = currentProcessingHours * avgHourlyRate;
  const currentTotalCost = currentProcessingCost + currentSoftwareCost + currentStaffCost;
  
  // New payroll processing cost
  const newProcessingHours = currentProcessingHours * (1 - (efficiencyGainPercent / 100));
  const newProcessingCost = newProcessingHours * avgHourlyRate;
  const staffSavings = currentStaffCost * (efficiencyGainPercent / 100);
  const newTotalCost = newProcessingCost + newSoftwareCost + (currentStaffCost - staffSavings);
  
  // Time savings
  const timeSavings = currentProcessingCost - newProcessingCost + staffSavings;
  
  // Error reduction savings
  const currentErrors = employeeCount * (errorRate / 100) * 12; // Annual errors
  const currentErrorCost = currentErrors * avgErrorCost;
  const newErrorCost = currentErrorCost * (1 - (errorReductionPercent / 100));
  const errorSavings = currentErrorCost - newErrorCost;
  
  // Total savings
  const totalAnnualSavings = timeSavings + errorSavings;
  const costDifference = currentTotalCost - newTotalCost;
  
  // ROI calculations
  const netAnnualBenefit = totalAnnualSavings - newSoftwareCost;
  const firstYearROI = ((netAnnualBenefit - implementationCost) / (implementationCost + newSoftwareCost)) * 100;
  const multiYearROI = (((netAnnualBenefit * years) - implementationCost) / 
    (implementationCost + (newSoftwareCost * years))) * 100;
  
  // Payback period
  const paybackPeriodMonths = netAnnualBenefit > 0 ? 
    (implementationCost / (netAnnualBenefit / 12)) : 0;
  
  // Cost per payslip
  const totalPayslips = employeeCount * annualPayrollRuns;
  const currentCostPerPayslip = currentTotalCost / totalPayslips;
  const newCostPerPayslip = newTotalCost / totalPayslips;
  
  return {
    timeSavings,
    errorSavings,
    totalAnnualSavings,
    currentTotalCost,
    newTotalCost,
    costDifference,
    implementationCost,
    netAnnualBenefit,
    firstYearROI,
    multiYearROI,
    paybackPeriodMonths,
    savingsPerEmployee: netAnnualBenefit / employeeCount,
    currentCostPerPayslip,
    newCostPerPayslip
  };
}
