'use client';

import React from 'react';
import { WizardShell } from '../../../components/WizardShell';
import { useRouter } from 'next/navigation';
import HRISCalculator from '../../../calculators/hris-calculator/HRISCalculator';

export default function BusinessRoiCalculatorPage() {
  const router = useRouter();
  
  return (
    <WizardShell 
      activeCalculator="business-roi"
      onSelectCalculator={(calculatorType) => router.push(`/calculator/${calculatorType}`)}
      onGoHome={() => router.push('/')}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">HR Systems ROI Calculator</h1>
          <p className="mt-3 text-slate-600">
            Calculate the return on investment for HR Information Systems (HRIS), managed payroll, 
            or payroll software. This calculator will help you assess the business case for investing 
            in HR technology and determine payback periods and long-term value.
          </p>
        </div>
        
        <HRISCalculator />
      </div>
    </WizardShell>
  );
}