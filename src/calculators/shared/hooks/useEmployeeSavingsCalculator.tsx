import { useCallback, useMemo } from 'react';
import { FormValues, EmployeeSavingsResult } from '../../core/types';
import { calculateEmployeeSavings } from '../../core/calculation-functions';
import { safeNum, formatCurrency, formatPercentage } from '../../core/calculator-utils';

// Refactor legacy type name
interface EmployeeSavingsCalculatorValues extends FormValues {
  annualSalary: number | string;
  contributionPercentage: number | string;
  isScottish?: boolean;
  taxYear: string;
}

/**
 * Custom hook for Employee Savings calculator functionality
 * 
 * Encapsulates the calculation logic and data preparation for the Employee Savings calculator
 */
export function useEmployeeSavingsCalculator() {
  // Perform calculation based on form values
  const calculateResults = useCallback((values: EmployeeSavingsCalculatorValues): EmployeeSavingsResult => {
    const annualSalary = safeNum(values.annualSalary);
    const contributionPercentage = safeNum(values.contributionPercentage);
    const isScottish = values.isScottish || false;
    const taxYear = values.taxYear || '2023-2024';
    
    const result = calculateEmployeeSavings(
      annualSalary, 
      contributionPercentage, 
      isScottish, 
      taxYear
    );
    
    return result;
  }, []);

  // Format results for display
  const formatResults = useCallback((result: EmployeeSavingsResult) => {
    return {
      monthlyTakeHomeIncrease: formatCurrency(result.monthlyTakeHomeIncrease),
      annualTaxSavings: formatCurrency(result.annualTaxSavings),
      annualNISavings: formatCurrency(result.annualNISavings),
      totalAnnualSavings: formatCurrency(result.totalAnnualSavings),
      contributionAmount: formatCurrency(result.contributionAmount),
      effectiveCost: formatCurrency(result.contributionAmount - result.totalAnnualSavings),
      savingsPercentage: formatPercentage((result.totalAnnualSavings / result.contributionAmount) * 100)
    };
  }, []);

  // Default form values
  const defaultValues = useMemo((): EmployeeSavingsCalculatorValues => ({
    annualSalary: 30000,
    contributionPercentage: 5,
    isScottish: false,
    taxYear: '2023-2024'
  }), []);

  return {
    calculateResults,
    formatResults,
    defaultValues
  };
}

export default useEmployeeSavingsCalculator;