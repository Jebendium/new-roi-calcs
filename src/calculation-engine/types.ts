// Types for calculation engine

export interface TaxYearRegion {
  personalAllowance: number;
  basicRate: number;
  basicThreshold: number;
  higherRate: number;
  higherThreshold: number;
  additionalRate?: number;
  niPrimaryRate: number;
  niSecondaryRate: number;
  niUpperEarningsLimit?: number;
  niPrimaryUpperRate?: number;
  niSecondaryUpperRate?: number;
  niPrimaryThreshold: number;
  niSecondaryThreshold: number;
  // Scotland-specific
  starterRate?: number;
  starterThreshold?: number;
  intermediateRate?: number;
  intermediateThreshold?: number;
  topRate?: number;
}

// For backward compatibility
export type TaxYearData = TaxYearRegion;

// Benefit types
export enum BenefitType {
  PENSION = 'pension',
  CYCLE_TO_WORK = 'cycle',
  EV_CAR_SCHEME = 'car',
  CHILDCARE = 'childcare',
  HOLIDAY_TRADING = 'holiday'
}

// Benefit configuration
export interface BenefitConfig {
  enabled: boolean;
  participationRate: number; // Percentage
  contributionValue: number; // Amount or percentage depending on benefit type
  p11dValue?: number; // P11D value for EV cars
}

// Multi-benefit configuration
export interface MultiBenefitConfig {
  [BenefitType.PENSION]: BenefitConfig;
  [BenefitType.CYCLE_TO_WORK]: BenefitConfig;
  [BenefitType.EV_CAR_SCHEME]: BenefitConfig;
  [BenefitType.CHILDCARE]: BenefitConfig;
  [BenefitType.HOLIDAY_TRADING]: BenefitConfig;
}

// Benefit savings result
export interface BenefitSavingsResult {
  niSavings: number;
  additionalSavings: number; // For holiday trading wage savings
  totalSavings: number;
}

// Calculation result with benefit breakdown
export interface CalculationResult {
  annualSavings: number;
  savingsPerEmployee: number;
  originalNI: number;
  reducedNI: number;
  benefitBreakdown: {
    [key in BenefitType]?: BenefitSavingsResult;
  };
}

// HRIS Calculator Types
export interface TimeSavingsInput {
  hrStaffCount: number;
  avgHourlyRate: number;
  adminHoursPerWeek: number;
  adminTimeReduction: number;
  dataEntryHoursPerWeek: number;
  dataEntryTimeReduction: number;
  reportingHoursPerWeek: number;
  reportingTimeReduction: number;
  queryHandlingHoursPerWeek: number;
  queryReduction: number;
}

export interface ErrorReductionInput {
  annualPayrollErrors: number;
  avgErrorCost: number;
  payrollErrorReduction: number;
  annualComplianceIssues: number;
  avgComplianceCost: number;
  complianceIssueReduction: number;
}

export interface StrategicValueInput {
  annualEmployeeTurnover: number;
  avgReplacementCost: number;
  turnoverReduction: number;
  improvedDecisionMakingValue: number;
}

export interface HRISCostInput {
  employeeCount: number;
  implementationCost: number;
  trainingCost: number;
  annualLicenseFee: number;
  initialSoftwareCost?: number;
  dataMigrationCost?: number;
  annualSupportCost?: number;
}

export interface HRISROIResults {
  timeSavings: number;
  errorReductionSavings: number;
  strategicValueSavings: number;
  totalAnnualBenefits: number;
  initialInvestment: number;
  annualCosts: number;
  netAnnualBenefit: number;
  firstYearROI: number;
  threeYearROI: number;
  fiveYearROI: number;
  paybackPeriodMonths: number;
  savingsPerEmployee: number;
  annualSavings: number;
  fiveYearSavings: number;
  productivityIncrease: number;
  implementationCosts: number;
  fiveYearTotalCost: number;
}

// Combined Payroll Calculator Types
export interface CombinedPayrollInputs {
  // Employee Count
  employeeCount: number;
  
  // Payroll Frequency Counts
  monthlyPayrollsCount: number;
  fourWeeklyPayrollsCount: number;
  fortnightlyPayrollsCount: number;
  weeklyPayrollsCount: number;
  lunarPayrollsCount: number;
  
  // Current Process Costs
  currentStaffCosts: number;
  currentSoftwareCosts: number;
  currentTrainingCosts: number;
  currentInfrastructureCosts: number;
  currentOtherCosts: number;
  
  // Time Spent Currently
  hoursPerPayRun: number;
  queryHandlingHoursPerMonth: number;
  
  // Error Metrics
  annualPayrollErrors: number;
  avgReworkCost: number;
  annualComplianceIssues: number;
  avgComplianceCost: number;
  
  // Paper Costs
  monthlyPrintingCosts: number;
  monthlyDistributionCosts: number;
  
  // Hourly Rate
  avgHourlyRate: number;
  
  // New System/Service Costs
  monthlyCost: number;
  additionalMonthlyCosts: number;
  additionalAnnualCosts: number;
  additionalOneOffCosts: number;
  
  // Improvement Percentages (Payroll System)
  processingTimeReduction: number;
  queryReduction: number;
  errorReduction: number;
  complianceReduction: number;
  
  // Additional Benefits
  wageSavings: number;
}

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

export interface ManagedPayrollResults extends PayrollSystemResults {
  transitionCosts: number;
}

export interface ComparisonMetrics {
  // ROI differences
  roiDifference: {
    firstYear: number;
    threeYear: number;
    fiveYear: number;
    paybackMonths: number;
  };
  
  // Savings differences
  savingsDifference: {
    annual: number;
    fiveYear: number;
    perEmployee: number;
  };
  
  // Cost differences
  costDifference: {
    annual: number;
    oneTime: number;
    perPayslip: number;
    tco5Year: number;
  };
  
  // Which option is better for each metric
  betterOption: {
    roi: 'payrollSystem' | 'managedPayroll' | 'equal';
    savings: 'payrollSystem' | 'managedPayroll' | 'equal';
    costs: 'payrollSystem' | 'managedPayroll' | 'equal';
    overall: 'payrollSystem' | 'managedPayroll' | 'equal';
  };
}
