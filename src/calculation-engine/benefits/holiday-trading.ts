// Holiday Trading Calculation Logic
import { TaxYearData, BenefitSavingsResult } from '../types';

/**
 * Calculate savings from holiday trading (buying or selling annual leave)
 * 
 * @param daysTraded Number of days traded (positive for buying, negative for selling)
 * @param dailyRate Daily salary rate (annual salary / working days per year)
 * @param niRate Employer NI rate
 * @param taxRate Income tax rate for the employee
 * @param tradeType Whether the employee is buying or selling holiday
 * @returns Object containing NI and tax savings breakdowns
 */
export function calculateHolidayTrading({
  daysTraded,
  dailyRate,
  niRate,
  taxRate,
  tradeType
}: {
  daysTraded: number;
  dailyRate: number;
  niRate: number;
  taxRate: number;
  tradeType: 'buy' | 'sell';
}): {
  niSavings: number;
  taxSavings: number;
  totalSavings: number;
  tradeType: 'buy' | 'sell';
} {
  const value = daysTraded * dailyRate;
  const niSavings = value * niRate;
  const taxSavings = value * taxRate;
  return {
    niSavings: tradeType === 'buy' ? niSavings : -niSavings,
    taxSavings: tradeType === 'buy' ? taxSavings : -taxSavings,
    totalSavings: tradeType === 'buy' ? niSavings + taxSavings : -(niSavings + taxSavings),
    tradeType
  };
}

/**
 * Calculate Holiday Trading savings for multiple employees
 * This is the implementation matching the source project
 * 
 * @param employeeCount Total number of employees
 * @param averageSalary Average annual salary
 * @param participationRate Percentage of employees using holiday trading
 * @param averageDaysPurchased Average number of days purchased per participating employee
 * @param taxYearData Tax constants for the calculation year
 * @returns Holiday trading savings result
 */
export function calculateHolidayTradingSavings(
  employeeCount: number,
  averageSalary: number,
  participationRate: number,
  averageDaysPurchased: number,
  taxYearData: TaxYearData
): BenefitSavingsResult {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate daily rate (average salary / 52 weeks / 5 days)
  const dailyRate = averageSalary / 52 / 5;
  
  // Calculate annual amount
  const annualAmount = dailyRate * averageDaysPurchased;
  
  // Calculate NI savings (on full amount)
  const niSavings = participatingEmployees * annualAmount * taxYearData.niSecondaryRate;
  
  // Calculate additional wage savings (the actual wage reduction)
  const wageSavings = participatingEmployees * annualAmount;
  
  return {
    niSavings,
    additionalSavings: wageSavings,
    totalSavings: niSavings + wageSavings
  };
}
