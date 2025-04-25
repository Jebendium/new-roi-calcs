import React, { useState, useEffect } from 'react';

interface CurrencyInputProps {
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
 * CurrencyInput - A specialized input for currency values
 * 
 * Features:
 * - Automatic formatting with £ symbol
 * - Validation and formatting of numeric values
 * - Handles commas in large numbers
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id,
  value,
  onChange,
  placeholder = "£0.00",
  min,
  max,
  disabled = false,
  required = false,
  name
}) => {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  // Format the initial value when the component mounts or value changes
  useEffect(() => {
    if (value === '' || value === undefined || value === null) {
      setDisplayValue("");
      return;
    }
    
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    
    if (!isNaN(numValue)) {
      // Only format with currency if not focused
      if (!isFocused) {
        setDisplayValue(formatCurrency(numValue));
      } else {
        // When focused, just show the number without currency formatting
        setDisplayValue(numValue.toString());
      }
    } else {
      setDisplayValue("");
    }
  }, [value, isFocused]);
  
  const formatCurrency = (num: number): string => {
    // Format number with commas for thousands
    const parts = num.toFixed(2).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `£${parts.join('.')}`;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (!inputValue) {
      setDisplayValue("");
      onChange("");
      return;
    }
    
    if (isFocused) {
      // When focused, allow more permissive input (just numbers and decimals)
      // Remove any non-numeric characters except decimal point
      const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
      
      // Ensure only one decimal point
      const parts = sanitizedValue.split('.');
      const finalValue = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
      
      setDisplayValue(finalValue);
      onChange(finalValue);
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
      if (min !== undefined && numValue < min) {
        setDisplayValue(formatCurrency(min));
        onChange(min.toString());
        return;
      }
      
      if (max !== undefined && numValue > max) {
        setDisplayValue(formatCurrency(max));
        onChange(max.toString());
        return;
      }
      
      // Keep raw value in state of parent component
      onChange(sanitizedValue);
      
      // Format for display
      setDisplayValue(formatCurrency(numValue));
    } else if (sanitizedValue === "" || sanitizedValue === ".") {
      setDisplayValue(inputValue);
      onChange(sanitizedValue === "." ? "0." : sanitizedValue);
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when focused for easier editing
    e.target.select();
    setIsFocused(true);
    
    // Remove formatting when focused
    if (value !== '' && value !== undefined && value !== null) {
      const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
      if (!isNaN(numValue)) {
        setDisplayValue(numValue.toString());
      }
    }
  };
  
  const handleBlur = () => {
    // Ensure consistent formatting on blur
    setIsFocused(false);
    
    if (displayValue === "" || displayValue === "." || displayValue === "£" || displayValue === "£.") {
      setDisplayValue("");
      onChange("");
      return;
    }
    
    const numValue = parseFloat(displayValue.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(numValue)) {
      setDisplayValue(formatCurrency(numValue));
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

export default CurrencyInput;