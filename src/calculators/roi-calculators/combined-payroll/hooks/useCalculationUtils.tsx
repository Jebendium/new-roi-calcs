'use client';

import { useMemo } from 'react';
import { CombinedPayrollInputs } from '../../../../types/combinedPayrollTypes';

/**
 * Hook to provide common calculation utilities for both calculator types
 * 
 * @param inputs - The combined payroll calculator inputs
 * @returns Common calculation results used by both calculator types
 */
const useCalculationUtils = (inputs: CombinedPayrollInputs) => {
  return useMemo(() => {
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
    
    // Helper function to calculate ROI with proper handling of ongoing costs
    const calculateROI = (
      netAnnualBenefit: number,
      additionalOneOffCosts: number,
      annualSystemCosts: number
    ) => {
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
    };
    
    return {
      totalAnnualPayRuns,
      currentAnnualPayrollCost,
      annualSystemCosts,
      totalInvestment,
      totalPayslipsPerYear,
      currentCostPerPayslip,
      calculateROI
    };
  }, [inputs]);
};

export default useCalculationUtils;