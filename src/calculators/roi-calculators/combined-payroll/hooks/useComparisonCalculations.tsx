'use client';

import { useMemo } from 'react';
import { PayrollSystemResults, ManagedPayrollResults } from '../../../../types/combinedPayrollTypes';

interface ComparisonResults {
  netBenefitDifference: number;
  firstYearROIDifference: number;
  paybackPeriodDifference: number;
  costPerPayslipDifference: number;
  fiveYearROIDifference: number;
  tco5YearDifference: number;
  payrollSystemBetter: boolean;
}

/**
 * Hook to compare results between payroll system and managed payroll
 * 
 * @param payrollSystemResults - Results from payroll system calculations
 * @param managedPayrollResults - Results from managed payroll calculations
 * @returns Comparison metrics between the two options
 */
const useComparisonCalculations = (
  payrollSystemResults: PayrollSystemResults | null,
  managedPayrollResults: ManagedPayrollResults | null
): ComparisonResults | null => {
  return useMemo(() => {
    if (!payrollSystemResults || !managedPayrollResults) {
      return null;
    }
    
    // Calculate differences
    const netBenefitDifference = 
      payrollSystemResults.netAnnualBenefit - managedPayrollResults.netAnnualBenefit;
      
    const firstYearROIDifference = 
      payrollSystemResults.firstYearROI - managedPayrollResults.firstYearROI;
      
    const paybackPeriodDifference = 
      payrollSystemResults.paybackPeriodMonths - managedPayrollResults.paybackPeriodMonths;
      
    const costPerPayslipDifference = 
      payrollSystemResults.costPerPayslip - managedPayrollResults.costPerPayslip;
      
    const fiveYearROIDifference = 
      payrollSystemResults.fiveYearROI - managedPayrollResults.fiveYearROI;
      
    const tco5YearDifference = 
      payrollSystemResults.totalCostOfOwnership5Year - managedPayrollResults.totalCostOfOwnership5Year;
    
    // Determine which option is better (simple heuristic based on 5-year ROI)
    // Could be more complex based on client priorities
    const payrollSystemBetter = payrollSystemResults.fiveYearROI > managedPayrollResults.fiveYearROI;
    
    return {
      netBenefitDifference,
      firstYearROIDifference,
      paybackPeriodDifference,
      costPerPayslipDifference,
      fiveYearROIDifference,
      tco5YearDifference,
      payrollSystemBetter
    };
  }, [payrollSystemResults, managedPayrollResults]);
};

export default useComparisonCalculations;