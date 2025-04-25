'use client';

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
  
  return useMemo((): ManagedPayrollResults => {
    // Extract utility values
    const { 
      totalPayslipsPerYear,
      annualSystemCosts,
      calculateROI
    } = utils;
    
    // For managed payroll service, we assume almost complete replacement of in-house costs
    
    // Staff savings (assuming 90% of staff costs are saved with managed payroll)
    const staffSavings = inputs.currentStaffCosts * 0.9;
    
    // Software savings (assuming 100% of software costs are saved)
    const softwareSavings = inputs.currentSoftwareCosts;
    
    // Infrastructure savings (assuming 100% of infrastructure costs are saved)
    const infrastructureSavings = inputs.currentInfrastructureCosts;
    
    // Training and other savings (assuming 90% of these costs are saved)
    const trainingAndOtherSavings = 
      (inputs.currentTrainingCosts + inputs.currentOtherCosts) * 0.9;
    
    // Error reduction (assuming 95% reduction in errors with managed service)
    const errorReductionSavings = 
      inputs.annualPayrollErrors * 
      inputs.avgReworkCost * 0.95;
    
    // Compliance savings (assuming 98% reduction in compliance issues)
    const complianceSavings = 
      inputs.annualComplianceIssues * 
      inputs.avgComplianceCost * 0.98;
    
    // Paper savings (100% of paper costs)
    const paperSavings = 
      (inputs.monthlyPrintingCosts + inputs.monthlyDistributionCosts) * 12;
    
    // Calculate total annual benefits
    const totalAnnualBenefits = 
      staffSavings + 
      softwareSavings + 
      infrastructureSavings + 
      trainingAndOtherSavings + 
      errorReductionSavings + 
      complianceSavings + 
      paperSavings;
    
    // Calculate initial investment (usually minimal for managed service)
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
      staffSavings,
      softwareSavings,
      infrastructureSavings,
      trainingAndOtherSavings,
      errorReductionSavings,
      complianceSavings,
      paperSavings,
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
};

export default useManagedPayrollCalculations;