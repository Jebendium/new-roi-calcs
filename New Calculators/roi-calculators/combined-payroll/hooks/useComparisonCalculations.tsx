import { useMemo } from 'react';
import { 
  PayrollSystemResults, 
  ManagedPayrollResults 
} from '../../../../types/combinedPayrollTypes';

/**
 * Interface for comparison metrics between Payroll System and Managed Payroll
 */
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

/**
 * Hook to calculate comparison metrics between Payroll System and Managed Payroll
 * 
 * @param payrollSystemResults - Results of the Payroll System calculation
 * @param managedPayrollResults - Results of the Managed Payroll calculation
 * @returns Comparison metrics between the two options
 */
const useComparisonCalculations = (
  payrollSystemResults: PayrollSystemResults | null,
  managedPayrollResults: ManagedPayrollResults | null
): ComparisonMetrics | null => {
  
  const comparison = useMemo(() => {
    if (!payrollSystemResults || !managedPayrollResults) {
      return null;
    }
    
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
  }, [payrollSystemResults, managedPayrollResults]);
  
  return comparison;
};

export default useComparisonCalculations;