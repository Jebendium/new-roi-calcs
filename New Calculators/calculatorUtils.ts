/**
 * Utility functions for calculator components
 */
import { BenefitType, CalculationResult, MultiBenefitConfig } from '../lib/calculationFunctions';

/**
 * Format currency values
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Benefit type display names
 */
export const benefitNames: Record<BenefitType, string> = {
  [BenefitType.PENSION]: "Pension",
  [BenefitType.CYCLE_TO_WORK]: "Cycle to Work",
  [BenefitType.EV_CAR_SCHEME]: "EV Car Scheme",
  [BenefitType.CHILDCARE]: "Childcare Vouchers",
  [BenefitType.HOLIDAY_TRADING]: "Holiday Trading"
};

/**
 * Tooltips for each benefit type
 */

/**
 * Labels for contribution value fields
 */

/**
 * Get chart data for standard calculation
 */
export const getStandardChartData = (calculationResult: CalculationResult) => {
  return {
    labels: ['Without Salary Sacrifice', 'With Salary Sacrifice'],
    datasets: [
      {
        label: 'Annual NI Cost',
        data: [
          calculationResult.originalNI,
          calculationResult.reducedNI
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
      },
    ],
  };
};

/**
 * Get chart data for multi-year projection
 */
export const getMultiYearChartData = (yearlyProjections: Array<{
  year: string;
  employees: number;
  averageSalary: number;
  contribution: number;
  savings: number;
  cumulativeSavings: number;
}>) => {
  return {
    labels: yearlyProjections.map(proj => proj.year),
    datasets: [
      {
        label: 'Annual NI Savings',
        data: yearlyProjections.map(proj => proj.savings),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Cumulative Savings',
        data: yearlyProjections.map(proj => proj.cumulativeSavings),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

/**
 * Get default benefit configuration
 */
export const getDefaultBenefitConfig = (): MultiBenefitConfig => {
  return {
    [BenefitType.PENSION]: {
      enabled: true,
      participationRate: 90,
      contributionValue: 5
    },
    [BenefitType.CYCLE_TO_WORK]: {
      enabled: true,
      participationRate: 5,
      contributionValue: 1150
    },
    [BenefitType.EV_CAR_SCHEME]: {
      enabled: true,
      participationRate: 4,
      contributionValue: 650,
      p11dValue: 35000
    },
    [BenefitType.CHILDCARE]: {
      enabled: true,
      participationRate: 0,
      contributionValue: 0
    },
    [BenefitType.HOLIDAY_TRADING]: {
      enabled: true,
      participationRate: 20,
      contributionValue: 5
    }
  };
};

/**
 * Calculate percentage reduction in NI costs
 */
export const calculateNIReduction = (originalNI: number, reducedNI: number): number => {
  return originalNI > 0 
    ? ((originalNI - reducedNI) / originalNI) * 100 
    : 0;
};
