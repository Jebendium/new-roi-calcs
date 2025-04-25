// Payroll ROI Calculator Logic
import { CombinedPayrollInputs, PayrollSystemResults, ManagedPayrollResults, ComparisonMetrics } from '../types';

/**
 * Calculate common values used by both payroll calculators
 */
export function calculateCommonPayrollValues(inputs: CombinedPayrollInputs) {
  // Calculate total annual pay runs
  const totalAnnualPayRuns = 
    (inputs.monthlyPayrollsCount * 12) + 
    (inputs.fourWeeklyPayrollsCount * 13) + 
    (inputs.weeklyPayrollsCount * 52) + 
    (inputs.fortnightlyPayrollsCount * 26) +
    (inputs.lunarPayrollsCount * 13.04);
  
  // Calculate current annual payroll cost
  const currentAnnualPayrollCost = 
    inputs.currentStaffCosts + 
    inputs.currentSoftwareCosts + 
    inputs.currentTrainingCosts + 
    inputs.currentInfrastructureCosts + 
    inputs.currentOtherCosts;
  
  // Calculate annual costs for new system/service
  const annualSystemCosts = 
    (inputs.monthlyCost * 12) + 
    (inputs.additionalMonthlyCosts * 12) + 
    inputs.additionalAnnualCosts;
  
  // Calculate total investment
  const totalInvestment = inputs.additionalOneOffCosts + annualSystemCosts;
  
  // Calculate total number of payslips processed per year
  const totalPayslipsPerYear = 
    (inputs.monthlyPayrollsCount * 12 * inputs.employeeCount) + 
    (inputs.fourWeeklyPayrollsCount * 13 * inputs.employeeCount) + 
    (inputs.weeklyPayrollsCount * 52 * inputs.employeeCount) + 
    (inputs.fortnightlyPayrollsCount * 26 * inputs.employeeCount) +
    (inputs.lunarPayrollsCount * 13.04 * inputs.employeeCount);
    
  // Calculate current cost per payslip
  const currentCostPerPayslip = 
    totalPayslipsPerYear > 0 ? 
    currentAnnualPayrollCost / totalPayslipsPerYear : 0;
  
  return {
    totalAnnualPayRuns,
    currentAnnualPayrollCost,
    annualSystemCosts,
    totalInvestment,
    totalPayslipsPerYear,
    currentCostPerPayslip
  };
}

/**
 * Calculate ROI metrics
 */
export function calculateROIMetrics(
  netAnnualBenefit: number,
  additionalOneOffCosts: number,
  annualSystemCosts: number
) {
  const totalInvestment = additionalOneOffCosts + annualSystemCosts;
  
  // Calculate ROI percentages (with safeguards against division by zero)
  const firstYearROI = totalInvestment > 0 ?
    ((netAnnualBenefit - additionalOneOffCosts) / totalInvestment) * 100 : 0;
    
  const threeYearROI = totalInvestment > 0 ?
    (((netAnnualBenefit * 3) - additionalOneOffCosts) / 
     (totalInvestment + (annualSystemCosts * 2))) * 100 : 0;
    
  const fiveYearROI = totalInvestment > 0 ?
    (((netAnnualBenefit * 5) - additionalOneOffCosts) / 
     (totalInvestment + (annualSystemCosts * 4))) * 100 : 0;
    
  // Calculate payback period in months (with safeguard against division by zero)
  const paybackPeriodMonths = netAnnualBenefit > 0 ?
    (additionalOneOffCosts / (netAnnualBenefit / 12)) : 0;
    
  // Calculate 5-year Total Cost of Ownership
  const tco5Year = additionalOneOffCosts + (annualSystemCosts * 5) - (netAnnualBenefit * 5);
  
  return {
    firstYearROI,
    threeYearROI,
    fiveYearROI,
    paybackPeriodMonths,
    tco5Year
  };
}

/**
 * Calculate ROI for Payroll System
 */
