import { useState, useCallback } from 'react';
import { FormValues } from '../../core/types';
import { safeNum } from '../../core/calculator-utils';

/**
 * Custom hook for managing calculator form state
 * 
 * Provides standardized form handling with validation for all calculators
 * 
 * @param initialValues - Initial form values
 * @param validateFn - Optional custom validation function
 * @returns Form management methods and state
 */
export function useCalculatorForm<T extends FormValues>(
  initialValues: T,
  validateFn?: (values: T) => string[]
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes to form values
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    // Convert appropriate fields to numbers
    if (type === 'number' || name.includes('count') || name.includes('amount') || name.includes('salary')) {
      parsedValue = value === '' ? '' : safeNum(value);
    }

    // Handle checkbox inputs
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setValues(prev => ({
      ...prev,
      [name]: parsedValue
    }));
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setIsDirty(true);
  }, [errors]);

  // Set a specific field value programmatically
  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setIsDirty(true);
  }, [errors]);

  // Default validation for required fields
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const newWarnings: string[] = [];
    
    // Check for empty required fields
    Object.entries(values).forEach(([key, value]) => {
      // Skip non-required fields or fields that are explicitly optional
      if (key.endsWith('Optional')) return;
      
      if (value === '' || value === undefined || value === null) {
        newErrors[key] = 'This field is required';
        newWarnings.push(`${key.replace(/([A-Z])/g, ' $1').trim()} is required`);
      }
    });
    
    // Run custom validation if provided
    if (validateFn) {
      const customWarnings = validateFn(values);
      newWarnings.push(...customWarnings);
    }
    
    setErrors(newErrors);
    setWarnings(newWarnings);
    
    return Object.keys(newErrors).length === 0 && newWarnings.length === 0;
  }, [values, validateFn]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setWarnings([]);
    setIsDirty(false);
  }, [initialValues]);

  return {
    values,
    errors,
    warnings,
    isDirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    validateForm,
    resetForm,
    setIsSubmitting
  };
}

export default useCalculatorForm;