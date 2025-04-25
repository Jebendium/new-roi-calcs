// Childcare Vouchers Calculation Logic
import { TaxYearData, BenefitSavingsResult } from '../types';

/**
 * Calculate savings from childcare vouchers for an individual employee
 * 
 * @param voucherAmount Annual voucher amount
 * @param niRate Employer NI rate
 * @param taxRate Income tax rate for the employee
 * @returns Object containing NI and tax savings breakdowns
 */
export function calculateChildcareVouchers({
  voucherAmount,
  niRate,
  taxRate
}: {
  voucherAmount: number;
  niRate: number;
  taxRate: number;
}): {
  niSavings: number;
  taxSavings: number;
  totalSavings: number;
} {
  const niSavings = voucherAmount * niRate;
  const taxSavings = voucherAmount * taxRate;
  return {
    niSavings,
    taxSavings,
    totalSavings: niSavings + taxSavings
  };
}

/**
 * Calculate Childcare Vouchers savings for multiple employees
 * This is the implementation matching the source project
 * 
 * @param employeeCount Total number of employees
 * @param participationRate Percentage of employees using childcare vouchers
 * @param monthlyAmount Monthly voucher amount per employee
 * @param taxYearData Tax constants for the calculation year
 * @returns Childcare voucher savings result
 */
export function calculateChildcareSavings(
  employeeCount: number,
  participationRate: number,
  monthlyAmount: number,
  taxYearData: TaxYearData
): BenefitSavingsResult {
  // Calculate number of participating employees
  const participatingEmployees = employeeCount * (participationRate / 100);
  
  // Calculate annual amount
  const annualAmount = monthlyAmount * 12;
  
  // Calculate NI savings (on full amount)
  const niSavings = participatingEmployees * annualAmount * taxYearData.niSecondaryRate;
  
  return {
    niSavings,
    additionalSavings: 0,
    totalSavings: niSavings
  };
}
