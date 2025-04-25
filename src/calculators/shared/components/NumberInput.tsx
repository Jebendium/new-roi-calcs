import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  allowDecimals?: boolean;
}

/**
 * NumberInput - A specialized input for numeric values
 * 
 * Features:
 * - Validation and formatting of numeric values
 * - Optional decimal support
 * - Min/max constraints
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  value,
  onChange,
  placeholder = "0",
  min,
  max,
  step = 1,
  disabled = false,
  required = false,
  name,
  allowDecimals = true
}) => {
  const [displayValue, setDisplayValue] = useState("");
  
  // Format the initial value when the component mounts or value changes
  useEffect(() => {
    if (value === '' || value === undefined || value === null) {
      setDisplayValue("");
      return;
    }
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (!isNaN(numValue)) {
      setDisplayValue(allowDecimals ? numValue.toString() : Math.round(numValue).toString());
    } else {
      setDisplayValue("");
    }
  }, [value, allowDecimals]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (!inputValue) {
      setDisplayValue("");
      onChange("");
      return;
    }
    
    // Handle decimal restrictions
    let pattern = allowDecimals ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
    if (!pattern.test(inputValue)) {
      return;
    }
    
    // Ensure only one decimal point
    if (allowDecimals) {
      const parts = inputValue.split('.');
      if (parts.length > 2) return;
    }
    
    setDisplayValue(inputValue);
    
    // Try to parse as a number
    const numValue = parseFloat(inputValue);
    
    if (!isNaN(numValue)) {
      // Check min/max constraints
      if (min !== undefined && numValue < min) {
        // Allow typing but don't update parent until valid
        return;
      }
      
      if (max !== undefined && numValue > max) {
        // Allow typing but don't update parent until valid
        return;
      }
    }
    
    // Update parent state
    onChange(inputValue);
  };
  
  const handleBlur = () => {
    // On blur, validate and format the value
    if (displayValue === "") {
      onChange("");
      return;
    }
    
    const numValue = parseFloat(displayValue);
    
    if (isNaN(numValue)) {
      setDisplayValue("");
      onChange("");
      return;
    }
    
    // Apply min/max constraints
    if (min !== undefined && numValue < min) {
      setDisplayValue(min.toString());
      onChange(min.toString());
      return;
    }
    
    if (max !== undefined && numValue > max) {
      setDisplayValue(max.toString());
      onChange(max.toString());
      return;
    }
    
    // Format appropriately
    if (!allowDecimals) {
      const roundedValue = Math.round(numValue).toString();
      setDisplayValue(roundedValue);
      onChange(roundedValue);
    }
  };
  
  return (
    <div className="relative">
      <input
        id={id}
        name={name || id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500"
        aria-describedby={`${id}-description`}
      />
    </div>
  );
};

export default NumberInput;