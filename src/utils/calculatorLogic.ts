import { CalculatorType, FormValues } from '../types/calculator';
import { safeNum } from './calculator';

/**
 * Calculate Employer NI savings from salary sacrifice
 */
export function calculateEmployerNISavings({ 
  grossSalary, 
  salarySacrifice, 
  taxYearData 
}: { 
  grossSalary: number; 
  salarySacrifice: number;
  taxYearData: any;
}) {
  // Get NI thresholds and rates from tax data
  const primaryThreshold = taxYearData.niPrimaryThreshold || 12570;
  const upperEarningsLimit = taxYearData.niUpperEarningsLimit || 50270;
  const employerRate = taxYearData.niEmployerRate || 0.138;

  // Calculate effective salary after sacrifice
  const effectiveSalary = grossSalary - salarySacrifice;
  
  // Calculate NI contributions before sacrifice
  let niBeforeSacrifice = 0;
  if (grossSalary > primaryThreshold) {
    if (grossSalary <= upperEarningsLimit) {
      niBeforeSacrifice = (grossSalary - primaryThreshold) * employerRate;
    } else {
      niBeforeSacrifice = (upperEarningsLimit - primaryThreshold) * employerRate + 
        (grossSalary - upperEarningsLimit) * employerRate;
    }
  }
  
  // Calculate NI contributions after sacrifice
  let niAfterSacrifice = 0;
  if (effectiveSalary > primaryThreshold) {
    if (effectiveSalary <= upperEarningsLimit) {
      niAfterSacrifice = (effectiveSalary - primaryThreshold) * employerRate;
    } else {
      niAfterSacrifice = (upperEarningsLimit - primaryThreshold) * employerRate + 
        (effectiveSalary - upperEarningsLimit) * employerRate;
    }
  }
  
  // Calculate savings
  const niSavings = niBeforeSacrifice - niAfterSacrifice;
  
  return {
    niSavings,
    breakdown: {
      grossSalary,
      salarySacrifice,
      effectiveSalary,
      niBeforeSacrifice,
      niAfterSacrifice,
      primaryThreshold,
      upperEarningsLimit,
      employerRate
    }
  };
}

/**
 * Calculate Employee tax and NI savings from salary sacrifice
 */
export function calculateEmployeeSavings({ 
  salarySacrifice, 
  taxYearData 
}: { 
  salarySacrifice: number;
  taxYearData: any;
}) {
  // Get tax and NI rates from tax data
  const basicRate = taxYearData.basicRate || 0.2;
  const niPrimaryRate = taxYearData.niPrimaryRate || 0.12;
  
  // Calculate tax and NI savings
  const taxSavings = salarySacrifice * basicRate;
  const niSavings = salarySacrifice * niPrimaryRate;
  
  // Calculate total savings
  const totalSavings = taxSavings + niSavings;
  
  return {
    totalSavings,
    breakdown: {
      salarySacrifice,
      taxSavings,
      niSavings,
      basicRate,
      niPrimaryRate
    }
  };
}

/**
 * Calculate P11D EV car benefit
 */
export function calculateP11dEvCar({ 
  listPrice, 
  bikRate 
}: { 
  listPrice: number; 
  bikRate: number;
}) {
  // Calculate P11D value
  const p11dValue = listPrice * (bikRate / 100);
  
  // Standard BIK rate for comparison (average for non-EV cars)
  const standardBikRate = 25;
  const standardP11dValue = listPrice * (standardBikRate / 100);
  
  // Calculate tax savings (assuming basic rate taxpayer)
  const basicRate = 0.2;
  const taxSavings = (standardP11dValue - p11dValue) * basicRate;
  
  return {
    p11dValue,
    standardP11dValue,
    taxSavings,
    bikRate,
    standardBikRate,
    breakdown: {
      listPrice,
      p11dValue,
      standardP11dValue,
      taxSavings,
      bikRate,
      standardBikRate,
      basicRate
    }
  };
}

/**
 * Calculate childcare voucher savings
 */
export function calculateChildcareVouchers({ 
  voucherAmount, 
  niRate, 
  taxRate 
}: { 
  voucherAmount: number; 
  niRate: number;
  taxRate: number;
}) {
  // Calculate annual voucher amount
  const annualVoucherAmount = voucherAmount * 12;
  
  // Calculate tax and NI savings
  const taxSavings = annualVoucherAmount * taxRate;
  const niSavings = annualVoucherAmount * niRate;
  
  return {
    taxSavings,
    niSavings,
    totalSavings: taxSavings + niSavings,
    breakdown: {
      voucherAmount,
      annualVoucherAmount,
      taxRate,
      niRate,
      taxSavings,
      niSavings
    }
  };
}

