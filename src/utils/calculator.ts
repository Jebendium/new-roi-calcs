// Utility functions for the calculator

/**
 * Safely converts a string or number value to a number
 * Returns the fallback value if conversion fails
 */
export function safeNum(val: string | number | undefined, fallback = 0): number {
  if (typeof val === 'number' && !isNaN(val)) return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    return !isNaN(parsed) ? parsed : fallback;
  }
  return fallback;
}

/**
 * Formats a number as GBP currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Gets a readable title for the calculator
 */
export function getCalculatorTitle(calculatorType: string): string {
  switch (calculatorType) {
    case 'employer-ni': return 'Employer NI Savings';
    case 'employee-savings': return 'Employee Tax & NI Savings';
    case 'p11d-ev-car': return 'P11D EV Car Benefit';
    case 'childcare-vouchers': return 'Childcare Vouchers';
    case 'holiday-trading': return 'Holiday Trading';
    case 'business-roi': return 'Business System ROI';
    default: return 'Calculator';
  }
}