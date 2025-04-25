/**
 * Utility functions for consistent formatting across calculators
 * Following UK English conventions
 */

/**
 * Format a number as GBP currency
 * Example: £1,234.56
 */
export const formatCurrency = (value: number, minimumFractionDigits = 2, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format a number as a percentage
 * Example: 12.5%
 */
export const formatPercentage = (value: number, minimumFractionDigits = 1, maximumFractionDigits = 1): string => {
  return `${value.toLocaleString('en-GB', {
    minimumFractionDigits,
    maximumFractionDigits,
  })}%`;
};

/**
 * Format a number with thousands separators
 * Example: 1,234,567
 */
export const formatNumber = (value: number, minimumFractionDigits = 0, maximumFractionDigits = 0): string => {
  return value.toLocaleString('en-GB', {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

/**
 * Format a date in UK format
 * Example: 01/01/2025
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

/**
 * Format a tax year
 * Example: 2024-2025
 */
export const formatTaxYear = (startYear: number): string => {
  return `${startYear}-${startYear + 1}`;
};

/**
 * Format months (for payback periods)
 * Example: 6.5 months
 */
export const formatMonths = (months: number): string => {
  return `${months.toFixed(1)} months`;
};

/**
 * Safely get a value with fallback
 * Useful for handling undefined or null values
 */
export const safeValue = <T>(value: T | undefined | null, fallback: T): T => {
  return value !== undefined && value !== null ? value : fallback;
};

/**
 * UK tax constants for 2025-2026
 */
export const UK_TAX_CONSTANTS = {
  personalAllowance: 12570,
  basicRate: 0.20,
  basicThreshold: 50270,
  higherRate: 0.40,
  higherThreshold: 125140,
  additionalRate: 0.45,
  niPrimaryRate: 0.12,
  niSecondaryRate: 0.15,
  niUpperEarningsLimit: 50270,
  niPrimaryUpperRate: 0.02,
  niSecondaryUpperRate: 0.15,
  niPrimaryThreshold: 12570,
  niSecondaryThreshold: 5000,
};