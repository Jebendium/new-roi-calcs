import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  tooltip?: string;
  tooltipIcon?: React.ReactNode;
  error?: string;
  className?: string;
  required?: boolean;
  helperText?: string;
}

/**
 * Standardized form field component with label and optional tooltip
 * To be used across all calculators for consistent UI/UX
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  children,
  tooltip,
  tooltipIcon,
  error,
  className = '',
  required = false,
  helperText,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <label 
          htmlFor={htmlFor} 
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {tooltip && tooltipIcon && (
          <div className="ml-2">
            {tooltipIcon}
          </div>
        )}
      </div>
      
      {children}
      
      {helperText && !error && (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;