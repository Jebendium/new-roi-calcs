'use client';

import React from 'react';
import { WizardShell } from '../components/WizardShell';
import HomePage from '../components/HomePage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <WizardShell 
      activeCalculator={null}
      onSelectCalculator={(calculatorType) => router.push(`/calculator/${calculatorType}`)}
      onGoHome={() => router.push('/')}
    >
      <HomePage onSelectCalculator={(calculatorType) => router.push(`/calculator/${calculatorType}`)} />
    </WizardShell>
  );
}