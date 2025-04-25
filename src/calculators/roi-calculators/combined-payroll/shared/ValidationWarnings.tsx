'use client';

import React from 'react';
import { ValidationWarning } from '../../../../types/combinedPayrollTypes';
import { InfoBox } from '../../../../components/ui';

interface ValidationWarningsProps {
  warnings: ValidationWarning[];
}

/**
 * Displays validation warnings and errors for the calculator
 */
const ValidationWarnings: React.FC<ValidationWarningsProps> = ({ warnings }) => {
  if (warnings.length === 0) return null;
  
  const errors = warnings.filter(w => w.type === 'error');
  const warningItems = warnings.filter(w => w.type === 'warning');
  
  const hasErrors = errors.length > 0;
  
  return (
    <div className="mb-6">
      <InfoBox 
        title={hasErrors ? "Validation Errors" : "Validation Warnings"} 
        variant={hasErrors ? "error" : "warning"}
      >
        <ul className="list-disc list-inside">
          {warnings.map((warning, idx) => (
            <li key={idx} className="mb-1">
              {warning.message}
            </li>
          ))}
        </ul>
      </InfoBox>
    </div>
  );
};

export default ValidationWarnings;