import { 
  TimeSavingsInput, 
  ErrorReductionInput, 
  StrategicValueInput, 
  HRISCostInput, 
  HRISROIResults 
} from '../../../../types/roiCalculatorTypes';

export const useHRISCalculations = () => {
  // Main calculation function
  const calculateResults = (
    timeSavings: TimeSavingsInput,
    errorReduction: ErrorReductionInput,
    strategicValue: StrategicValueInput,
    costInputs: HRISCostInput
  ): HRISROIResults => {
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
  };

  // Helper function to get time savings breakdown
  const getTimeSavingsBreakdown = (timeSavings: TimeSavingsInput) => {
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
  };

  return {
    calculateResults,
    getTimeSavingsBreakdown
  };
};