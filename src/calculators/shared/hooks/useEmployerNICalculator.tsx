import { useCallback, useMemo } from 'react';
import { FormValues, EmployerNIResult } from '../../core/types';
import { 
  calculateEmployerNISavings, 
  calculateMultiBenefitSavings,
  MultiBenefitConfig,
  BenefitType
} from '../../core/calculation-functions';
import { safeNum, formatCurrency, getChartData } from '../../core/calculator-utils';

// Refactor legacy type name
interface EmployerNICalculatorValues extends FormValues {
  employeeCount: number | string;
  averageSalary: number | string;
  pensionContribution: number | string;
  taxYear: string;
  includeMultiBenefits?: boolean;
  benefitConfig?: MultiBenefitConfig;
}

/**
 * Custom hook for Employer NI calculator functionality
 * 
 * Encapsulates the calculation logic and data preparation for the Employer NI calculator
 */
export function useEmployerNICalculator() {
  // Perform calculation based on form values
  const calculateResults = useCallback((values: EmployerNICalculatorValues): EmployerNIResult => {
    const employeeCount = safeNum(values.employeeCount);
    const averageSalary = safeNum(values.averageSalary);
    const pensionContribution = safeNum(values.pensionContribution);
    const taxYear = values.taxYear || '2023-2024';
    
    // Calculate monthly contribution (pension percentage to monthly amount)
    const monthlyContribution = (averageSalary * (pensionContribution / 100)) / 12;
    
    if (values.includeMultiBenefits && values.benefitConfig) {
      // Use multi-benefit calculation if enabled
      const result = calculateMultiBenefitSavings(
        employeeCount,
        averageSalary,
        values.benefitConfig,
        taxYear
      );
      
      return {
        annualSavings: result.annualSavings,
        savingsPerEmployee: result.savingsPerEmployee,
        originalNI: result.originalNI,
        reducedNI: result.reducedNI,
        benefitBreakdown: result.benefitBreakdown
      };
    } else {
      // Use simple calculation for pension only
      const result = calculateEmployerNISavings(
        employeeCount,
        averageSalary,
        monthlyContribution,
        taxYear
      );
      
      return {
        ...result,
        benefitBreakdown: {
          [BenefitType.PENSION]: {
            niSavings: result.annualSavings,
            additionalSavings: 0,
            totalSavings: result.annualSavings
          }
        }
      };
    }
  }, []);

  // Format results for display
  const formatResults = useCallback((result: EmployerNIResult) => {
    return {
      annualSavings: formatCurrency(result.annualSavings),
      savingsPerEmployee: formatCurrency(result.savingsPerEmployee),
      originalNI: formatCurrency(result.originalNI),
      reducedNI: formatCurrency(result.reducedNI),
      niReduction: ((result.annualSavings / result.originalNI) * 100).toFixed(1) + '%',
      chartData: result.benefitBreakdown ? getChartData({
        ...result,
        benefitBreakdown: result.benefitBreakdown
      }) : null
    };
  }, []);

  // Default form values
  const defaultValues = useMemo((): EmployerNICalculatorValues => ({
    employeeCount: 100,
    averageSalary: 30000,
    pensionContribution: 5,
    taxYear: '2023-2024',
    includeMultiBenefits: false
  }), []);

  return {
    calculateResults,
    formatResults,
    defaultValues
  };
}

export default useEmployerNICalculator;