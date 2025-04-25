// HRIS ROI Calculator Logic
import { 
  TimeSavingsInput, 
  ErrorReductionInput, 
  StrategicValueInput, 
  HRISCostInput, 
  HRISROIResults 
} from '../types';

/**
 * Calculate ROI for HRIS systems
 * 
 * @param timeSavings Input values for time savings calculations
 * @param errorReduction Input values for error reduction calculations
 * @param strategicValue Input values for strategic value calculations
 * @param costInputs Input values for cost calculations
 * @returns Comprehensive ROI calculation results
 */
export function calculateHRISResults(
  timeSavings: TimeSavingsInput,
  errorReduction: ErrorReductionInput,
  strategicValue: StrategicValueInput,
  costInputs: HRISCostInput
): HRISROIResults {
  // Calculate time savings
  const weeksPerYear = 52;
  const adminTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.adminHoursPerWeek * 
    (timeSavings.adminTimeReduction / 100) * 
    weeksPerYear;
  
  const dataEntryTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.dataEntryHoursPerWeek * 
    (timeSavings.dataEntryTimeReduction / 100) * 
    weeksPerYear;
  
  const reportingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.reportingHoursPerWeek * 
    (timeSavings.reportingTimeReduction / 100) * 
    weeksPerYear;
  
  const queryHandlingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.queryHandlingHoursPerWeek * 
    (timeSavings.queryReduction / 100) * 
    weeksPerYear;
  
  const totalTimeSavings = adminTimeSavings + dataEntryTimeSavings + reportingTimeSavings + queryHandlingTimeSavings;
  
  // Calculate error reduction savings
  const payrollErrorSavings = 
    errorReduction.annualPayrollErrors * 
    errorReduction.avgErrorCost * 
    (errorReduction.payrollErrorReduction / 100);
  
  const complianceIssueSavings = 
    errorReduction.annualComplianceIssues * 
    errorReduction.avgComplianceCost * 
    (errorReduction.complianceIssueReduction / 100);
  
  const totalErrorSavings = payrollErrorSavings + complianceIssueSavings;
  
  // Calculate strategic value
  const turnoverSavings = 
    strategicValue.annualEmployeeTurnover / 100 * 
    costInputs.employeeCount * 
    strategicValue.avgReplacementCost * 
    (strategicValue.turnoverReduction / 100);
  
  const decisionMakingValue = strategicValue.improvedDecisionMakingValue;
  
  const totalStrategicValue = turnoverSavings + decisionMakingValue;
  
  // Calculate costs
  const initialInvestment = 
    costInputs.implementationCost + 
    costInputs.trainingCost +
    (costInputs.initialSoftwareCost || 0) +
    (costInputs.dataMigrationCost || 0);
  
  const annualCosts = costInputs.annualLicenseFee + (costInputs.annualSupportCost || 0);
  
  // Calculate total benefits and ROI
  const totalAnnualBenefits = totalTimeSavings + totalErrorSavings + totalStrategicValue;
  const netAnnualBenefit = totalAnnualBenefits - annualCosts;
  
  const firstYearROI = ((netAnnualBenefit - initialInvestment) / initialInvestment) * 100;
  const threeYearROI = ((netAnnualBenefit * 3 - initialInvestment) / initialInvestment) * 100;
  const fiveYearROI = ((netAnnualBenefit * 5 - initialInvestment) / initialInvestment) * 100;
  
  // Calculate payback period in months
  const paybackPeriodMonths = (initialInvestment / netAnnualBenefit) * 12;
  
  // Calculate savings per employee
  const savingsPerEmployee = netAnnualBenefit / costInputs.employeeCount;
  
  // Return the results
  return {
    timeSavings: totalTimeSavings,
    errorReductionSavings: totalErrorSavings,
    strategicValueSavings: totalStrategicValue,
    totalAnnualBenefits,
    initialInvestment,
    annualCosts,
    netAnnualBenefit,
    firstYearROI,
    threeYearROI,
    fiveYearROI,
    paybackPeriodMonths,
    savingsPerEmployee,
    annualSavings: netAnnualBenefit,
    fiveYearSavings: netAnnualBenefit * 5 - initialInvestment,
    productivityIncrease: 0, // Not used in this calculator
    implementationCosts: initialInvestment,
    fiveYearTotalCost: initialInvestment + (annualCosts * 5)
  };
}

/**
 * Get default time savings input values
 */
export function getDefaultTimeSavingsInput(): TimeSavingsInput {
  return {
    hrStaffCount: 2,
    avgHourlyRate: 20,
    adminHoursPerWeek: 10,
    adminTimeReduction: 30,
    dataEntryHoursPerWeek: 8,
    dataEntryTimeReduction: 50,
    reportingHoursPerWeek: 5,
    reportingTimeReduction: 70,
    queryHandlingHoursPerWeek: 7,
    queryReduction: 40
  };
}

/**
 * Get default error reduction input values
 */
export function getDefaultErrorReductionInput(): ErrorReductionInput {
  return {
    annualPayrollErrors: 24,
    avgErrorCost: 150,
    payrollErrorReduction: 60,
    annualComplianceIssues: 6,
    avgComplianceCost: 1000,
    complianceIssueReduction: 80
  };
}

/**
 * Get default strategic value input values
 */
export function getDefaultStrategicValueInput(): StrategicValueInput {
  return {
    annualEmployeeTurnover: 15,
    avgReplacementCost: 5000,
    turnoverReduction: 10,
    improvedDecisionMakingValue: 5000
  };
}

/**
 * Get default HRIS cost input values
 */
export function getDefaultHRISCostInput(): HRISCostInput {
  return {
    employeeCount: 100,
    implementationCost: 10000,
    trainingCost: 5000,
    annualLicenseFee: 12000,
    initialSoftwareCost: 0,
    dataMigrationCost: 3000,
    annualSupportCost: 2000
  };
}

/**
 * Get time savings breakdown for detailed reporting
 */
export function getTimeSavingsBreakdown(timeSavings: TimeSavingsInput) {
  const weeksPerYear = 52;
  const adminTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.adminHoursPerWeek * 
    (timeSavings.adminTimeReduction / 100) * 
    weeksPerYear;
  
  const dataEntryTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.dataEntryHoursPerWeek * 
    (timeSavings.dataEntryTimeReduction / 100) * 
    weeksPerYear;
  
  const reportingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.reportingHoursPerWeek * 
    (timeSavings.reportingTimeReduction / 100) * 
    weeksPerYear;
  
  const queryHandlingTimeSavings = 
    timeSavings.hrStaffCount * 
    timeSavings.avgHourlyRate * 
    timeSavings.queryHandlingHoursPerWeek * 
    (timeSavings.queryReduction / 100) * 
    weeksPerYear;

  return {
    adminTimeSavings,
    dataEntryTimeSavings,
    reportingTimeSavings,
    queryHandlingTimeSavings,
    totalTimeSavings: adminTimeSavings + dataEntryTimeSavings + reportingTimeSavings + queryHandlingTimeSavings
  };
}
