import { useMemo } from 'react';
import { CombinedPayrollInputs, PayrollSystemResults } from '../../../../types/combinedPayrollTypes';
import useCalculationUtils from './useCalculationUtils';

/**
 * Hook to calculate Payroll System ROI based on the provided inputs
 * 
 * @param inputs - The calculator inputs
 * @returns Results of the Payroll System ROI calculation
 */
const usePayrollSystemCalculations = (inputs: CombinedPayrollInputs): PayrollSystemResults => {
  const utils = useCalculationUtils(inputs);
  
  const results = useMemo((): PayrollSystemResults => {
    // Extract utility values
    const { 
      totalAnnualPayRuns, 
      annualSystemCosts,
      totalPayslipsPerYear,
      calculateROI
    } = utils;
    
    // Calculate efficiency savings using user's percentage inputs
    const processingHoursSaved = 
      inputs.hoursPerPayRun * 
      totalAnnualPayRuns * 
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
    const netAnnualBenefit = totalAnnualBenefits - annualSystemCosts;
    
    // Calculate ROI metrics
    const { 
      firstYearROI, 
      threeYearROI, 
      fiveYearROI, 
      paybackPeriodMonths,
      tco5Year
    } = calculateROI(netAnnualBenefit, initialInvestment, annualSystemCosts);
    
    // Calculate savings per employee
    const savingsPerEmployee = 
      inputs.employeeCount > 0 ? 
      netAnnualBenefit / inputs.employeeCount : 0;
    
    // Calculate new cost per payslip
    const costPerPayslip = 
      totalPayslipsPerYear > 0 ? 
      annualSystemCosts / totalPayslipsPerYear : 0;
    
    return {
      // Savings Breakdown
      efficiencySavings,
      errorReductionSavings,
      paperSavings,
      wageSavings,
      totalAnnualBenefits,
      
      // Costs
      initialInvestment,
      annualCosts: annualSystemCosts,
      
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
  }, [inputs, utils]);
  
  return results;
};

export default usePayrollSystemCalculations;