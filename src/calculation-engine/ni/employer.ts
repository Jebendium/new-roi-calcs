// Employer NI Savings Calculator Logic
import { TaxYearData as TaxYearRegion } from '../types';

/**
 * Calculate pension-based NI savings for employer
 */
export function calculatePensionSavings(
  employeeCount: number,
  averageSalary: number,
  participationRate: number,
  contributionPercentage: number,
  taxYearData: TaxYearRegion
) {
  const participatingEmployees = Math.round(employeeCount * (participationRate / 100));
  const salarySacrifice = averageSalary * (contributionPercentage / 100);
  const totalSalarySacrifice = participatingEmployees * salarySacrifice;
  
  // Calculate NI savings
  const niRate = taxYearData.niSecondaryRate ?? 0;
  const niSavings = totalSalarySacrifice * niRate;
  
  return {
    totalSavings: niSavings,
    niSavings: niSavings,
    participatingEmployees,
    averageAnnualSavingsPerEmployee: participatingEmployees > 0 ? niSavings / participatingEmployees : 0,
    breakdown: {
      niRate,
      participationRate,
      contributionPercentage,
      employeeCount,
      participatingEmployees,
      averageSalary,
      salarySacrifice,
      totalSalarySacrifice
    }
  };
}

/**
 * Calculate Cycle to Work scheme NI savings for employer
 */
export function calculateCycleToWorkSavings(
  employeeCount: number,
  participationRate: number,
  averageBikeValue: number,
  taxYearData: TaxYearRegion
) {
  const participatingEmployees = Math.round(employeeCount * (participationRate / 100));
  const totalBikeValue = participatingEmployees * averageBikeValue;
  
  // Calculate NI savings
  const niRate = taxYearData.niSecondaryRate ?? 0;
  const niSavings = totalBikeValue * niRate;
  
  return {
    totalSavings: niSavings,
    niSavings: niSavings,
    participatingEmployees,
    averageAnnualSavingsPerEmployee: participatingEmployees > 0 ? niSavings / participatingEmployees : 0,
    breakdown: {
      niRate,
      participationRate,
      employeeCount,
      participatingEmployees,
      averageBikeValue,
      totalBikeValue
    }
  };
}

export function calculateEmployerNISavings({
  salarySacrifice,
  taxYearData
}: {
  salarySacrifice: number;
  taxYearData: TaxYearRegion;
}) {
  // Defensive: handle missing optional fields with fallback/defaults if needed
  const niRate = taxYearData.niSecondaryRate ?? 0;
  const savings = salarySacrifice * niRate;
  return {
    niSavings: savings,
    breakdown: {
      niRate,
      salarySacrifice
    }
  };
}
