import { useMemo } from 'react';
import { CombinedPayrollInputs, ManagedPayrollResults } from '../../../../types/combinedPayrollTypes';
import useCalculationUtils from './useCalculationUtils';

/**
 * Hook to calculate Managed Payroll ROI based on the provided inputs
 * 
 * @param inputs - The calculator inputs
 * @returns Results of the Managed Payroll ROI calculation
 */
const useManagedPayrollCalculations = (inputs: CombinedPayrollInputs): ManagedPayrollResults => {
  const utils = useCalculationUtils(inputs);
  
  const results = useMemo((): ManagedPayrollResults => {
    // Extract utility values
    const { 
      totalAnnualPayRuns, 
      annualSystemCosts,
      totalPayslipsPerYear,
      calculateROI
    } = utils;
    
    // Calculate efficiency savings with 100% efficiency assumption
    const processingHoursSaved = inputs.hoursPerPayRun * totalAnnualPayRuns; // 100% efficiency
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
    const netAnnualBenefit = totalAnnualBenefits - annualSystemCosts;
    
    // Calculate ROI metrics
    const { 
      firstYearROI, 
      threeYearROI, 
      fiveYearROI, 
      paybackPeriodMonths,
      tco5Year
    } = calculateROI(netAnnualBenefit, transitionCosts, annualSystemCosts);
    
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
      transitionCosts,
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

export default useManagedPayrollCalculations;