export function calculatePayrollSystemResults(inputs: CombinedPayrollInputs): PayrollSystemResults {
  const common = calculateCommonPayrollValues(inputs);
  
  // Calculate efficiency savings using user's percentage inputs
  const processingHoursSaved = 
    inputs.hoursPerPayRun * 
    common.totalAnnualPayRuns * 
    (inputs.processingTimeReduction / 100);
    
  const queryHoursSaved = 
    inputs.queryHandlingHoursPerMonth * 
    12 * 
    (inputs.queryReduction / 100);
    
  const totalHoursSaved = processingHoursSaved + queryHoursSaved;
  const efficiencySavings = totalHoursSaved * inputs.avgHourlyRate;
  
  // Calculate error reduction savings with user's percentage inputs
  const payrollErrorSavings = 
    inputs.annualPayrollErrors * 
    inputs.avgReworkCost * 
    (inputs.errorReduction / 100);
    
  const complianceSavings = 
    inputs.annualComplianceIssues * 
    inputs.avgComplianceCost * 
    (inputs.complianceReduction / 100);
    
  const errorReductionSavings = payrollErrorSavings + complianceSavings;
  
  // Calculate paper cost savings
  const paperSavings = 
    (inputs.monthlyPrintingCosts + inputs.monthlyDistributionCosts) * 12;
  
  // Include wage savings
  const wageSavings = inputs.wageSavings;
  
  // Calculate total annual benefits
  const totalAnnualBenefits = 
    efficiencySavings + 
    errorReductionSavings + 
    paperSavings + 
    wageSavings;
  
  // Calculate initial investment
  const initialInvestment = inputs.additionalOneOffCosts;
  
  // Calculate net annual benefit
  const netAnnualBenefit = totalAnnualBenefits - common.annualSystemCosts;
  
  // Calculate ROI metrics
  const { 
    firstYearROI, 
    threeYearROI, 
    fiveYearROI, 
    paybackPeriodMonths,
    tco5Year
  } = calculateROIMetrics(netAnnualBenefit, initialInvestment, common.annualSystemCosts);
  
  // Calculate savings per employee
  const savingsPerEmployee = 
    inputs.employeeCount > 0 ? 
    netAnnualBenefit / inputs.employeeCount : 0;
  
  // Calculate new cost per payslip
  const costPerPayslip = 
    common.totalPayslipsPerYear > 0 ? 
    common.annualSystemCosts / common.totalPayslipsPerYear : 0;
  
  return {
    // Savings Breakdown
    efficiencySavings,
    errorReductionSavings,
    paperSavings,
    wageSavings,
    totalAnnualBenefits,
    
    // Costs
    initialInvestment,
    annualCosts: common.annualSystemCosts,
    
    // Final Metrics
    netAnnualBenefit,
    firstYearROI,
    threeYearROI,
    fiveYearROI,
    paybackPeriodMonths,
    savingsPerEmployee,
    costPerPayslip,
    totalCostOfOwnership5Year: tco5Year
  };
}

/**
 * Calculate ROI for Managed Payroll service
 */
export function calculateManagedPayrollResults(inputs: CombinedPayrollInputs): ManagedPayrollResults {
  const common = calculateCommonPayrollValues(inputs);
  
  // Calculate efficiency savings with 100% efficiency assumption
  const processingHoursSaved = inputs.hoursPerPayRun * common.totalAnnualPayRuns; // 100% efficiency
  const queryHoursSaved = inputs.queryHandlingHoursPerMonth * 12; // 100% efficiency
  
  const totalHoursSaved = processingHoursSaved + queryHoursSaved;
  const efficiencySavings = totalHoursSaved * inputs.avgHourlyRate;
  
  // Calculate error reduction savings with 100% assumption
  const payrollErrorSavings = inputs.annualPayrollErrors * inputs.avgReworkCost; // 100% reduction
  const complianceSavings = inputs.annualComplianceIssues * inputs.avgComplianceCost; // 100% reduction
  const errorReductionSavings = payrollErrorSavings + complianceSavings;
  
  // Calculate paper cost savings
  const paperSavings = (inputs.monthlyPrintingCosts + inputs.monthlyDistributionCosts) * 12;
  
  // Include wage savings
  const wageSavings = inputs.wageSavings;
  
  // Calculate total annual benefits
  const totalAnnualBenefits = 
    efficiencySavings + 
    errorReductionSavings + 
    paperSavings + 
    wageSavings;
  
  // Calculate transition costs (one-time costs)
  const transitionCosts = inputs.additionalOneOffCosts;
  
  // Calculate net annual benefit
  const netAnnualBenefit = totalAnnualBenefits - common.annualSystemCosts;
  
  // Calculate ROI metrics
  const { 
    firstYearROI, 
    threeYearROI, 
    fiveYearROI, 
    paybackPeriodMonths,
    tco5Year
  } = calculateROIMetrics(netAnnualBenefit, transitionCosts, common.annualSystemCosts);
  
  // Calculate savings per employee
  const savingsPerEmployee = 
    inputs.employeeCount > 0 ? 
    netAnnualBenefit / inputs.employeeCount : 0;
  
  // Calculate new cost per payslip
  const costPerPayslip = 
    common.totalPayslipsPerYear > 0 ? 
    common.annualSystemCosts / common.totalPayslipsPerYear : 0;
  
  return {
    // Savings Breakdown
    efficiencySavings,
    errorReductionSavings,
    paperSavings,
    wageSavings,
    totalAnnualBenefits,
    
    // Costs
    transitionCosts,
    annualCosts: common.annualSystemCosts,
    initialInvestment: transitionCosts, // For compatibility with PayrollSystemResults
    
    // Final Metrics
    netAnnualBenefit,
    firstYearROI,
    threeYearROI,
    fiveYearROI,
    paybackPeriodMonths,
    savingsPerEmployee,
    costPerPayslip,
    totalCostOfOwnership5Year: tco5Year
  };
}

