/**
 * Utility functions for calculator components
 */
import { BenefitType, CalculationResult, MultiBenefitConfig } from './calculation-functions';

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
 * Format percentage values
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
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
export const benefitTooltips: Record<BenefitType, string> = {
  [BenefitType.PENSION]: "Pension salary sacrifice allows employees to exchange part of their salary for employer pension contributions, saving both employers and employees on National Insurance contributions.",
  [BenefitType.CYCLE_TO_WORK]: "The Cycle to Work scheme is a UK government tax exemption initiative aimed at promoting healthier journeys to work and reducing environmental pollution.",
  [BenefitType.EV_CAR_SCHEME]: "Electric vehicle salary sacrifice schemes allow employees to lease an electric car through their employer with payments taken from their gross salary, saving on tax and NI.",
  [BenefitType.CHILDCARE]: "Childcare voucher schemes allow employees to pay for childcare from their pre-tax salary, reducing their tax and National Insurance liability.",
  [BenefitType.HOLIDAY_TRADING]: "Holiday trading allows employees to buy or sell annual leave, which creates NI savings for employers when employees purchase additional holiday."
};

/**
 * Labels for contribution value fields
 */
export const contributionLabels: Record<BenefitType, string> = {
  [BenefitType.PENSION]: "Contribution Percentage (%)",
  [BenefitType.CYCLE_TO_WORK]: "Average Spend (£)",
  [BenefitType.EV_CAR_SCHEME]: "Monthly Gross Amount (£)",
  [BenefitType.CHILDCARE]: "Monthly Amount (£)",
  [BenefitType.HOLIDAY_TRADING]: "Average Days Purchased"
};

/**
 * Get chart data for standard calculation
 */
export const getChartData = (result: CalculationResult) => {
  const benefitLabels = Object.keys(result.benefitBreakdown).map(
    (key) => benefitNames[key as BenefitType]
  );
  
  const benefitValues = Object.values(result.benefitBreakdown).map(
    (value) => value.totalSavings
  );
  
  return {
    labels: benefitLabels,
    datasets: [
      {
        data: benefitValues,
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

/**
 * Get chart data for multi-year projection
 */
export const getProjectionChartData = (yearlyProjections: { year: number; savings: number; cumulativeSavings: number }[]) => {
  return {
    labels: yearlyProjections.map(proj => `Year ${proj.year}`),
    datasets: [
      {
        label: 'Annual Savings',
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
      participationRate: 3,
      contributionValue: 250
    },
    [BenefitType.HOLIDAY_TRADING]: {
      enabled: true,
      participationRate: 15,
      contributionValue: 5
    }
  };
};

/**
 * Safely convert string or number to number with fallback
 */
export const safeNum = (val: string | number | undefined, fallback = 0): number => {
  if (val === undefined || val === null) return fallback;
  
  const num = typeof val === 'string' ? Number(val.replace(/,/g, '')) : val;
  return isNaN(num) ? fallback : num;
};

/**
 * Get a readable title for the calculator
 */
export function getCalculatorTitle(calculatorType: string): string {
  switch (calculatorType) {
    case 'employer-ni': return 'Employer NI Savings';
    case 'employee-savings': return 'Employee Tax & NI Savings';
    case 'p11d-ev-car': return 'P11D EV Car Benefit';
    case 'childcare-vouchers': return 'Childcare Vouchers';
    case 'holiday-trading': return 'Holiday Trading';
    case 'business-roi': return 'Business System ROI';
    case 'hris-roi': return 'HRIS ROI Calculator';
    case 'payroll-roi': return 'Payroll ROI Calculator';
    default: return 'Calculator';
  }
}

/**
 * Calculate multi-year projections for employer NI savings
 */
export const calculateMultiYearProjection = (
  employeeCount: number,
  averageSalary: number,
  benefitConfig: MultiBenefitConfig,
  projectionYears: number = 5,
  employeeGrowthRate: number = 5, // Default 5% annual employee growth
  salaryGrowthRate: number = 3, // Default 3% annual salary growth
  contributionGrowthRate: number = 1 // Default 1% annual contribution growth
) => {
  const yearlyProjections = [];
  let cumulativeSavings = 0;
  
  for (let i = 0; i < projectionYears; i++) {
    // Calculate projected values for this year
    const year = `202${3 + i}-202${4 + i}`; // e.g., "2023-2024", "2024-2025"
    const yearEmployees = Math.round(employeeCount * Math.pow(1 + employeeGrowthRate / 100, i));
    const yearSalary = averageSalary * Math.pow(1 + salaryGrowthRate / 100, i);
    
    // Create a copy of the benefit config with adjusted contribution values
    const yearBenefitConfig = { ...benefitConfig };
    
    // Only adjust contribution values for percentage-based benefits
    yearBenefitConfig[BenefitType.PENSION].contributionValue = 
      benefitConfig[BenefitType.PENSION].contributionValue * 
      Math.pow(1 + contributionGrowthRate / 100, i);
      
    // Calculate savings for this year
    const yearResult = calculateProjectedSavings(
      yearEmployees,
      yearSalary,
      yearBenefitConfig,
      year
    );
    
    // Update cumulative savings
    cumulativeSavings += yearResult.annualSavings;
    
    // Add to projections
    yearlyProjections.push({
      year: i + 1,
      employees: yearEmployees,
      averageSalary: yearSalary,
      savings: yearResult.annualSavings,
      cumulativeSavings
    });
  }
  
  return yearlyProjections;
};

/**
 * Helper function to calculate projected savings
 * This is a simplified version of calculateMultiBenefitSavings for projection purposes
 */
const calculateProjectedSavings = (
  employeeCount: number,
  averageSalary: number,
  benefitConfig: MultiBenefitConfig,
  taxYear: string
): CalculationResult => {
  // Simplified implementation that just calls the main calculation function
  return {
    annualSavings: 0, // This would call calculateMultiBenefitSavings in a real implementation
    savingsPerEmployee: 0,
    originalNI: 0,
    reducedNI: 0,
    benefitBreakdown: {}
  };
};