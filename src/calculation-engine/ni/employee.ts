// Employee Tax & NI Savings Calculator Logic
import { TaxYearData } from '../types';
import { calculateIncomeTax, calculateEmployeeNI } from '../utils';

/**
 * Calculate employee tax and NI savings from salary sacrifice
 */
export function calculateEmployeeSavings({
  salary,
  salarySacrifice,
  taxYearData,
  isScottish = false
}: {
  salary: number;
  salarySacrifice: number;
  taxYearData: TaxYearData;
  isScottish?: boolean;
}) {
  // Calculate income tax without salary sacrifice
  const originalTax = calculateIncomeTax(salary, taxYearData);
  
  // Calculate income tax with salary sacrifice
  const reducedSalary = Math.max(0, salary - salarySacrifice);
  const reducedTax = calculateIncomeTax(reducedSalary, taxYearData);
  
  // Calculate NI without salary sacrifice
  const originalNI = calculateEmployeeNI(salary, taxYearData);
  
  // Calculate NI with salary sacrifice
  const reducedNI = calculateEmployeeNI(reducedSalary, taxYearData);
  
  // Calculate savings
  const taxSavings = originalTax - reducedTax;
  const niSavings = originalNI - reducedNI;
  const totalSavings = taxSavings + niSavings;
  
  return {
    monthlyTakeHomeIncrease: totalSavings / 12,
    annualTaxSavings: taxSavings,
    annualNISavings: niSavings,
    totalAnnualSavings: totalSavings,
    contributionAmount: salarySacrifice,
    originalTax,
    reducedTax,
    originalNI,
    reducedNI
  };
}

/**
 * Calculate employee savings for a specific benefit contribution percentage
 */
export function calculateEmployeeSavingsPercentage({
  annualSalary,
  contributionPercentage,
  taxYearData,
  isScottish = false
}: {
  annualSalary: number;
  contributionPercentage: number;
  taxYearData: TaxYearData;
  isScottish?: boolean;
}) {
  // Calculate contribution amount
  const annualContribution = annualSalary * (contributionPercentage / 100);
  
  // Use the main calculation function
  return calculateEmployeeSavings({
    salary: annualSalary,
    salarySacrifice: annualContribution,
    taxYearData,
    isScottish
  });
}

/**
 * Calculate retirement savings projection
 */
export function calculateRetirementProjection({
  annualSalary,
  contributionPercentage,
  years = 30,
  annualGrowthRate = 0.05
}: {
  annualSalary: number;
  contributionPercentage: number;
  years?: number;
  annualGrowthRate?: number;
}) {
  const annualContribution = annualSalary * (contributionPercentage / 100);
  let potValue = 0;
  
  const yearlyBreakdown = [];
  
  for (let year = 1; year <= years; year++) {
    // Calculate growth on existing pot
    const growthAmount = potValue * annualGrowthRate;
    
    // Add annual contribution
    potValue = potValue + annualContribution + growthAmount;
    
    // Add to yearly breakdown
    yearlyBreakdown.push({
      year,
      contribution: annualContribution,
      growth: growthAmount,
      totalValue: potValue
    });
  }
  
  return {
    potValue,
    totalContributions: annualContribution * years,
    yearlyBreakdown
  };
}