/**
 * Calculate holiday trading impact
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
  tradeType: string;
}) {
  // Calculate gross value
  const grossValue = daysTraded * dailyRate;
  
  // Calculate tax and NI impact
  const taxImpact = grossValue * taxRate;
  const niImpact = grossValue * niRate;
  
  // Calculate net impact based on trade type
  const multiplier = tradeType === 'buy' ? -1 : 1;
  const netImpact = multiplier * (grossValue - taxImpact - niImpact);
  
  return {
    grossValue,
    taxImpact,
    niImpact,
    netImpact,
    breakdown: {
      daysTraded,
      dailyRate,
      taxRate,
      niRate,
      tradeType,
      grossValue,
      taxImpact,
      niImpact,
      netImpact
    }
  };
}

/**
 * Calculate Business System ROI
 */
export function calculateBusinessSystemROI({ 
  annualSystemCost, 
  annualCostSavings, 
  annualTimeSavingsHours, 
  productivityGainPercent, 
  numEmployees, 
  avgHourlyRate 
}: { 
  annualSystemCost: number; 
  annualCostSavings: number;
  annualTimeSavingsHours: number;
  productivityGainPercent: number;
  numEmployees: number;
  avgHourlyRate: number;
}) {
  // Calculate time savings value
  const timeSavingsValue = annualTimeSavingsHours * avgHourlyRate;
  
  // Calculate productivity gain value
  const avgAnnualSalary = avgHourlyRate * 1950; // ~37.5 hours per week * 52 weeks
  const productivityGainValue = (avgAnnualSalary * numEmployees) * (productivityGainPercent / 100);
  
  // Calculate total annual benefits
  const totalAnnualBenefits = annualCostSavings + timeSavingsValue + productivityGainValue;
  
  // Calculate ROI
  const roi = totalAnnualBenefits / annualSystemCost;
  
  // Calculate payback period in years
  const paybackPeriod = annualSystemCost / totalAnnualBenefits;
  
  return {
    roi,
    paybackPeriod,
    totalAnnualBenefits,
    breakdown: {
      annualSystemCost,
      annualCostSavings,
      annualTimeSavingsHours,
      productivityGainPercent,
      numEmployees,
      avgHourlyRate,
      timeSavingsValue,
      productivityGainValue,
      totalAnnualBenefits,
      roi,
      paybackPeriod
    }
  };
}

/**
 * Calculate results based on calculator type and form values
 */
export function calculateResult(calculator: CalculatorType, values: FormValues) {
  if (calculator === 'employer-ni') {
    const year = values.taxYear || '2023';
    const region = values.region || 'uk';
    // Mock tax data for now
    const taxYearData = {
      niPrimaryThreshold: 12570,
      niUpperEarningsLimit: 50270,
      niEmployerRate: 0.138,
      niPrimaryRate: 0.12,
      basicRate: 0.2
    };
    return calculateEmployerNISavings({
      grossSalary: safeNum(values.grossSalary),
      salarySacrifice: safeNum(values.salarySacrifice),
      taxYearData
    });
  }
  
  if (calculator === 'employee-savings') {
    const year = values.taxYear || '2023';
    const region = values.region || 'uk';
    // Mock tax data for now
    const taxYearData = {
      basicRate: 0.2,
      niPrimaryRate: 0.12
    };
    return calculateEmployeeSavings({
      salarySacrifice: safeNum(values.salarySacrifice),
      taxYearData
    });
  }
  
  if (calculator === 'p11d-ev-car') {
    return calculateP11dEvCar({
      listPrice: safeNum(values.listPrice),
      bikRate: safeNum(values.bikRate)
    });
  }
  
  if (calculator === 'childcare-vouchers') {
    const year = values.taxYear || '2023';
    const region = values.region || 'uk';
    // Mock tax data for now
    const taxYearData = {
      basicRate: 0.2,
      niPrimaryRate: 0.12
    };
    return calculateChildcareVouchers({
      voucherAmount: safeNum(values.voucherAmount),
      niRate: taxYearData.niPrimaryRate,
      taxRate: taxYearData.basicRate
    });
  }
  
  if (calculator === 'holiday-trading') {
    const year = values.taxYear || '2023';
    const region = values.region || 'uk';
    // Mock tax data for now
    const taxYearData = {
      basicRate: 0.2,
      niPrimaryRate: 0.12
    };
    return calculateHolidayTrading({
      daysTraded: safeNum(values.daysTraded),
      dailyRate: safeNum(values.dailyRate),
      niRate: taxYearData.niPrimaryRate,
      taxRate: taxYearData.basicRate,
      tradeType: values.tradeType as string || 'buy'
    });
  }
  
  if (calculator === 'business-roi') {
    return calculateBusinessSystemROI({
      annualSystemCost: safeNum(values.annualSystemCost),
      annualCostSavings: safeNum(values.annualCostSavings),
      annualTimeSavingsHours: safeNum(values.annualTimeSavingsHours),
      productivityGainPercent: safeNum(values.productivityGainPercent),
      numEmployees: safeNum(values.numEmployees),
      avgHourlyRate: safeNum(values.avgHourlyRate)
    });
  }
  
  return null;
}