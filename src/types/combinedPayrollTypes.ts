// Combined Payroll Calculator Types

/**
 * Validation warning for input fields
 */
export interface ValidationWarning {
  field: string;
  message: string;
  type: 'error' | 'warning';
}

/**
 * Input structure for the combined payroll calculator
 */
export interface CombinedPayrollInputs {
  // Company information
  employeeCount: number;
  payrollStaffCount: number;
  payrollStaffSalary: number;
  avgHourlyRate: number;
  
  // Payroll runs per frequency
  monthlyPayrollsCount: number;
  fourWeeklyPayrollsCount: number;
  weeklyPayrollsCount: number;
  fortnightlyPayrollsCount: number;
  lunarPayrollsCount: number;
  
  // Current costs
  currentStaffCosts: number;
  currentSoftwareCosts: number;
  currentTrainingCosts: number;
  currentInfrastructureCosts: number;
  currentOtherCosts: number;
  
  // Time spent on payroll activities
  hoursPerPayRun: number;
  yearEndHours: number;
  queryHandlingHoursPerMonth: number;
  
  // Efficiency gains percentages
  processingTimeReduction: number;
  yearEndTimeReduction: number;
  queryReduction: number;
  
  // Error handling
  annualPayrollErrors: number;
  avgReworkCost: number;
  errorReduction: number;
  
  // Compliance
  annualComplianceIssues: number;
  avgComplianceCost: number;
  complianceReduction: number;
  
  // Paper costs
  monthlyPrintingCosts: number;
  monthlyDistributionCosts: number;
  
  // New system/service costs
  monthlyCost: number;
  additionalMonthlyCosts: number;
  additionalAnnualCosts: number;
  additionalOneOffCosts: number;
  
  // Wage savings if staffing is reduced
  wageSavings: number;
}

/**
 * Default input values for the combined payroll calculator
 */
export const defaultCombinedPayrollInputs: CombinedPayrollInputs = {
  // Company information
  employeeCount: 100,
  payrollStaffCount: 1,
  payrollStaffSalary: 35000,
  avgHourlyRate: 18,
  
  // Payroll runs per frequency
  monthlyPayrollsCount: 1,
  fourWeeklyPayrollsCount: 0,
  weeklyPayrollsCount: 0,
  fortnightlyPayrollsCount: 0,
  lunarPayrollsCount: 0,
  
  // Current costs
  currentStaffCosts: 35000,
  currentSoftwareCosts: 2400,
  currentTrainingCosts: 1000,
  currentInfrastructureCosts: 500,
  currentOtherCosts: 1200,
  
  // Time spent on payroll activities
  hoursPerPayRun: 8,
  yearEndHours: 24,
  queryHandlingHoursPerMonth: 8,
  
  // Efficiency gains percentages
  processingTimeReduction: 60,
  yearEndTimeReduction: 50,
  queryReduction: 40,
  
  // Error handling
  annualPayrollErrors: 24,
  avgReworkCost: 50,
  errorReduction: 70,
  
  // Compliance
  annualComplianceIssues: 3,
  avgComplianceCost: 250,
  complianceReduction: 90,
  
  // Paper costs
  monthlyPrintingCosts: 100,
  monthlyDistributionCosts: 50,
  
  // New system/service costs
  monthlyCost: 300,
  additionalMonthlyCosts: 0,
  additionalAnnualCosts: 500,
  additionalOneOffCosts: 2500,
  
  // Wage savings if staffing is reduced
  wageSavings: 0
};

/**
 * Results of the Payroll System ROI calculation
 */
export interface PayrollSystemResults {
  // Savings Breakdown
  efficiencySavings: number;
  errorReductionSavings: number;
  paperSavings: number;
  wageSavings: number;
  totalAnnualBenefits: number;
  
  // Costs
  initialInvestment: number;
  annualCosts: number;
  
  // Final Metrics
  netAnnualBenefit: number;
  firstYearROI: number;
  threeYearROI: number;
  fiveYearROI: number;
  paybackPeriodMonths: number;
  savingsPerEmployee: number;
  costPerPayslip: number;
  totalCostOfOwnership5Year: number;
}

/**
 * Results of the Managed Payroll ROI calculation
 */
export interface ManagedPayrollResults {
  // Savings Breakdown
  staffSavings: number;
  softwareSavings: number;
  infrastructureSavings: number;
  trainingAndOtherSavings: number;
  errorReductionSavings: number;
  complianceSavings: number;
  paperSavings: number;
  totalAnnualBenefits: number;
  
  // Costs
  initialInvestment: number;
  annualCosts: number;
  
  // Final Metrics
  netAnnualBenefit: number;
  firstYearROI: number;
  threeYearROI: number;
  fiveYearROI: number;
  paybackPeriodMonths: number;
  savingsPerEmployee: number;
  costPerPayslip: number;
  totalCostOfOwnership5Year: number;
}

/**
 * Add the combined-payroll calculator to the CalculatorType
 */
export type CombinedPayrollCalculatorType = 'combined-payroll';
