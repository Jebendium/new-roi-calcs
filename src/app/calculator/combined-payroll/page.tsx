'use client';

import React from 'react';
import { WizardShell } from '../../../components/WizardShell';
import { Card } from '../../../components/Card';
import { calculatorData } from '../../../data/calculatorData';
import { CombinedPayrollCalculator } from '../../../calculators/roi-calculators/combined-payroll';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CombinedPayrollPage() {
  const router = useRouter();
  const calculator = calculatorData.find(calc => calc.type === 'combined-payroll');
  
  if (!calculator) {
    return <div>Calculator not found</div>;
  }
  
  return (
    <WizardShell 
      activeCalculator="combined-payroll" 
      onSelectCalculator={(type) => router.push(`/calculator/${type}`)} 
      onGoHome={() => router.push('/')}
    >
      <div className="mb-4">
        <Link 
          href="/calculator"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Calculators
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-slate-800 animate-fade-in">
        {calculator.title}
      </h1>
      
      <Card 
        title="Compare Payroll Options" 
        animateIn={true}
        className="animate-slide-up"
      >
        <CombinedPayrollCalculator />
      </Card>
      
      <div className="mt-6">
        <Link 
          href="/calculator/combined-payroll/methodology"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Calculation Methodology
        </Link>
      </div>
    </WizardShell>
  );
}