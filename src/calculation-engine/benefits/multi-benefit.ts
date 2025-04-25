// Multi-Benefit Calculation Logic
import { TaxYearData, BenefitType, BenefitConfig, MultiBenefitConfig, BenefitSavingsResult, CalculationResult } from '../types';
import { calculatePensionSavings } from '../ni/employer';
import { calculateCycleToWorkSavings } from '../ni/employer';
import { calculateEVCarSchemeSavings } from '../p11d/ev-car';
import { calculateChildcareSavings } from './childcare-vouchers';
import { calculateHolidayTradingSavings } from './holiday-trading';

/**
 * Get default benefit configuration with sensible default values
 */
export function getDefaultBenefitConfig(): MultiBenefitConfig {
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
}

/**
 * Calculate savings for multiple benefits across the organization
 * 
 * @param employeeCount Total number of employees
 * @param averageSalary Average annual salary
 * @param benefitConfig Configuration for each benefit type
 * @param taxYearData Tax constants for the calculation year
 * @returns Complete calculation result with breakdown by benefit type
 */
export function calculateMultiBenefitSavings(
  employeeCount: number,
  averageSalary: number,
  benefitConfig: MultiBenefitConfig,
  taxYearData: TaxYearData
): CalculationResult {
  // Calculate original NI without any salary sacrifice
  const originalNI = employeeCount * Math.max(0, (averageSalary - taxYearData.niSecondaryThreshold) * taxYearData.niSecondaryRate);
  
  let totalSavings = 0;
  let reducedNI = originalNI;
  const benefitBreakdown: {[key in BenefitType]?: BenefitSavingsResult} = {};
  
  // Calculate savings for each benefit type
  if (benefitConfig[BenefitType.PENSION].enabled) {
    const result = calculatePensionSavings(
      employeeCount,
      averageSalary,
      benefitConfig[BenefitType.PENSION].participationRate,
      benefitConfig[BenefitType.PENSION].contributionValue,
      taxYearData
    );
    benefitBreakdown[BenefitType.PENSION] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.CYCLE_TO_WORK].enabled) {
    const result = calculateCycleToWorkSavings(
      employeeCount,
      benefitConfig[BenefitType.CYCLE_TO_WORK].participationRate,
      benefitConfig[BenefitType.CYCLE_TO_WORK].contributionValue,
      taxYearData
    );
    benefitBreakdown[BenefitType.CYCLE_TO_WORK] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.EV_CAR_SCHEME].enabled) {
    const result = calculateEVCarSchemeSavings(
      employeeCount,
      benefitConfig[BenefitType.EV_CAR_SCHEME].participationRate,
      benefitConfig[BenefitType.EV_CAR_SCHEME].contributionValue,
      taxYearData,
      benefitConfig[BenefitType.EV_CAR_SCHEME].p11dValue
    );
    benefitBreakdown[BenefitType.EV_CAR_SCHEME] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.CHILDCARE].enabled) {
    const result = calculateChildcareSavings(
      employeeCount,
      benefitConfig[BenefitType.CHILDCARE].participationRate,
      benefitConfig[BenefitType.CHILDCARE].contributionValue,
      taxYearData
    );
    benefitBreakdown[BenefitType.CHILDCARE] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  if (benefitConfig[BenefitType.HOLIDAY_TRADING].enabled) {
    const result = calculateHolidayTradingSavings(
      employeeCount,
      averageSalary,
      benefitConfig[BenefitType.HOLIDAY_TRADING].participationRate,
      benefitConfig[BenefitType.HOLIDAY_TRADING].contributionValue,
      taxYearData
    );
    benefitBreakdown[BenefitType.HOLIDAY_TRADING] = result;
    totalSavings += result.totalSavings;
    reducedNI -= result.niSavings;
  }
  
  return {
    annualSavings: totalSavings,
    savingsPerEmployee: totalSavings / employeeCount,
    originalNI,
    reducedNI,
    benefitBreakdown
  };
}

/**
 * Calculate multi-year projection of savings
 * 
 * @param employeeCount Initial number of employees
 * @param avgSalary Initial average salary
 * @param annualEmployeeGrowth Annual percentage increase in employee count
 * @param annualSalaryIncrease Annual percentage increase in average salary
 * @param benefitConfig Benefit configuration
 * @param taxYearData Tax constants 
 * @param years Number of years to project (default: 5)
 * @returns Year-by-year projection of savings
 */
export function calculateMultiYearProjection(
  employeeCount: number,
  avgSalary: number,
  annualEmployeeGrowth: number,
  annualSalaryIncrease: number,
  benefitConfig: MultiBenefitConfig,
  taxYearData: TaxYearData,
  years: number = 5
) {
  const projections = [];
  let currentEmployeeCount = employeeCount;
  let currentSalary = avgSalary;
  let cumulativeSavings = 0;
  
  for (let year = 1; year <= years; year++) {
    // Calculate savings for current year
    const result = calculateMultiBenefitSavings(
      currentEmployeeCount,
      currentSalary,
      benefitConfig,
      taxYearData
    );
    
    // Update cumulative savings
    cumulativeSavings += result.annualSavings;
    
    // Add to projections
    projections.push({
      year,
      employees: currentEmployeeCount,
      averageSalary: currentSalary,
      annualSavings: result.annualSavings,
      cumulativeSavings
    });
    
    // Increase employee count and salary for next year
    currentEmployeeCount = Math.round(currentEmployeeCount * (1 + (annualEmployeeGrowth / 100)));
    currentSalary = currentSalary * (1 + (annualSalaryIncrease / 100));
  }
  
  return projections;
}
