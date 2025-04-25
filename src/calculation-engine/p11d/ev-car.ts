// P11D EV Car Calculation Logic
import { TaxYearData, BenefitSavingsResult } from '../types';

/**
 * Calculate P11D value and benefit in kind for electric vehicles
 * 
 * @param listPrice Vehicle list price
 * @param bikRate Benefit in kind percentage rate
 * @returns Object containing P11D value, BIK rate, and BIK value
 */
export function calculateP11dEvCar({
  listPrice,
  bikRate
}: {
  listPrice: number;
  bikRate: number;
}): {
  p11dValue: number;
  bikRate: number;
  bikValue: number;
} {
  const p11dValue = listPrice;
  const bikValue = p11dValue * (bikRate / 100);
  return {
    p11dValue,
    bikRate,
    bikValue
  };
}

/**
 * Calculate Electric Vehicle Car Scheme savings for multiple employees
 * This is the implementation matching the source project
 * 
 * @param employeeCount Total number of employees
 * @param participationRate Percentage of employees in the EV scheme
 * @param monthlyGrossAmount Monthly gross reduction in salary
 * @param taxYearData Tax constants for the calculation year
 * @param p11dValue Optional P11D value of the vehicle
 * @returns EV car scheme savings result
 */
export function calculateEVCarSchemeSavings(
  employeeCount: number,
  participationRate: number,
  monthlyGrossAmount: number,
  taxYearData: TaxYearData,
  p11dValue?: number
): BenefitSavingsResult {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate annual gross amount
  const annualGrossAmount = monthlyGrossAmount * 12;
  
  // Calculate benefit in kind (2% of the P11D value)
  // If P11D value is provided, use it; otherwise, use the annual gross amount (backward compatibility)
  const benefitInKind = p11dValue ? p11dValue * 0.02 : annualGrossAmount * 0.02;
  
  // Calculate NI savings (on gross amount minus benefit in kind)
  const niSavings = participatingEmployees * (annualGrossAmount - benefitInKind) * taxYearData.niSecondaryRate;
  
  return {
    niSavings,
    additionalSavings: 0,
    totalSavings: niSavings
  };
}

/**
 * Calculate employee tax savings from an EV car scheme
 * 
 * @param salary Annual salary
 * @param monthlyGrossAmount Monthly gross reduction in salary
 * @param p11dValue P11D value of the vehicle
 * @param bikPercentage Benefit in kind percentage (typically 2% for EVs)
 * @param taxYearData Tax constants for the calculation year
 * @param isScottish Whether to use Scottish tax rates
 * @returns Object containing tax savings details
 */
export function calculateEVCarEmployeeSavings({
  salary,
  monthlyGrossAmount,
  p11dValue,
  bikPercentage = 2,
  taxYearData,
  isScottish = false
}: {
  salary: number;
  monthlyGrossAmount: number;
  p11dValue: number;
  bikPercentage?: number;
  taxYearData: TaxYearData;
  isScottish?: boolean;
}) {
  // Calculate annual gross reduction
  const annualGrossReduction = monthlyGrossAmount * 12;
  
  // Calculate benefit in kind value
  const bikValue = p11dValue * (bikPercentage / 100);
  
  // Calculate taxable benefit (BIK)
  const taxableAmount = bikValue;
  
  // Determine applicable tax rate based on salary
  let taxRate: number;
  
  if (isScottish) {
    // Scottish tax rate determination
    if (salary <= (taxYearData.starterThreshold || 0)) {
      taxRate = taxYearData.starterRate || 0;
    } else if (salary <= (taxYearData.basicThreshold || 0)) {
      taxRate = taxYearData.basicRate;
    } else if (salary <= (taxYearData.intermediateThreshold || 0)) {
      taxRate = taxYearData.intermediateRate || 0;
    } else if (salary <= taxYearData.higherThreshold) {
      taxRate = taxYearData.higherRate;
    } else {
      taxRate = taxYearData.topRate || 0;
    }
  } else {
    // UK tax rate determination
    if (salary <= taxYearData.basicThreshold) {
      taxRate = taxYearData.basicRate;
    } else if (salary <= taxYearData.higherThreshold) {
      taxRate = taxYearData.higherRate;
    } else {
      taxRate = taxYearData.additionalRate || 0.45;
    }
  }
  
  // Calculate tax on benefit in kind
  const bikTax = taxableAmount * taxRate;
  
  // Calculate tax savings from salary sacrifice
  const taxSavings = annualGrossReduction * taxRate;
  
  // Calculate NI savings
  const niSavings = annualGrossReduction * taxYearData.niPrimaryRate;
  
  // Calculate net benefit
  const netBenefit = taxSavings + niSavings - bikTax;
  
  return {
    grossReduction: annualGrossReduction,
    benefitInKindValue: bikValue,
    benefitInKindTax: bikTax,
    taxSavings,
    niSavings,
    netBenefit,
    effectiveMonthlyLeaseCost: (monthlyGrossAmount - (netBenefit / 12))
  };
}
