import React from 'react';
import { InfoTooltip } from './InfoTooltip';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  tooltip?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * FormField - A reusable form field wrapper with label and optional tooltip
 * 
 * Provides consistent styling and behavior for form fields across calculators
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  tooltip,
  error,
  required = false,
  children
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label 
          htmlFor={htmlFor} 
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {tooltip && (
          <InfoTooltip content={tooltip} />
        )}
      </div>
      
      {children}
      
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;