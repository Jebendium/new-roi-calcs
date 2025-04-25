import { useState, useCallback } from 'react';
import { FormValues } from '../../core/types';

/**
 * Custom hook for managing calculator result state
 * 
 * Provides a standardized way to manage calculation results
 * and loading states across all calculators
 * 
 * @param calculateFn - Function that performs the calculation
 * @returns Calculation state and methods
 */
export function useCalculationState<T extends FormValues, R>(
  calculateFn: (values: T) => R
) {
  const [result, setResult] = useState<R | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Perform calculation with the given values
  const calculate = useCallback((values: T) => {
    setIsCalculating(true);
    setError(null);
    
    try {
      // Wrap in setTimeout to ensure UI remains responsive
      setTimeout(() => {
        try {
          const calculationResult = calculateFn(values);
          setResult(calculationResult);
          setIsCalculating(false);
        } catch (err) {
          console.error('Calculation error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred during calculation');
          setIsCalculating(false);
        }
      }, 0);
    } catch (err) {
      console.error('Calculation error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
      setIsCalculating(false);
    }
  }, [calculateFn]);

  // Reset calculation state
  const resetCalculation = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    isCalculating,
    error,
    calculate,
    resetCalculation
  };
}

export default useCalculationState;