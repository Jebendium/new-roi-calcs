/**
 * Shared hooks for calculator components
 * These hooks can be used across different calculator types
 */

// Form and state management hooks
export * from './useCalculatorForm';
export * from './useCalculationState';

// Calculation specific hooks
export * from './useEmployerNICalculator';
export * from './useMultiBenefitCalculator';
export * from './useEmployeeSavingsCalculator';