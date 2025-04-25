import React, { useState, useEffect } from 'react';

interface PercentageInputProps {
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

/**
 * PercentageInput - A specialized input for percentage values
 * 
 * Features:
 * - Automatic formatting with % symbol
 * - Validation and formatting of numeric values
 * - Enforces min/max constraints
 */
export const PercentageInput: React.FC<PercentageInputProps> = ({
  id,
  value,
  onChange,
  placeholder = "0%",
  min = 0,
  max = 100,
  disabled = false,
  required = false,
  name
}) => {
  const [displayValue, setDisplayValue] = useState("");
  
  // Format the initial value when the component mounts or value changes
  useEffect(() => {
    if (value === '' || value === undefined || value === null) {
      setDisplayValue("");
      return;
    }
    
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    
    if (!isNaN(numValue)) {
      setDisplayValue(formatPercentage(numValue));
    } else {
      setDisplayValue("");
    }
  }, [value]);
  
  const formatPercentage = (num: number): string => {
    return `${num}%`;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (!inputValue) {
      setDisplayValue("");
      onChange("");
      return;
    }
    
    // Strip non-numeric characters except decimal point
    const strippedValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = strippedValue.split('.');
    const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
    
    const numValue = parseFloat(sanitizedValue);
    
    if (!isNaN(numValue)) {
      // Check min/max constraints
      if (numValue < min) {
        setDisplayValue(formatPercentage(min));
        onChange(min.toString());
        return;
      }
      
      if (numValue > max) {
        setDisplayValue(formatPercentage(max));
        onChange(max.toString());
        return;
      }
      
      // Keep raw value in state of parent component
      onChange(sanitizedValue);
      
      // Format for display
      setDisplayValue(formatPercentage(numValue));
    } else if (sanitizedValue === "" || sanitizedValue === ".") {
      setDisplayValue(inputValue);
      onChange(sanitizedValue === "." ? "0." : sanitizedValue);
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when focused for easier editing
    e.target.select();
  };
  
  const handleBlur = () => {
    // Ensure consistent formatting on blur
    if (displayValue === "" || displayValue === "%" || displayValue === ".%") {
      setDisplayValue("");
      onChange("");
      return;
    }
    
    const numValue = parseFloat(displayValue.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(numValue)) {
      setDisplayValue(formatPercentage(numValue));
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
        onFocus={handleFocus}
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

export default PercentageInput;