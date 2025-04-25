'use client';

import React from 'react';
import { Card } from '../../../../components/ui';

interface AssumptionsSectionProps {
  title?: string;
}

/**
 * Reusable component for displaying calculator assumptions
 */
const AssumptionsSection: React.FC<AssumptionsSectionProps> = ({ 
  title = "Calculator Assumptions" 
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <Card className="p-4 bg-gray-50">
        <ul className="list-disc list-inside space-y-1">
          <li>Time savings are measured in hours and valued at the specified hourly rate.</li>
          <li>Annual payroll errors and compliance issues have costs when they occur.</li>
          <li>Paper costs include both printing and distribution of payslips and reports.</li>
          <li>ROI is calculated over 1, 3, and 5 year periods with appropriate discounting.</li>
          <li>The payback period is calculated in months based on net annual benefit.</li>
          <li>All monetary values are in GBP (£).</li>
        </ul>
      </Card>
    </div>
  );
};

export default AssumptionsSection;