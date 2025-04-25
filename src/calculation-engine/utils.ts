// Shared calculation utilities
import { TaxYearData } from './types';

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
 * Calculate percentage reduction in NI costs
 */
export const calculateNIReduction = (originalNI: number, reducedNI: number): number => {
  return originalNI > 0 
    ? ((originalNI - reducedNI) / originalNI) * 100 
    : 0;
};

/**
 * Calculate income tax based on salary and tax rates
 */
export const calculateIncomeTax = (salary: number, taxData: TaxYearData): number => {
  let tax = 0;
  
  if (salary <= taxData.personalAllowance) {
    return 0;
  }
  
  // Check if it's Scottish tax rates
  if ('starterRate' in taxData && taxData.starterRate !== undefined) {
    // Scottish tax calculation
    if (salary > taxData.personalAllowance) {
      const starterBand = Math.min(
        (taxData.starterThreshold as number) - taxData.personalAllowance, 
        Math.max(0, salary - taxData.personalAllowance)
      );
      tax += starterBand * taxData.starterRate;
    }
    
    if (salary > (taxData.starterThreshold as number)) {
      const basicBand = Math.min(
        (taxData.basicThreshold as number) - (taxData.starterThreshold as number), 
        Math.max(0, salary - (taxData.starterThreshold as number))
      );
      tax += basicBand * taxData.basicRate;
    }
    
    if (salary > taxData.basicThreshold) {
      const intermediateBand = Math.min(
        (taxData.intermediateThreshold as number) - taxData.basicThreshold, 
        Math.max(0, salary - taxData.basicThreshold)
      );
      tax += intermediateBand * (taxData.intermediateRate as number);
    }
    
    if (salary > (taxData.intermediateThreshold as number)) {
      const higherBand = Math.min(
        taxData.higherThreshold - (taxData.intermediateThreshold as number), 
        Math.max(0, salary - (taxData.intermediateThreshold as number))
      );
      tax += higherBand * taxData.higherRate;
    }
    
    if (salary > taxData.higherThreshold) {
      const additionalBand = Math.max(0, salary - taxData.higherThreshold);
      tax += additionalBand * (taxData.topRate as number);
    }
  } else {
    // UK tax calculation
    if (salary > taxData.personalAllowance) {
      const basicBand = Math.min(
        taxData.basicThreshold - taxData.personalAllowance, 
        Math.max(0, salary - taxData.personalAllowance)
      );
      tax += basicBand * taxData.basicRate;
    }
    
    if (salary > taxData.basicThreshold) {
      const higherBand = Math.min(
        taxData.higherThreshold - taxData.basicThreshold, 
        Math.max(0, salary - taxData.basicThreshold)
      );
      tax += higherBand * taxData.higherRate;
    }
    
    if (salary > taxData.higherThreshold) {
      const additionalBand = Math.max(0, salary - taxData.higherThreshold);
      tax += additionalBand * (taxData.additionalRate as number);
    }
  }
  
  return tax;
};

/**
 * Calculate employee National Insurance
 */
export const calculateEmployeeNI = (salary: number, taxData: TaxYearData): number => {
  if (salary <= taxData.niPrimaryThreshold) {
    return 0;
  }
  
  let ni = 0;
  
  if (salary <= (taxData.niUpperEarningsLimit ?? Infinity)) {
    ni = (salary - taxData.niPrimaryThreshold) * taxData.niPrimaryRate;
  } else {
    ni = ((taxData.niUpperEarningsLimit as number) - taxData.niPrimaryThreshold) * taxData.niPrimaryRate;
    ni += (salary - (taxData.niUpperEarningsLimit as number)) * (taxData.niPrimaryUpperRate ?? 0.02);
  }
  
  return ni;
};

/**
 * Calculate employer National Insurance
 */
export const calculateEmployerNI = (salary: number, taxData: TaxYearData): number => {
  if (salary <= taxData.niSecondaryThreshold) {
    return 0;
  }
  
  return (salary - taxData.niSecondaryThreshold) * taxData.niSecondaryRate;
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