/**
 * Compare Payroll System and Managed Payroll results
 */
export function comparePayrollOptions(
  payrollSystemResults: PayrollSystemResults,
  managedPayrollResults: ManagedPayrollResults
): ComparisonMetrics {
  // Calculate ROI differences
  const roiDifference = {
    firstYear: managedPayrollResults.firstYearROI - payrollSystemResults.firstYearROI,
    threeYear: managedPayrollResults.threeYearROI - payrollSystemResults.threeYearROI,
    fiveYear: managedPayrollResults.fiveYearROI - payrollSystemResults.fiveYearROI,
    paybackMonths: payrollSystemResults.paybackPeriodMonths - managedPayrollResults.paybackPeriodMonths
  };
  
  // Calculate savings differences
  const savingsDifference = {
    annual: managedPayrollResults.netAnnualBenefit - payrollSystemResults.netAnnualBenefit,
    fiveYear: (managedPayrollResults.netAnnualBenefit * 5) - (payrollSystemResults.netAnnualBenefit * 5),
    perEmployee: managedPayrollResults.savingsPerEmployee - payrollSystemResults.savingsPerEmployee
  };
  
  // Calculate cost differences
  const costDifference = {
    annual: payrollSystemResults.annualCosts - managedPayrollResults.annualCosts,
    oneTime: payrollSystemResults.initialInvestment - managedPayrollResults.transitionCosts,
    perPayslip: payrollSystemResults.costPerPayslip - managedPayrollResults.costPerPayslip,
    tco5Year: payrollSystemResults.totalCostOfOwnership5Year - managedPayrollResults.totalCostOfOwnership5Year
  };
  
  // Determine which option is better for each metric
  const betterOption = {
    roi: roiDifference.fiveYear > 0 ? 'managedPayroll' : 
         roiDifference.fiveYear < 0 ? 'payrollSystem' : 'equal',
         
    savings: savingsDifference.fiveYear > 0 ? 'managedPayroll' : 
             savingsDifference.fiveYear < 0 ? 'payrollSystem' : 'equal',
             
    costs: costDifference.tco5Year > 0 ? 'managedPayroll' : 
           costDifference.tco5Year < 0 ? 'payrollSystem' : 'equal',
           
    // Overall recommendation based on 5-year TCO and ROI
    overall: managedPayrollResults.totalCostOfOwnership5Year < payrollSystemResults.totalCostOfOwnership5Year &&
             managedPayrollResults.fiveYearROI > payrollSystemResults.fiveYearROI ? 'managedPayroll' :
             payrollSystemResults.totalCostOfOwnership5Year < managedPayrollResults.totalCostOfOwnership5Year &&
             payrollSystemResults.fiveYearROI > managedPayrollResults.fiveYearROI ? 'payrollSystem' :
             // If mixed signals, use 5-year ROI as tiebreaker
             managedPayrollResults.fiveYearROI > payrollSystemResults.fiveYearROI ? 'managedPayroll' :
             payrollSystemResults.fiveYearROI > managedPayrollResults.fiveYearROI ? 'payrollSystem' : 'equal'
  };
  
  return {
    roiDifference,
    savingsDifference,
    costDifference,
    betterOption
  };
}

/**
 * Get default CombinedPayrollInputs with sensible default values
 */
export function getDefaultPayrollInputs(): CombinedPayrollInputs {
  return {
    // Employee Count
    employeeCount: 100,
    
    // Payroll Frequency Counts
    monthlyPayrollsCount: 1,
    fourWeeklyPayrollsCount: 0,
    fortnightlyPayrollsCount: 0,
    weeklyPayrollsCount: 0,
    lunarPayrollsCount: 0,
    
    // Current Process Costs
    currentStaffCosts: 40000,
    currentSoftwareCosts: 5000,
    currentTrainingCosts: 1000,
    currentInfrastructureCosts: 1500,
    currentOtherCosts: 500,
    
    // Time Spent Currently
    hoursPerPayRun: 16,
    queryHandlingHoursPerMonth: 20,
    
    // Error Metrics
    annualPayrollErrors: 24,
    avgReworkCost: 150,
    annualComplianceIssues: 4,
    avgComplianceCost: 1000,
    
    // Paper Costs
    monthlyPrintingCosts: 100,
    monthlyDistributionCosts: 50,
    
    // Hourly Rate
    avgHourlyRate: 20,
    
    // New System/Service Costs
    monthlyCost: 1000,
    additionalMonthlyCosts: 0,
    additionalAnnualCosts: 0,
    additionalOneOffCosts: 10000,
    
    // Improvement Percentages (Payroll System)
    processingTimeReduction: 60,
    queryReduction: 40,
    errorReduction: 70,
    complianceReduction: 80,
    
    // Additional Benefits
    wageSavings: 0
  };
}
